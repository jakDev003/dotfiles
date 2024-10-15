return {
	{
		"folke/tokyonight.nvim",
		name = "tokyonight",
		lazy = false,
		priority = 1000,
		config = function()
			require("tokyonight").setup({})
			--vim.cmd("colorscheme tokyonight-storm")
		end,
	},

	{
		"rose-pine/neovim",
		name = "rose-pine",
		config = function()
			require("rose-pine").setup({
				disable_background = true,
			})

			vim.cmd("colorscheme rose-pine")
		end,
	},

	{
		"catppuccin/nvim",
		lazy = false,
		name = "catppuccin",
		priority = 1000,
		config = function()
			--vim.cmd.colorscheme("catppuccin-mocha")
		end,
	},
}
