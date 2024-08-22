return {
    {
        "williamboman/mason.nvim",
        lazy = false,
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
        "williamboman/mason-lspconfig.nvim",
        lazy = false,
        opts = {
            auto_install = true,
            ensure_installed = {
                "angularls",
                "bashls",
                "cssls",
                "cucumber_language_server",
                "diagnosticls",
                "docker_compose_language_service",
                "dockerls",
                "eslint",
                "html",
                "jdtls",
                "lua_ls",
                "marksman",
                "pyright",
                "stylelint_lsp",
                "tsserver",
                "pyright"
            }
        },
    },
    {
        "mfussenegger/nvim-jdtls",
    },
    {
        "neovim/nvim-lspconfig",
        lazy = false,
        opts = {},
        config = function()
            local capabilities = require('cmp_nvim_lsp').default_capabilities()

            local lspconfig = require("lspconfig")
            lspconfig.angularls.setup({ capabilities = capabilities })
            lspconfig.bashls.setup({ capabilities = capabilities })
            lspconfig.cssls.setup({ capabilities = capabilities })
            lspconfig.cucumber_language_server.setup({ capabilities = capabilities })
            lspconfig.docker_compose_language_service.setup({ capabilities = capabilities })
            lspconfig.dockerls.setup({ capabilities = capabilities })
            lspconfig.eslint.setup({ capabilities = capabilities })
            lspconfig.html.setup({ capabilities = capabilities })
            lspconfig.jdtls.setup({ capabilities = capabilities })
            lspconfig.lua_ls.setup({
                settings = {
                    Lua = {
                        runtime = {
                            -- Tell the language server which version of Lua you're using
                            -- (most likely LuaJIT in the case of Neovim)
                            version = 'LuaJIT',
                        },
                        diagnostics = {
                            -- Get the language server to recognize the `vim` global
                            globals = {
                                'vim',
                                'require'
                            },
                        },
                        workspace = {
                            -- Make the server aware of Neovim runtime files
                            library = vim.api.nvim_get_runtime_file("", true),
                        },
                        -- Do not send telemetry data containing a randomized but unique identifier
                        telemetry = {
                            enable = false,
                        },
                    },
                },
                capabilities = capabilities
            })
            lspconfig.marksman.setup({ capabilities = capabilities })
            lspconfig.pyright.setup({ capabilities = capabilities })
            lspconfig.stylelint_lsp.setup({ capabilities = capabilities })
            lspconfig.tsserver.setup({ 
                capabilities = capabilities,
                init_options = {
                    preferences = {
                        disableSuggestions = true
                    }
                },
            })
            lspconfig.pyright.setup({ capabilities = capabilities })

            vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, { desc = '[R]e[n]ame' })
            vim.keymap.set('n', '<leader>ca', function()
                vim.lsp.buf.code_action { context = { only = { 'quickfix', 'refactor', 'source' } } }
            end, { desc = '[C]ode [A]ction' })

            vim.keymap.set('n', 'gd', require('telescope.builtin').lsp_definitions, { desc = '[G]oto [D]efinition' })
            vim.keymap.set('n', 'gr', require('telescope.builtin').lsp_references, { desc = '[G]oto [R]eferences' })
            vim.keymap.set('n', 'gI', require('telescope.builtin').lsp_implementations,
                { desc = '[G]oto [I]mplementation' })
            vim.keymap.set('n', '<leader>D', require('telescope.builtin').lsp_type_definitions,
                { desc = 'Type [D]efinition' })
            vim.keymap.set('n', '<leader>sd', require('telescope.builtin').lsp_document_symbols,
                { desc = '[S]how [D]ocument Symbols (Functions, Variables, etc...)' })
            vim.keymap.set('n', '<leader>ws', require('telescope.builtin').lsp_dynamic_workspace_symbols,
                { desc = '[W]orkspace [S]ymbols' })

            -- See `:help K` for why this keymap
            vim.keymap.set('n', 'K', vim.lsp.buf.hover, { desc = 'Hover Documentation' })
            vim.keymap.set('n', '<C-k>', vim.lsp.buf.signature_help, { desc = 'Signature Documentation' })
        end
    }
}
