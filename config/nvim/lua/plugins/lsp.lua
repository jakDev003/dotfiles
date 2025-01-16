return {
	{
		"neovim/nvim-lspconfig",
		dependencies = {
			{
				-- used for completion, annotations and signatures of Neovim apis
				"folke/lazydev.nvim",
				ft = "lua",
				opts = {
					library = {
						-- Load luvit types when the `vim.uv` word is found
						{ path = "luvit-meta/library", words = { "vim%.uv" } },
					},
				},
			},
			{ "Bilal2453/luvit-meta", lazy = true },
			"williamboman/mason.nvim",
			"williamboman/mason-lspconfig.nvim",
			"WhoIsSethDaniel/mason-tool-installer.nvim",
			-- Autoformatting
			"stevearc/conform.nvim",
			-- JSON LS
			"b0o/SchemaStore.nvim",
			-- JAVA
			"nvim-java/nvim-java",
		},
		config = function()
			local capabilities = nil
			if pcall(require, "cmp_nvim_lsp") then
				capabilities = require("cmp_nvim_lsp").default_capabilities()
			end

			local lspconfig = require("lspconfig")

			require("java").setup()

			local servers = {
				bashls = true,
				lua_ls = {
					server_capabilities = {
						semanticTokensProvider = vim.NIL,
					},
				},
				intelephense = true,
				pyright = true,
				-- Enabled biome formatting, turn off all the other ones generally
				biome = true,
				ts_ls = {
					root_dir = require("lspconfig").util.root_pattern("package.json"),
					single_file = false,
					server_capabilities = {
						documentFormattingProvider = false,
					},
				},
				jdtls = {
					server_capabilities = {
						documentFormattingProvider = false,
					},
				},
				jsonls = {
					server_capabilities = {
						documentFormattingProvider = false,
					},
					settings = {
						json = {
							schemas = require("schemastore").json.schemas(),
							validate = { enable = true },
						},
					},
				},
				cssls = {
					server_capabilities = {
						documentFormattingProvider = false,
					},
				},
				yamlls = {
					settings = {
						yaml = {
							schemaStore = {
								enable = false,
								url = "",
							},
							-- schemas = require("schemastore").yaml.schemas(),
						},
					},
				},
				clangd = {
					cmd = { "clangd" },
					init_options = { clangdFileStatus = true },
					filetypes = { "c" },
				},

				groovyls = {
					cmd = {
						"java",
						"-jar",
						"C:\\Users\\jkagiwada\\myBin\\groovy-language-server\\groovy-language-server\\build\\libs\\groovy-language-server-all.jar",
					},
					filetypes = { "groovy" },
					--root_dir = nvim_lsp.util.root_pattern(".git", "build.gradle", "settings.gradle"),
					settings = {},
				},

				cucumber_language_server = {
					server_capabilities = {
						documentFormattingProvider = false,
					},
				},
			}

			local servers_to_install = vim.tbl_filter(function(key)
				local t = servers[key]
				if type(t) == "table" then
					return not t.manual_install
				else
					return t
				end
			end, vim.tbl_keys(servers))

			require("mason").setup()
			local ensure_installed = {
				"stylua",
				"lua_ls",
				"ts_ls",
			}

			vim.list_extend(ensure_installed, servers_to_install)
			require("mason-tool-installer").setup({ ensure_installed = ensure_installed })

			for name, config in pairs(servers) do
				if config == true then
					config = {}
				end
				config = vim.tbl_deep_extend("force", {}, {
					capabilities = capabilities,
				}, config)

				lspconfig[name].setup(config)
			end

			local disable_semantic_tokens = {
				lua = true,
			}

			vim.api.nvim_create_autocmd("LspAttach", {
				callback = function(args)
					local bufnr = args.buf
					local client = assert(vim.lsp.get_client_by_id(args.data.client_id), "must have valid client")

					local settings = servers[client.name]
					if type(settings) ~= "table" then
						settings = {}
					end

					local builtin = require("telescope.builtin")

					vim.opt_local.omnifunc = "v:lua.vim.lsp.omnifunc"
					vim.keymap.set("n", "gd", builtin.lsp_definitions, { buffer = bufnr, desc = "Go to definition" })
					vim.keymap.set("n", "gr", builtin.lsp_references, { buffer = bufnr, desc = "Go to references" })
					vim.keymap.set("n", "gD", vim.lsp.buf.declaration, { buffer = bufnr, desc = "Go to declaration" })
					vim.keymap.set(
						"n",
						"gT",
						vim.lsp.buf.type_definition,
						{ buffer = bufnr, desc = "Go to type definition" }
					)
					vim.keymap.set("n", "K", vim.lsp.buf.hover, { buffer = bufnr, desc = "Show hover" })

					vim.keymap.set("n", "<LEADER>cr", vim.lsp.buf.rename, { buffer = bufnr, desc = "Rename" })
					vim.keymap.set("n", "<LEADER>ca", vim.lsp.buf.code_action, { buffer = bufnr, desc = "Code action" })
					vim.keymap.set(
						"n",
						"<LEADER>wd",
						builtin.lsp_document_symbols,
						{ buffer = bufnr, desc = "Document symbols" }
					)

					local filetype = vim.bo[bufnr].filetype
					if disable_semantic_tokens[filetype] then
						client.server_capabilities.semanticTokensProvider = nil
					end

					-- Override server capabilities
					if settings.server_capabilities then
						for k, v in pairs(settings.server_capabilities) do
							if v == vim.NIL then
								v = nil
							end

							client.server_capabilities[k] = v
						end
					end

					vim.diagnostic.config({
						virtual_text = false,
					})

					-- Show line diagnostics automatically in hover window
					vim.o.updatetime = 250
					vim.cmd([[autocmd CursorHold,CursorHoldI * lua vim.diagnostic.open_float(nil, {focus=false})]])
				end,
			})

			require("custom.autoformat").setup()
		end,
	},
}
