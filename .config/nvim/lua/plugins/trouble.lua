return {
    "folke/trouble.nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    init = function()
        vim.keymap.set("n", "<leader>xx", function() require("trouble").toggle() end, { desc = 'Toggle Terminal' })
        vim.keymap.set("n", "<leader>xw", function() require("trouble").toggle("workspace_diagnostics") end, { desc = 'LSP Workspace Diagnostics' })
        vim.keymap.set("n", "<leader>xd", function() require("trouble").toggle("document_diagnostics") end, { desc = 'LSP Document Diagnostics' })
        vim.keymap.set("n", "<leader>xq", function() require("trouble").toggle("quickfix") end, { desc = 'LSP Quickfix List' })
        vim.keymap.set("n", "<leader>xl", function() require("trouble").toggle("loclist") end, { desc = 'LSP Loc List' })
        vim.keymap.set("n", "gR", function() require("trouble").toggle("lsp_references") end, { desc = 'LSP References' })
    end,
   }