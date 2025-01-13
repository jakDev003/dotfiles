return {
    {
        "williamboman/mason.nvim",
        lazy = false,
        config = function()
            require("mason").setup(
                {
                    ui = {
                        icons = {
                            package_installed = "✓",
                            package_pending = "➜",
                            package_uninstalled = "✗"
                        }
                    }
                }
            )
        end
    },
    {
        "williamboman/mason-lspconfig.nvim",
        lazy = false,
        opts = {
            auto_install = true,
            ensure_installed = {
                "cssls",
                "eslint",
                "html",
                "jsonls",
                "lua_ls",
                "pyright",
                "ts_ls"
            }
        }
    },
    {
        "neovim/nvim-lspconfig",
        lazy = false,
        opts = {},
        config = function()
            local lspconfig = require("lspconfig")
            lspconfig.cssls.setup()
            lspconfig.eslint.setup()
            lspconfig.html.setup()
            lspconfig.jsonls.setup()
            lspconfig.lua_ls.setup(
                {
                    settings = {
                        Lua = {
                            runtime = {
                                -- Tell the language server which version of Lua you're using
                                -- (most likely LuaJIT in the case of Neovim)
                                version = "LuaJIT"
                            },
                            diagnostics = {
                                -- Get the language server to recognize the `vim` global
                                globals = {
                                    "vim",
                                    "require"
                                }
                            },
                            workspace = {
                                -- Make the server aware of Neovim runtime files
                                library = vim.api.nvim_get_runtime_file("", true)
                            },
                            -- Do not send telemetry data containing a randomized but unique identifier
                            telemetry = {
                                enable = false
                            }
                        }
                    },
                }
            )
            lspconfig.pyright.setup()
            lspconfig.ts_ls.setup()
        end
    }
}

