return {
	{
		"nvim-lualine/lualine.nvim",
		dependencies = {
			"nvim-tree/nvim-web-devicons",
		},
		config = function()
			-- Define the custom function for lualine section
			local function custom_section()
				-- Check if 'conform' is available
				local status, conform = pcall(require, "conform")
				if not status then
					return "Conform not installed"
				end

				local lsp_format = require("conform.lsp_format")

				-- Get formatters for the current buffer
				local formatters = conform.list_formatters_for_buffer()
				if formatters and #formatters > 0 then
					local formatterNames = {}

					for _, formatter in ipairs(formatters) do
						table.insert(formatterNames, formatter)
					end

					return "󰷈 " .. table.concat(formatterNames, " ")
				end

				-- Check if there's an LSP formatter
				local bufnr = vim.api.nvim_get_current_buf()
				local lsp_clients = lsp_format.get_format_clients({ bufnr = bufnr })

				if not vim.tbl_isempty(lsp_clients) then
					return "󰷈 LSP Formatter"
				end

				return ""
			end

			local mode = {
				"mode",
				fmt = function(str)
					-- return ' ' .. str:sub(1, 1) -- displays only the first character of the mode
					return " " .. str
				end,
			}

			local filename = {
				"filename",
				file_status = true, -- displays file status (readonly status, modified status)
				path = 0, -- 0 = just filename, 1 = relative path, 2 = absolute path
			}

			local hide_in_width = function()
				return vim.fn.winwidth(0) > 100
			end

			local diagnostics = {
				"diagnostics",
				sources = { "nvim_diagnostic" },
				sections = { "error", "warn" },
				symbols = { error = " ", warn = " ", info = " ", hint = " " },
				colored = false,
				update_in_insert = false,
				always_visible = false,
				cond = hide_in_width,
			}

			local diff = {
				"diff",
				colored = false,
				symbols = { added = " ", modified = " ", removed = " " }, -- changes diff symbols
				cond = hide_in_width,
			}

			require("lualine").setup({
				options = {
					icons_enabled = true,
					theme = "catppuccin",
					-- Some useful glyphs:
					-- https://www.nerdfonts.com/cheat-sheet
					--        
					section_separators = { left = "", right = "" },
					component_separators = { left = "", right = "" },
					disabled_filetypes = { "alpha", "neo-tree", "Avante" },
					always_divide_middle = true,
				},
				sections = {
					lualine_a = { mode },
					lualine_b = { "branch" },
					lualine_c = { filename, { "data", "require'lsp-status'.status()" }, custom_section },
					lualine_x = {
						diagnostics,
						diff,
						{ "encoding", cond = hide_in_width },
						{ "filetype", cond = hide_in_width },
					},
					lualine_y = { "location" },
					lualine_z = { "progress" },
				},
				inactive_sections = {
					lualine_a = {},
					lualine_b = {},
					lualine_c = { { "filename", path = 1 } },
					lualine_x = { { "location", padding = 0 } },
					lualine_y = {},
					lualine_z = {},
				},
				tabline = {},
				extensions = { "fugitive" },
			})
		end,
	},
}
