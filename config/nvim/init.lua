require("config.lazy")

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
vim.o.inccommand = "split" -- Show effects of a command incrementally
vim.o.ignorecase = true -- Ignore case when searching...
vim.o.smartcase = true -- Do smart case matching
vim.wo.number = true -- Make line numbers default
vim.wo.relativenumber = false -- Make relative line numbers default
vim.o.splitbelow = true -- force all horizontal splits to go below current window
vim.o.splitright = true -- force all vertical splits to go to the right of current window
vim.wo.signcolumn = "yes" -- Keep signcolumn on by default
vim.opt.shada = { "'10", "<0", "s10", "h" } -- Save a lot of info in shada file
vim.o.completeopt = "menuone,noselect" -- Set completeopt to have a better completion experience
vim.o.swapfile = false -- creates a swapfile
vim.o.wrap = false -- display lines as one long line
vim.o.linebreak = true -- companion to wrap don't split words
vim.o.shiftwidth = 4 -- the number of spaces inserted for each indentation
vim.o.tabstop = 4 -- insert n spaces for a tab
vim.o.softtabstop = 4 -- Number of spaces that a tab counts for while performing editing operations
vim.o.expandtab = true -- convert tabs to spaces
vim.o.foldmethod = "manual" -- disable folding by default
vim.o.hlsearch = true -- Set highlight on search
vim.o.mouse = "a" -- Enable mouse mode
vim.opt.termguicolors = true -- set termguicolors to enable highlight groups
vim.o.scrolloff = 4 -- minimal number of screen lines to keep above and below the cursor
vim.o.sidescrolloff = 8 -- minimal number of screen columns either side of cursor if wrap is `false`
vim.o.conceallevel = 0 -- so that `` is visible in markdown files
--vim.o.fileencoding = "utf-8" -- the encoding written to a file
vim.o.encoding = "utf-8" -- the encoding displayed
vim.o.ruler = true -- show the cursor position all the time

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Keymaps ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Source the current file
vim.keymap.set("n", "<space><space>x", "<cmd>source %<CR>", { noremap = true, silent = true, desc = "source file" })

-- Allow moving the cursor through wrapped lines with j, k
vim.keymap.set("n", "k", "v:count == 0 ? 'gk' : 'k'", { noremap = true, silent = true, expr = true, desc = "move up" })
vim.keymap.set(
	"n",
	"j",
	"v:count == 0 ? 'gj' : 'j'",
	{ noremap = true, silent = true, expr = true, desc = "move down" }
)

-- delete single character without copying into register
vim.keymap.set("n", "x", '"_x', { noremap = true, silent = true, desc = "delete character" })

-- clear highlights
vim.keymap.set("n", "<Esc>", ":noh<CR>", { noremap = true, silent = true, desc = "clear highlights" })

-- Vertical scroll and center
vim.keymap.set("n", "<C-d>", "<C-d>zz", { noremap = true, silent = true, desc = "scroll down" })
vim.keymap.set("n", "<C-u>", "<C-u>zz", { noremap = true, silent = true, desc = "scroll up" })

-- Find and center
vim.keymap.set("n", "n", "nzzzv", { noremap = true, silent = true, desc = "find next" })
vim.keymap.set("n", "N", "Nzzzv", { noremap = true, silent = true, desc = "find previous" })

-- Resize with arrows
vim.keymap.set("n", "<Up>", ":resize -2<CR>", { noremap = true, silent = true, desc = "resize up" })
vim.keymap.set("n", "<Down>", ":resize +2<CR>", { noremap = true, silent = true, desc = "resize down" })
vim.keymap.set("n", "<Left>", ":vertical resize -2<CR>", { noremap = true, silent = true, desc = "resize left" })
vim.keymap.set("n", "<Right>", ":vertical resize +2<CR>", { noremap = true, silent = true, desc = "resize right" })

-- Buffers
vim.keymap.set("n", "<Tab>", ":bnext<CR>", { noremap = true, silent = true, desc = "next buffer" })
vim.keymap.set("n", "<S-Tab>", ":bprevious<CR>", { noremap = true, silent = true, desc = "previous buffer" })
vim.keymap.set("n", "<leader>x", ":Bdelete!<CR>", { noremap = true, silent = true, desc = "delete buffer" })
vim.keymap.set("n", "<leader>b", "<cmd> enew <CR>", { noremap = true, silent = true, desc = "new buffer" })

-- Increment/decrement numbers
vim.keymap.set("n", "<leader>+", "<C-a>", { noremap = true, silent = true, desc = "increment" })
vim.keymap.set("n", "<leader>-", "<C-x>", { noremap = true, silent = true, desc = "decrement" })

-- Window management
vim.keymap.set("n", "<leader>v", "<C-w>v", { noremap = true, silent = true, desc = "split window vertically" })
vim.keymap.set("n", "<leader>h", "<C-w>s", { noremap = true, silent = true, desc = "split window horizontally" })
vim.keymap.set("n", "<leader>se", "<C-w>=", { noremap = true, silent = true, desc = "equalize window sizes" })
vim.keymap.set("n", "<leader>xs", ":close<CR>", { noremap = true, silent = true, desc = "close window" })

-- Navigate between splits
vim.keymap.set("n", "<C-k>", ":wincmd k<CR>", { noremap = true, silent = true, desc = "move to top split" })
vim.keymap.set("n", "<C-j>", ":wincmd j<CR>", { noremap = true, silent = true, desc = "move to bottom split" })
vim.keymap.set("n", "<C-h>", ":wincmd h<CR>", { noremap = true, silent = true, desc = "move to left split" })
vim.keymap.set("n", "<C-l>", ":wincmd l<CR>", { noremap = true, silent = true, desc = "move to right split" })

-- Tabs
vim.keymap.set("n", "<leader>to", ":tabnew<CR>", { noremap = true, silent = true, desc = "open new tab" })
vim.keymap.set("n", "<leader>tx", ":tabclose<CR>", { noremap = true, silent = true, desc = "close tab" })
vim.keymap.set("n", "<leader>tn", ":tabn<CR>", { noremap = true, silent = true, desc = "go to next tab" })
vim.keymap.set("n", "<leader>tp", ":tabp<CR>", { noremap = true, silent = true, desc = "go to previous tab" })

-- Move text up and down
vim.keymap.set("v", "<A-j>", ":m .+1<CR>==", { noremap = true, silent = true, desc = "move text down" })
vim.keymap.set("v", "<A-k>", ":m .-2<CR>==", { noremap = true, silent = true, desc = "move text up" })

-- Replace word under cursor
vim.keymap.set("n", "<leader>j", "*``cgn", { noremap = true, silent = true, desc = "replace word under cursor" })

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Custom Commands ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Highlight yanked text
vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking (copying) text",
	group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})

-- Prevent LSP from overwriting treesitter color settings
-- https://github.com/NvChad/NvChad/issues/1907
vim.highlight.priorities.semantic_tokens = 95 -- Or any number lower than 100, treesitter's priority level

-- Appearance of diagnostics
vim.diagnostic.config({
	virtual_text = {
		prefix = "●",
		-- Add a custom format function to show error codes
		format = function(diagnostic)
			local code = diagnostic.code and string.format("[%s]", diagnostic.code) or ""
			return string.format("%s %s", code, diagnostic.message)
		end,
	},
	underline = false,
	update_in_insert = true,
	float = {
		source = "always", -- Or "if_many"
	},
	-- Make diagnostic background transparent
	on_ready = function()
		vim.cmd("highlight DiagnosticVirtualText guibg=NONE")
	end,
})
