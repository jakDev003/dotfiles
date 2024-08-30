return {
	{
		"williamboman/mason.nvim",

		config = function()
			require("mason").setup({
				ui = {
					icons = {
						package_installed = "✓",
						package_pending = "➜",
						package_uninstalled = "✗",
					},
				},
			})
		end,
	},

	{
		"neovim/nvim-lspconfig",

		config = function()
			local lspconfig = require("lspconfig")
			local capabilities = require("cmp_nvim_lsp").default_capabilities()

			-- Needed for html lang server
			capabilities.textDocument.completion.completionItem.snippetSupport = true

            -- npm i -g bash-language-server
			lspconfig.bashls.setup({
				capabilities = capabilities,
			})

            -- npm i -g css-variables-language-server
			lspconfig.css_variables.setup({
				capabilities = capabilities,
			})

            -- npm i -g vscode-langservers-extracted
            lspconfig.cssls.setup({
                capabilities = capabilities,
            })

            -- npm i -g @microsoft/compose-language-service
			lspconfig.docker_compose_language_service.setup({
				capabilities = capabilities,
			})

            -- npm i -g dockerfile-language-server-nodejs
			lspconfig.dockerls.setup({
				capabilities = capabilities,
				settings = {
					docker = {
						languageserver = {
							formatter = {
								--ignoreMultilineInstructions = true,
							},
						},
					},
				},
			})

            -- npm i -g @olrtg/emmet-language-server
			lspconfig.emmet_language_server.setup({
				capabilities = capabilities,
			})

            -- npm i -g emmet-ls
			lspconfig.emmet_ls.setup({
				capabilities = capabilities,
			})

			-- npm i -g vscode-langservers-extracted
			lspconfig.eslint.setup({
				capabilities = capabilities,
				on_attach = function(client, bufnr)
					vim.api.nvim_create_autocmd("BufWritePre", {
						buffer = bufnr,
						command = "EslintFixAll",
					})
				end,
			})

			-- npm i -g vscode-langservers-extracted
			lspconfig.html.setup({
				capabilities = capabilities,
			})

            -- https://projects.eclipse.org/projects/eclipse.jdt.ls
			lspconfig.jdtls.setup({
				cmd = { "jdtls --java-executable=/usr/lib/jvm/java-21/openjdk-amd64/bin/java" },
				capabilities = capabilities,
			})

			-- https://luals.github.io/#other-install
			lspconfig.lua_ls.setup({
				settings = {
					Lua = {
						diagnostics = {
							globals = { "vim" },
						},
					},
				},

				capabilities = capabilities,
			})

			-- https://github.com/artempyanykh/marksman/blob/main/docs/install.md
			lspconfig.marksman.setup({})

			-- pip install nginx-language-server
			--lspconfig.nginx-language-server.setup({})

			-- https://github.com/omnisharp/omnisharp-roslyn
			lspconfig.omnisharp.setup({
				cmd = { "dotnet", "/usr/local/bin/OmniSharp/OmniSharp.dll" },
				capabilities = capabilities,
				settings = {
					FormattingOptions = {
						-- Enables support for reading code style, naming convention and analyzer
						-- settings from .editorconfig.
						EnableEditorConfigSupport = true,
						-- Specifies whether 'using' directives should be grouped and sorted during
						-- document formatting.
						OrganizeImports = nil,
					},
					MsBuild = {
						-- If true, MSBuild project system will only load projects for files that
						-- were opened in the editor. This setting is useful for big C# codebases
						-- and allows for faster initialization of code navigation features only
						-- for projects that are relevant to code that is being edited. With this
						-- setting enabled OmniSharp may load fewer projects and may thus display
						-- incomplete reference lists for symbols.
						LoadProjectsOnDemand = nil,
					},
					RoslynExtensionsOptions = {
						-- Enables support for roslyn analyzers, code fixes and rulesets.
						EnableAnalyzersSupport = nil,
						-- Enables support for showing unimported types and unimported extension
						-- methods in completion lists. When committed, the appropriate using
						-- directive will be added at the top of the current file. This option can
						-- have a negative impact on initial completion responsiveness,
						-- particularly for the first few completion sessions after opening a
						-- solution.
						EnableImportCompletion = nil,
						-- Only run analyzers against open files when 'enableRoslynAnalyzers' is
						-- true
						AnalyzeOpenDocumentsOnly = nil,
					},
					Sdk = {
						-- Specifies whether to include preview versions of the .NET SDK when
						-- determining which version to use for project loading.
						IncludePrereleases = true,
					},
				},
			})

            -- pip install python-lsp-server
            lspconfig.pylsp.setup({
                settings = {
                    pylsp = {
                        plugins = {
                            pycodestyle = {
                                ignore = {'W391'},
                                maxLineLength = 100
                            }
                        }
                    }
                }
            })

            -- pip install pyright (or 'pip install pylance' which includes pyright)
			-- can also use 'npm i -g pyright'
            lspconfig.pyright.setup({
				capabilities = capabilities,
			})

            -- npm i -g typescript typescript-language-server
            -- this should honor the tsconfig.json or jsconfig.json project files
            lspconfig.tsserver.setup({})

			vim.keymap.set("n", "<leader>ft", vim.lsp.buf.format, {})
		end,
	},

	{
		"https://github.com/hrsh7th/cmp-nvim-lsp",
	},

	{
		"hrsh7th/nvim-cmp",

		dependencies = {
			"L3MON4D3/LuaSnip",
			"saadparwaiz1/cmp_luasnip",
			"onsails/lspkind.nvim",
		},

		config = function()
			local cmp = require("cmp")
			local lspkind = require("lspkind")

			cmp.setup({
				snippet = {
					expand = function(args)
						require("luasnip").lsp_expand(args.body)
					end,
				},
				window = {
					completion = cmp.config.window.bordered(),
					documentation = cmp.config.window.bordered(),
				},
				mapping = cmp.mapping.preset.insert({
					["<C-b>"] = cmp.mapping.scroll_docs(-4),
					["<C-f>"] = cmp.mapping.scroll_docs(4),
					["<C-Space>"] = cmp.mapping.complete(),
					["<C-e>"] = cmp.mapping.abort(),
					["<CR>"] = cmp.mapping.confirm({ select = true }),
				}),
				sources = cmp.config.sources({
					{ name = "nvim_lsp" },
				}, {
					{ name = "buffer" },
				}),
				formatting = {
					format = lspkind.cmp_format({
						mode = "symbol",
						maxwidth = 50,
						ellipsis_char = "...",
						show_labelDetails = true,
						before = function(entry, vim_item)
							return vim_item
						end,
					}),
				},
			})
		end,
	},

	{
		"nvimtools/none-ls.nvim",

		config = function()
			local null_ls = require("null-ls")

			null_ls.setup({
				sources = {
					null_ls.builtins.formatting.stylua,
					null_ls.builtins.formatting.black,
				},
			})
		end,
	},
}
