require("config.lazy")

local set = vim.opt

set.shiftwidth = 4 -- tab = 'x' number of spaces
set.number = true -- shows line numbers
set.clipboard = "unnamedplus" -- use clipboard buffer from operating system


vim.keymap.set("n", "<space><space>x", "<cmd>source %<CR>", {desc = "source file"})

vim.api.nvim_create_autocmd('TextYankPost', {
    desc = 'Highlight when yanking (copying) text',
    group = vim.api.nvim_create_augroup('highlight-yank', { clear = true }),
    callback = function()
	vim.highlight.on_yank()
    end,
})
