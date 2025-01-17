local shared = require("shared")
local utils = require("utilities")
local randomArt = shared.getRandomArt()
local os = utils.os
local terminal_cmd
local url = "wttr.in/02364"
if os == "Linux" then
	terminal_cmd = "curl --insecure -s '" .. url .. "'"
elseif os == "Windows_NT" then
	terminal_cmd = [[%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -Command "(Invoke-WebRequest -Uri ']]
		.. url
		.. [[' -UseBasicParsing).Content"]]
else
	terminal_cmd = "echo 'Unsupported OS for Weather Report'"
end
return {
	{
		"folke/snacks.nvim",
		priority = 1000,
		lazy = false,
		opts = {
			animate = { enabled = true },
			bigfile = { enabled = true },
			git = { enabled = true },
			dashboard = {
				enabled = true,
				preset = {
					header = randomArt,
				},
				sections = {
					{
						text = randomArt,
						align = "center",
						height = 16,
						width = 48,
						padding = 1,
					},
					{ section = "keys", gap = 1, padding = 1 },
					{ section = "terminal", cmd = terminal_cmd, pane = 2, height = 6 },
					function()
						local Snacks = require("snacks")
						local in_git = Snacks.git.get_root() ~= nil
						local cmds = {
							{
								icon = " ",
								title = "Git Status",
								cmd = "git status",
								height = 10,
							},
						}
						return vim.tbl_map(function(cmd)
							return vim.tbl_extend("force", {
								pane = 2,
								section = "terminal",
								enabled = in_git,
								padding = 1,
								ttl = 5 * 60,
								indent = 3,
							}, cmd)
						end, cmds)
					end,
					{ section = "startup" },
				},
			},
			indent = {
				enabled = true,
				chunk = {
					enabled = true,
					char = {
						corner_top = "╭",
						corner_bottom = "╰",
						arrow = "▶",
						horizontal = "▶",
						-- arrow = '─',
						-- horizontal = '─'
					},
				},
				indent = { enabled = false },
				scope = { enabled = true },
			},
			input = { enabled = true },
			notifier = {
				enabled = true,
				style = function(buf, notif, ctx)
					vim.api.nvim_buf_set_lines(buf, 0, -1, false, vim.split(notif.msg, "\n"))
				end,
				icons = {
					error = "",
					info = "",
					warn = "",
				},
				width = { min = 40, max = 70 },
			},
			quickfile = { enabled = true },
			styles = {
				["notification"] = {
					wo = { wrap = true },
				},
				["notification_history"] = {
					width = 0.8,
					title = " Notifications ",
					keys = { q = "close", ["<Esc>"] = "close" },
					wo = { wrap = true },
				},
			},
			scroll = {
				animate = {
					easing = "inQuad",
				},
			},
			statuscolumn = { enabled = true },
			toggle = { enabled = true },
			words = { enabled = true },
		},
		init = function()
			vim.api.nvim_create_autocmd("User", {
				pattern = "VeryLazy",
				callback = function()
					-- Setup some globals for debugging (lazy-loaded)
					_G.dd = function(...)
						Snacks.debug.inspect(...)
					end
					_G.bt = function()
						Snacks.debug.backtrace()
					end
					vim.print = _G.dd -- Override print to use snacks for `:=` command

					-- Create some toggle mappings
					Snacks.toggle.option("spell", { name = "Spelling" }):map("<leader>us")
					Snacks.toggle.option("wrap", { name = "Wrap" }):map("<leader>uw")
					Snacks.toggle.option("relativenumber", { name = "Relative Number" }):map("<leader>uL")
					Snacks.toggle.diagnostics():map("<leader>ud")
					Snacks.toggle.line_number():map("<leader>ul")
					Snacks.toggle
						.option("conceallevel", { off = 0, on = vim.o.conceallevel > 0 and vim.o.conceallevel or 2 })
						:map("<leader>uc")
					Snacks.toggle.treesitter():map("<leader>uT")
					Snacks.toggle
						.option("background", { off = "light", on = "dark", name = "Dark Background" })
						:map("<leader>ub")
					Snacks.toggle.inlay_hints():map("<leader>uh")
					Snacks.toggle.indent():map("<leader>ug")
					Snacks.toggle.dim():map("<leader>uD")
				end,
			})
		end,
	},
}
