return {
	"github/copilot.vim",
	config = function()
		-- GitHub Copilot configuration
		vim.g.copilot_no_tab_map = true
		vim.api.nvim_set_keymap("i", "<C-j>", 'copilot#Accept("<CR>")', { silent = true, expr = true, script = true })
	end,
}
