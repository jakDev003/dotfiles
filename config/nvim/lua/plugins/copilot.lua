return {
	{
		"CopilotC-Nvim/CopilotChat.nvim",
		dependencies = {
			{ "github/copilot.vim" }, -- or { "zbirenbaum/copilot.lua" },
			{ "nvim-lua/plenary.nvim", branch = "master" },
		},
		build = "make tiktoken", -- Only on Linux of Mac
		opts = {
			-- See Configuration section for options
		},
		keys = {
			{ "<leader>cc", "<cmd>CopilotChat<cr>", desc = "Chat with Copilot" },
			{ "<leader>ce", "<cmd>CopilotExplain<cr>", desc = "Explain Code" },
			{ "<leader>cr", "<cmd>CopilotReview<cr>", desc = "Review Code" },
			{ "<leader>cf", "<cmd>CopilotFix<cr>", desc = "Fix Code Issues" },
			{ "<leader>co", "<cmd>CopilotOptimize<cr>", desc = "Optimize Code" },
			{ "<leader>cd", "<cmd>CopilotDocs<cr>", desc = "Generate Docs" },
			{ "<leader>ct", "<cmd>CopilotTests<cr>", desc = "Generate Tests" },
			{ "<leader>cm", "<cmd>CopilotCommit<cr>", desc = "Generate Commit Message" },
			{ "<leader>cs", "<cmd>CopilotCommit<cr>", desc = "Generate Commit for Selection" },
		},
	},
}
