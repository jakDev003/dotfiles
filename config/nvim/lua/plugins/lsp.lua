-- lua/plugins/lsp.lua
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

			local has_lsp, lspconfig = pcall(require, "lspconfig")
			local ts_name = (has_lsp and lspconfig.ts_ls) and "ts_ls" or "tsserver"

			mlsp.setup({
				automatic_installation = true,
				ensure_installed = {
					"cssls",
					"eslint",
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
			local ok_lsp, lspconfig = pcall(require, "lspconfig")
			if not ok_lsp then
				vim.notify("nvim-lspconfig not found", vim.log.levels.ERROR)
				return
			end

			local on_attach = function(_, _) end
			local capabilities = require("cmp_nvim_lsp").default_capabilities()
			local ts_name = lspconfig.ts_ls and "ts_ls" or "tsserver"

			local function setup(server, opts)
				if not lspconfig[server] then
					vim.notify(("LSP '%s' not available in your lspconfig"):format(server), vim.log.levels.WARN)
					return
				end
				opts = opts or {}
				opts.capabilities = opts.capabilities or capabilities
				opts.on_attach = opts.on_attach or on_attach
				lspconfig[server].setup(opts)
			end

			local servers = {
				"cssls",
				"eslint",
				"html",
				"jsonls",
				"jdtls",
				"pyright",
				ts_name,
			}

			for _, s in ipairs(servers) do
				setup(s)
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
}
