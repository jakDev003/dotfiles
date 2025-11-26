return {
	-- Mason + installers (tools & LSP servers)
	{
		"williamboman/mason.nvim",
		dependencies = {
			"williamboman/mason-lspconfig.nvim",
			"WhoIsSethDaniel/mason-tool-installer.nvim",
		},
		build = ":MasonUpdate",
		config = function()
			local mason = require("mason")
			local mlsp = require("mason-lspconfig")

			mason.setup()

			local ts_name = "ts_ls"

			mlsp.setup({
				automatic_installation = true,
				ensure_installed = {
					"cssls",

					"html",
					"jsonls",
					"jdtls",
					"pyright",
					ts_name,
				},
			})

			require("mason-tool-installer").setup({
				ensure_installed = {
					"prettier",
					"stylua",
					"isort",
					"black",
					"pylint",
					"eslint_d",
				},
			})
		end,
	},

	-- LSP config
	{
		"neovim/nvim-lspconfig",
		event = { "BufReadPre", "BufNewFile" },
		dependencies = {
			"hrsh7th/cmp-nvim-lsp",
			{ "folke/neodev.nvim", opts = {} },
			"williamboman/mason.nvim",
			"williamboman/mason-lspconfig.nvim",
		},
		config = function()
			local on_attach = function(_, _) end
			local capabilities = require("cmp_nvim_lsp").default_capabilities()
			local ts_name = "ts_ls"

			local function setup(server, opts)
				if not vim.lsp.config[server] then
					vim.notify(("LSP '%s' not available in your lspconfig"):format(server), vim.log.levels.WARN)
					return
				end
				opts = opts or {}
				opts.capabilities = opts.capabilities or capabilities
				opts.on_attach = opts.on_attach or on_attach
				vim.lsp.config(server, opts)
			end

			local servers = {
				"cssls",
				"html",
				"jsonls",
				"jdtls",
				"pyright",
				ts_name,
			}

			for _, s in ipairs(servers) do
				setup(s)
				vim.lsp.enable(s)
			end
		end,
	},

	-- Conform handles all formatting
	{
		"stevearc/conform.nvim",
		event = { "BufReadPre", "BufNewFile" },
		config = function()
			local conform = require("conform")
			conform.setup({
				formatters_by_ft = {
					javascript = { "prettier" },
					typescript = { "prettier" },
					javascriptreact = { "prettier" },
					typescriptreact = { "prettier" },
					css = { "prettier" },
					html = { "prettier" },
					json = { "prettier" },
					yaml = { "prettier" },
					markdown = { "prettier" },
					lua = { "stylua" },
					python = { "isort", "black" },
				},
				format_on_save = {
					lsp_fallback = true,
					async = false,
					timeout_ms = 1000,
				},
			})

			vim.keymap.set({ "n", "v" }, "<leader>f", function()
				conform.format({
					lsp_fallback = true,
					async = false,
					timeout_ms = 1000,
				})
			end, { desc = "Format file or range (in visual mode)" })
		end,
	},

	-- Completion core + sources (LSP-driven; no AI source here)
	{
		"hrsh7th/nvim-cmp",
		event = "InsertEnter",
		dependencies = {
			"hrsh7th/cmp-nvim-lsp",
			"hrsh7th/cmp-buffer",
			"hrsh7th/cmp-path",
			"hrsh7th/cmp-cmdline",
			"L3MON4D3/LuaSnip",
		},
		config = function()
			local cmp = require("cmp")
			cmp.setup({
				snippet = {
					expand = function(args)
						require("luasnip").lsp_expand(args.body)
					end,
				},
				mapping = cmp.mapping.preset.insert({
					["<CR>"] = cmp.mapping.confirm({ select = true }),
					["<C-Space>"] = cmp.mapping.complete(),
				}),
				sources = cmp.config.sources({
					{ name = "nvim_lsp" },
					{ name = "buffer" },
					{ name = "path" },
					{ name = "luasnip" },
				}),
			})
		end,
	},

	{
		"NickvanDyke/opencode.nvim",
		dependencies = {
			-- Recommended for better prompt input, and required to use `opencode.nvim`'s embedded terminal — otherwise optional
			{ "folke/snacks.nvim", opts = { input = { enabled = true } } },
		},
		config = function()
			vim.g.opencode_opts = {
				-- Your configuration, if any — see `lua/opencode/config.lua`
			}

			-- Required for `opts.auto_reload`
			vim.opt.autoread = true

			-- Recommended keymaps
			vim.keymap.set("n", "<leader>ot", function()
				require("opencode").toggle()
			end, { desc = "Toggle opencode" })
			vim.keymap.set("n", "<leader>oA", function()
				require("opencode").ask()
			end, { desc = "Ask opencode" })
			vim.keymap.set("n", "<leader>oa", function()
				require("opencode").ask("@cursor: ")
			end, { desc = "Ask opencode about this" })
			vim.keymap.set("v", "<leader>oa", function()
				require("opencode").ask("@selection: ")
			end, { desc = "Ask opencode about selection" })
			vim.keymap.set("n", "<leader>on", function()
				require("opencode").command("session_new")
			end, { desc = "New opencode session" })
			vim.keymap.set("n", "<leader>oy", function()
				require("opencode").command("messages_copy")
			end, { desc = "Copy last opencode response" })
			vim.keymap.set("n", "<S-C-u>", function()
				require("opencode").command("messages_half_page_up")
			end, { desc = "Messages half page up" })
			vim.keymap.set("n", "<S-C-d>", function()
				require("opencode").command("messages_half_page_down")
			end, { desc = "Messages half page down" })
			vim.keymap.set({ "n", "v" }, "<leader>os", function()
				require("opencode").select()
			end, { desc = "Select opencode prompt" })

			-- Example: keymap for custom prompt
			vim.keymap.set("n", "<leader>oe", function()
				require("opencode").prompt("Explain @cursor and its context")
			end, { desc = "Explain this code" })
		end,
	},
}