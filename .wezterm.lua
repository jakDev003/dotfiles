local wezterm = require("wezterm")
local config = {
	exit_behavior = "Hold",
	exit_behavior_messaging = "Verbose",
	use_fancy_tab_bar = true,
}

if wezterm.config_builder then
	config = wezterm.config_builder()
end


local act = wezterm.action


-- Set Default Shell in Windows or Linux
if (wezterm.target_triple:find("linux") ~= nil)
then
	config.default_prog = { '/usr/bin/bash', '-l' }
else
	config.default_prog = { 'C:/Program Files/Git/bin/bash.exe', '-l' }

	-- This is for WSL	
	--local wsl_domains = wezterm.default_wsl_domains()

	-- Always use zsh in my WSL.  but really: I recommend running `chsh` inside WSL to make it the default!
	--for idx, dom in ipairs(wsl_domains) do
	--	dom.default_prog = {"bash", "-l"}
	--end

	--config.wsl_domains = wsl_domains
	--config.default_domain = "WSL:Ubuntu-24.04"

	-- If this gives errors try running this command from an elevated PowerShell
	--"Get-Service vmcompute | Restart-Service"

	config.launch_menu = {
		-- {
		-- 	label = 'PWSH',
		-- 	args = { 'pwsh.exe', '-l' },
		-- 	cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
		-- 	-- set_environment_variables = { FOO = "bar" },	
		-- },
		{
			label = 'PWSH-old',
			args = { 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = 'Git Bash',
			args = { 'C:/Program Files/Git/bin/bash.exe', '-l' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = 'DevDev',
			args = { 'pwsh.exe ssh dev', '-l' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = 'DevBuild',
			args = { 'pwsh.exe ssh dev-build', '-l' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = 'DevTunnel',
			args = { 'pwsh.exe ssh dev-tunnel', '-l' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = 'JAKDevBox',
			args = { 'pwsh.exe ssh jakdevbox', '-l' },
			cwd = "C:/Users/jkagiwada/Documents/Git-Repos",
			-- set_environment_variables = { FOO = "bar" },	
		},
		{
			label = "CleanupDocker",
			args = { 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe  %USERPROFILE%/Documents/CustomCode/Powershell/Cleanup_Docker.ps1' }
		},
		{
			label = 'CMD',
			args = { 'cmd.exe', '-l' },

		},
	}
end


-- Set Theme
config.color_scheme = '3024 (dark) (terminal.sexy)'
config.font = wezterm.font {
	family = 'JetBrainsMono Nerd Font',
}
config.font_size = 14
config.line_height = 1

-- Font options
config.font_shaper = "Harfbuzz"

-- Font rendering
config.freetype_render_target = "Light"

-- Cursor style
config.default_cursor_style = "BlinkingBar"


config.window_frame = {
	font = wezterm.font { family = 'JetBrainsMono Nerd Font', weight = 'Regular' },
}

config.window_background_opacity = 0.8 -- personal recommended value

config.inactive_pane_hsb = {
	saturation = 0.8,
	brightness = 0.7
}

-- Key Bindings
config.keys = {
	{
		key = 't',
		mods = 'CMD|SHIFT',
		action = act.ShowTabNavigator,
	},
	{
		key = 'Space',
		mods = 'ALT',
		action = act.ShowLauncherArgs { flags = 'FUZZY|TABS' },
	},
	{
		key = "Space",
		mods = "CTRL",
		action = wezterm.action.ShowLauncherArgs { flags = 'LAUNCH_MENU_ITEMS|FUZZY' },
	},
}


-- and finally, return the configuration to wezterm
return config
