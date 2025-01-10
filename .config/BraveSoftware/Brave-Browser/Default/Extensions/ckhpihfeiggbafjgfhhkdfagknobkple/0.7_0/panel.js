
const DEFAULT_TEXT = 'Copy';
const COPIED_TEXT = 'Copied';
const COPYING_TEXT = 'Copying';

var loaded = false;
var queryString = undefined;

chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
      if (request.request.url.startsWith("data:")){
        return;
      }

      let div = document.createElement("div");
      div.attributes.style = 'border: 1px solid black';
      div.className = 'row';
      var id = "btn" + Math.random();
      var inner = '<button id=' + id;
      if (!loaded) {
        inner += ' disabled';
      }
      inner += '>' + DEFAULT_TEXT + '</button> <span>' + request.request.method + '</span> '
        + request.request.url;
      // if (request.request.method == 'POST') {
      //   inner += ' <span>body</span> ' + (request.request.postData ? request.request.postData.text : '');
      // }
      div.innerHTML = inner;

      if (queryString && div.innerText.indexOf(queryString) < 0) {
        div.classList.add("hidden-row");
      }

      document.getElementById("content").append(div);

      var line = 'curl -X ' + request.request.method + ' "' + request.request.url + '"';

      var headers = request.request.headers
      for (var i = 0; i<headers.length; i++) {
        var obj = headers[i];
        var name = obj.name;
        var value = obj.value
        if (name[0] == ':') {
          continue;
        }
        if (name.toLowerCase() == 'accept-encoding') {
          continue;
        }
        // console.log("Header name = [" + name + "], value = [" + value + "]");
        value = value.replaceAll('"', '\\"');
        //alert(value)
        line += ' -H "' + name + ': ' + value + '"';
      }

      if (request.request.postData) {
        var bodyText = request.request.postData.text.replaceAll('"', '\\"');
        bodyText = bodyText.replaceAll('\n', ' ').replaceAll('\r', ' ');
        console.log(bodyText)
        line += ' --data "' + bodyText + '"';
      }
      
      document.getElementById(id).setAttribute("line", line);
  }
);

document.getElementById("content").addEventListener("click", function(event) {
  var target = event.target;

  if (target.tagName == "BUTTON") {
    
    var line = target.getAttribute("line");
    target.innerHTML = COPIED_TEXT;
    // chrome.runtime.sendMessage({greeting: line}, function(response){
    //   target.innerHTML = COPIED_TEXT;
    // });

    const textEl = document.querySelector('#selector');
    textEl.value = line;
    textEl.select();
    document.execCommand('copy');
    
    //console.log('update text : ' + line);
    var buttons = document.getElementsByTagName('BUTTON');
    for (var i=0; i<buttons.length; i++) {
      var btn = buttons[i];
      if (btn != target && btn.innerHTML == COPIED_TEXT) {
        btn.innerHTML = DEFAULT_TEXT;
      }
    }
  }
});

document.getElementById("btnClear").onclick = function() {
  document.getElementById("content").innerHTML = "";
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "search") {
    console.log('搜索', message.action, message.queryString); // "Hello from devtools.js!"
    if (message.action == 'performSearch') {
      queryString = message.queryString;
    }
    
    var rows = document.getElementById("content").getElementsByClassName("row");
    for (var i=0; i<rows.length; i++) {
      var row = rows[i];
      if (queryString && row.innerText.indexOf(queryString) < 0) {
        row.classList.add("hidden-row");
      } else {
        row.classList.remove("hidden-row");
      }
    }
  }
});

document.body.onload = function(){
  loaded = true;
}