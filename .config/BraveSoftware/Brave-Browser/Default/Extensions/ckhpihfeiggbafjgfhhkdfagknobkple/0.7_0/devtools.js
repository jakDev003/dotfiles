
chrome.devtools.panels.create('cURL', 'icon.png', 'panel.html', (panel) => {
    console.log("Create 'cURL' panel.");
    panel.onSearch.addListener((action, queryString) => {
        console.log("onSearch [" + action + "], [" + queryString + "]");
        chrome.runtime.sendMessage({
            type: "search",
            queryString: queryString,
            action: action
        });
    });
});

