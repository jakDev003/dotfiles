-- luasnip-html.lua
local ls = require("luasnip") -- Import LuaSnip

-- Shorthand for creating snippets
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node

-- Define HTML snippets
ls.add_snippets("html", {
	-- Basic HTML5 template
	s("html5", {
		t({
			"<!DOCTYPE html>",
			'<html lang="en">',
			"<head>",
			'    <meta charset="UTF-8">',
			'    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
			"    <title>",
		}),
		i(1, "Document"),
		t({ "</title>", "</head>", "<body>", "    " }),
		i(0),
		t({ "", "</body>", "</html>" }),
	}),
	-- HTML link tag
	s("link", {
		t({ '<link rel="stylesheet" href="' }),
		i(1, "style.css"),
		t({ '">' }),
	}),
	-- HTML script tag
	s("script", {
		t({ '<script src="' }),
		i(1, "script.js"),
		t({ '"></script>' }),
	}),
	-- HTML image tag
	s("img", {
		t({ '<img src="' }),
		i(1, "image.png"),
		t({ '" alt="' }),
		i(2, "description"),
		t({ '">' }),
	}),
	-- HTML anchor tag
	s("a", {
		t({ '<a href="' }),
		i(1, "https://example.com"),
		t({ '">' }),
		i(2, "link text"),
		t({ "</a>" }),
	}),
})

-- You can add more snippets as needed
