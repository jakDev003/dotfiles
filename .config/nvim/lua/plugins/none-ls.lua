return {
    "nvimtools/none-ls.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
        local null_ls = require("null-ls")
        local builtins = null_ls.builtins
        local fmt = builtins.formatting
        local comp = builtins.completion
        local diag = builtins.diagnostics
        local ca = builtins.code_actions
        null_ls.setup({
            sources = {
                comp.luasnip,           -- lua
                comp.spell,             -- spelling

                ca.gitsigns,            -- git

                fmt.markdownlint,       -- markdown
                fmt.prettier,           -- html, css, ts, js
                fmt.stylua,             -- lua
                fmt.black,              -- python
                fmt.cmake_format,       -- cmake
                fmt.google_java_format, -- java
                fmt.isort,              -- python

                diag.checkmake,         -- makefile
                diag.dotenv_linter,     --.env file's
                diag.markdownlint,      -- markdown
                diag.pylint,            -- python
                diag.eslint,            --ts, js
            },
        })

        vim.keymap.set('n', '<leader>lf', vim.lsp.buf.format, { desc = '[L]SP [F]ormat' })

        -- -- Turn on autoformating
        -- local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })
        -- vim.api.nvim_create_autocmd({ "BufWritePost" }, {
        --     group = lint_augroup,
        --     callback = function()
        --         if require("utilities").search_lsp_client('null-ls') == 'null-ls' then
        --             vim.print("Formatting on save...")
        --             vim.lsp.buf.format()
        --         end
        --     end
        -- })
    end,
}
