local wezterm = require("wezterm")
local config = {}

if wezterm.config_builder then
  config = wezterm.config_builder()
end

local mux = wezterm.mux

-- Open Full Screen
--wezterm.on('gui-startup', function(cmd)
--  local tab, pane, window = mux.spawn_window(cmd or {})
--  window:gui_window():maximize()
--end)

local act = wezterm.action

config.keys = {
  {
    key = 't',
    mods = 'CMD|SHIFT',
    action = act.ShowTabNavigator,
  }
}

-- Set Default Shell in Windows or Linux
if (wezterm.target_triple:find("linux") ~= nil)
then
	config.default_prog = { '/usr/bin/bash', '-l' }
else
	-- This is for powershell
	--config.default_prog = { 'pwsh.exe', '-l' }
	
	-- This is for WSL	
	local wsl_domains = wezterm.default_wsl_domains()
	
	-- Always use zsh in my WSL.  but really: I recommend running `chsh` inside WSL to make it the default!
	for idx, dom in ipairs(wsl_domains) do
		dom.default_prog = {"bash", "-l"}
	end
	
	config.wsl_domains = wsl_domains
	config.default_domain = "WSL:Ubuntu-24.04"
	
	-- If this gives errors try running this command from an elevated PowerShell
	--"Get-Service vmcompute | Restart-Service"
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
    font = wezterm.font { family = 'Noto Sans', weight = 'Regular' },
}

config.window_background_opacity = 0.8 -- personal recommended value

config.inactive_pane_hsb = {
    saturation = 0.8,
    brightness = 0.7
}

-- and finally, return the configuration to wezterm
return config
