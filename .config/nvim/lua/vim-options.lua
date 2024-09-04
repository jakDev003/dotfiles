-- Text Wrap
vim.opt.wrap = false

-- Line Numbers
vim.opt.nu = true
-- vim.opt.relativenumber = true
vim.opt.numberwidth = 4

-- Make sure when scrolling cursor does not go beyond the bottom 'x' number of lines
vim.opt.scrolloff = 10

-- Tabs
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Pop up menu
vim.opt.pumheight = 10
vim.opt.pumblend = 10

-- Smart Indenting
vim.opt.smartindent = true

-- Set highlight on search
vim.o.hlsearch = true

-- Set highlight on Line where Cursor is
vim.o.cursorline = true

-- Set hightlight on Column where Cursor is
vim.o.cursorcolumn = true

-- Enable mouse mode
vim.o.mouse = "a"

-- Sync clipboard between OS and Neovim.
--  Schedule the setting after `UiEnter` because it can increase startup-time.
--  Remove this option if you want your OS clipboard to remain independent.
--  See `:help 'clipboard'`
vim.opt.clipboard = "unnamedplus"

-- Enable break indent
vim.o.breakindent = true

-- Save undo history
vim.o.undofile = true

-- Case-insensitive searching UNLESS \C or capital in search
vim.o.ignorecase = true
vim.o.smartcase = true

-- Keep signcolumn on by default
vim.wo.signcolumn = "yes"

-- Decrease update time
vim.o.updatetime = 250
vim.o.timeoutlen = 300

-- Set completeopt to have a better completion experience
vim.o.completeopt = "menuone,noselect"

-- NOTE: You should make sure your terminal supports this
vim.o.termguicolors = true

vim.g.mapleader = " "

-- Set font
vim.opt.guifont = "JetBrainsMono Nerd Font"

-- Winbar
vim.o.winbar = "%{%v:lua.require'winbar'.eval()%}"

-- Transparent Background
vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })

-- Highlight when yanking (copying) text
--  Try it with `yap` in normal mode
--  See `:help vim.highlight.on_yank()`
vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking (copying) text",
	group = vim.api.nvim_create_augroup("jak-highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})

-- Custom General Keymaps
vim.keymap.set("n", "<leader>[+", "<cmd>vertical res +10<CR>", { desc = "Window [V]ertical Resize +" })
vim.keymap.set("n", "<leader>[-", "<cmd>vertical res -10<CR>", { desc = "Window [V]ertical Resize -" })
vim.keymap.set("n", "<leader>]+", "<cmd>res +10<CR>", { desc = "Window [H]orizontal Resize +" })
vim.keymap.set("n", "<leader>]-", "<cmd>res -10<CR>", { desc = "Window [H]orizontal Resize -" })

vim.keymap.set("n", "<tab>", ":BufferNext<CR>")
vim.keymap.set("n", "<S-tab>", ":BufferPrevious<CR>")
vim.keymap.set("n", "<leader>x", ":BufferClose<CR>")
