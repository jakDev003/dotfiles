return {
	{
		"nvim-lualine/lualine.nvim",
		dependencies = { "nvim-tree/nvim-web-devicons" },
		config = function()
			-- This function is used to get the current diff status of the file
			local function diff_source()
				local gitsigns = vim.b.gitsigns_status_dict
				if gitsigns then
					return {
						added = gitsigns.added,
						modified = gitsigns.changed,
						removed = gitsigns.removed,
					}
				end
			end

			-- This is a custom component to show the status of the file
			local custom_fname = require("lualine.components.filename"):extend()
			local highlight = require("lualine.highlight")
			local default_status_colors = { saved = "#228B22", modified = "#C70039" }

			function custom_fname:init(options)
				custom_fname.super.init(self, options)
				self.status_colors = {
					saved = highlight.create_component_highlight_group(
						{ bg = default_status_colors.saved },
						"filename_status_saved",
						self.options
					),
					modified = highlight.create_component_highlight_group(
						{ bg = default_status_colors.modified },
						"filename_status_modified",
						self.options
					),
				}
				if self.options.color == nil then
					self.options.color = ""
				end
			end

			function custom_fname:update_status()
				local data = custom_fname.super.update_status(self)
				data = highlight.component_format_highlight(
					vim.bo.modified and self.status_colors.modified or self.status_colors.saved
				) .. data
				return data
			end

			require("lualine").setup({
				options = {
					theme = "auto",
				},
				sections = {
					lualine_a = { "mode" },
					lualine_b = {
						{ "diff", source = diff_source },
						"diagnostics",
						{ "b:gitsigns_head", icon = "" },
					},
					lualine_c = { custom_fname },
					lualine_x = { "fileformat", "filetype" },
					lualine_y = { "progress" },
					lualine_z = { "location" },
				},
			})
		end,
	},
}
