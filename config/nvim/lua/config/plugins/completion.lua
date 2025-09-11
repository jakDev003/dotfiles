return {
	{
		"saghen/blink.cmp",
		version = "1.*", -- prebuilt binaries
		-- if you ever want to build the Rust matcher locally:
		-- build = "cargo build --release",
		dependencies = {
			"L3MON4D3/LuaSnip",
			"rafamadriz/friendly-snippets",
		},
		opts = function()
			-- Load community snippets (VSCode format) for LuaSnip
			require("luasnip.loaders.from_vscode").lazy_load()

			---@type blink.cmp.Config
			return {
				-- Comfortable, VSCode-like accept on <CR>; use 'default' if you prefer Ctrl-y
				keymap = {
					preset = "enter",
					["<C-d>"] = { "scroll_documentation_down" },
					["<C-u>"] = { "scroll_documentation_up" },
				},

				appearance = { nerd_font_variant = "mono" },

				-- Show inline ghost text & keep docs on demand (toggle with <C-Space>)
				completion = {
					ghost_text = { enabled = true },
					documentation = { auto_show = false }, -- keep your preference
				},

				-- Enable experimental signature help popup
				signature = { enabled = true },

				-- Sources and order
				sources = {
					default = { "lsp", "path", "snippets", "buffer" },
					-- If you add extra sources later (emoji/dictionary/etc), put them here.
				},

				-- Use the Rust matcher when available (your current choice)
				fuzzy = { implementation = "prefer_rust_with_warning" },

				-- Cmdline completion (/, ?, :)
				cmdline = {
					enabled = true,
					-- You can customize sources per type if you want:
					-- sources = {
					--   [":"] = { "path", "cmdline" },
					--   ["/"] = { "buffer" },
					--   ["?"] = { "buffer" },
					-- },
				},

				-- Snippet engine: Blink detects LuaSnip automatically.
				snippets = {
					preset = "luasnip",
				},
			}
		end,
		opts_extend = { "sources.default" },
	},
}
