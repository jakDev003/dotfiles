-- Define a module table
local M = {}

-- Define a table with various ASCII art strings
M.art = {
	{
		[[      ::::::::::: ::::::::   ::::::::  :::    :::      ]],
		[[          :+:    :+:    :+: :+:    :+: :+:    :+:      ]],
		[[          +:+    +:+    +:+ +:+        +:+    +:+      ]],
		[[          +#+    +#+    +:+ +#++:++#++ +#++:++#++      ]],
		[[          +#+    +#+    +#+        +#+ +#+    +#+      ]],
		[[      #+# #+#    #+#    #+# #+#    #+# #+#    #+#      ]],
		[[       #####      ########   ########  ###    ###      ]],
	},
	{
		[[███╗  ██╗ ███████╗  █████╗  ██╗   ██╗ ██╗ ███╗   ███╗]],
		[[████╗ ██║ ██╔════╝ ██╔══██╗ ██║   ██║ ██║ ████╗ ████║]],
		[[██╔██╗██║ █████╗   ██║  ██║ ╚██╗ ██╔╝ ██║ ██╔████╔██║]],
		[[██║╚████║ ██╔══╝   ██║  ██║  ╚████╔╝  ██║ ██║╚██╔╝██║]],
		[[██║ ╚███║ ███████╗ ╚█████╔╝   ╚██╔╝   ██║ ██║ ╚═╝ ██║]],
		[[╚═╝  ╚══╝ ╚══════╝  ╚════╝     ╚═╝    ╚═╝ ╚═╝     ╚═╝]],
	},
	{
		[[ /$$$$$$$   /$$$$$$   /$$$$$$  /$$    /$$ /$$ /$$$$$$/$$$$ ]],
		[[| $$__  $$ /$$__  $$ /$$__  $$|  $$  /$$/| $$| $$_  $$_  $$]],
		[[| $$  \ $$| $$$$$$$$| $$  \ $$ \  $$/$$/ | $$| $$ \ $$ \ $$]],
		[[| $$  | $$| $$_____/| $$  | $$  \  $$$/  | $$| $$ | $$ | $$]],
		[[| $$  | $$|  $$$$$$$|  $$$$$$/   \  $/   | $$| $$ | $$ | $$]],
		[[|__/  |__/ \_______/ \______/     \_/    |__/|__/ |__/ |__/]],
	},
	{
		[[         ██╗ ██████╗ ███████╗██╗  ██╗    ]],
		[[         ██║██╔═══██╗██╔════╝██║  ██║    ]],
		[[         ██║██║   ██║███████╗███████║    ]],
		[[    ██   ██║██║   ██║╚════██║██╔══██║    ]],
		[[    ╚█████╔╝╚██████╔╝███████║██║  ██║    ]],
		[[     ╚════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝    ]],
		[[                                         ]],
	},
	{
		[[    ⡴⠶⠦⠤⣤⣄⣀⡀⢀⣠⡴⠖⠚⠋⠛⠛⠲⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⢀⠀    ]],
		[[    ⠙⢦⡀⠉⠒⠤⣍⡉⠉⠁⠀⠐⢤⠐⠀⡰⠀⠀⠈⠙⠉⢉⣉⣉⣉⠍⠉⣩⠇    ]],
		[[    ⠀⠀⠻⣄⠀⠀⠀⢻⢤⣞⣿⣿⡆⢀⡀⢠⣟⣿⣷⠄⡾⠉⠀⠀⠀⣠⡾⠃⠀    ]],
		[[    ⠀⠀⠀⠙⠳⣤⣀⣈⣀⠙⠿⠟⠃⢓⡊⠙⠻⠛⠋⣠⣃⣀⣀⣤⠞⠋⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠈⢻⡝⠓⠒⢺⠷⠒⠒⠒⠛⠛⢉⣩⠿⣿⡁⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⣼⡟⢲⢤⣸⡄⠀⢀⣠⠴⣺⡏⣏⣤⡾⠇⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⣿⢞⣺⣠⠋⠹⠉⡏⢁⡴⣹⣧⣤⠾⠁⠀⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠙⢻⡟⢁⠄⡇⢠⠈⠉⠀⠋⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⢸⠋⠁⠀⡇⢸⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠙⠛⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ]],
	},
	{
		[[    ⢦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡤    ]],
		[[    ⠘⣿⣿⣿⣷⣦⣄⣀⠀⢠⠔⠀⢀⡼⠿⠿⢆⠀⠀⠲⣄⠀⣀⣠⣴⣾⣿⣿⣿⠇    ]],
		[[    ⠀⠈⠉⠉⠛⠛⠻⠿⢿⣿⠀⢀⣾⣷⡀⢀⣾⣷⡀⠀⣿⡿⠿⠿⠛⠛⠉⠉⠁⠀    ]],
		[[    ⠀⠀⣤⣤⣶⣶⣶⣶⣶⣿⣆⠈⠉⠉⠉⠉⠉⠉⠉⢠⣿⣶⣶⣶⣶⣶⣤⣤⠀⠀    ]],
		[[    ⠀⠀⠘⣿⡿⠟⠛⠉⣡⣿⣿⣷⣤⠀⢠⣆⠀⣤⣶⣿⣿⣬⡉⠛⠻⠿⣿⠇⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⢀⣴⣿⡿⢋⣿⣿⠛⢠⣿⣿⡄⠛⢿⣿⡘⢿⣿⣦⣀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠉⠻⠏⠀⣸⣿⡇⢀⠻⣿⣿⠟⣀⠸⣿⣇⠀⠙⠟⠋⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢠⡟⠁⣿⣿⠀⠻⣆⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⠘⢟⠉⠙⠓⠀⠘⠏⠀⠘⠟⠉⡻⠋⠀⠀⠀⠀⠀⠀⠀⠀    ]],
	},
	{
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣄⠀⠀⠀⠀⠀⠀⣿⣆⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⠀⠀⠀⠀⣿⣿⡄⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⣠⡿⠿⠻⢿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⢹⣿⡇⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⣀⣤⣶⡀⠀⠻⢛⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠈⣿⣷⠀⠀⠀⠀    ]],
		[[    ⠀⠀⢠⣾⣿⣿⣿⣿⡦⣼⣯⣵⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⢹⣿⠀⠀⠀⠀    ]],
		[[    ⠀⢠⣿⣿⣿⣿⣿⣿⡿⠿⢿⣿⣿⣿⣿⣿⡿⣿⣿⣦⣀⢀⡘⣿⡇⠀⠀⠀    ]],
		[[    ⠀⣾⣿⣿⣿⣿⡟⠉⠀⠀⣾⣿⣿⣿⣿⠟⠁⠀⠉⠻⣿⣿⣿⣿⣧⣠⣶⠄    ]],
		[[    ⢰⣿⣿⣿⡿⠋⠀⠀⠀⢀⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠙⠻⣿⣿⣿⡟⠁⠀    ]],
		[[    ⢸⣿⡿⠋⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠙⢻⡃⠀⠀    ]],
		[[    ⠀⠁⠀⠀⠀⠀⠀⠀⣾⣿⣿⠿⣿⡿⢿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠙⢿⣿⣶⣶⣤⠀⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠀⠀⣻⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⢻⣿⣿⣇⠀⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⢰⣾⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣦⠀⠀⠀⠀    ]],
		[[    ⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⠿⠿⠀⠀⠀⠀    ]],
	},
}

-- Function to get a random ASCII art from the table
M.getRandomArt = function()
	if #M.art == 0 then
		return nil
	end
	-- Seed the random number generator
	math.randomseed(os.time())
	-- Get a random index from the table
	local art = M.art[math.random(#M.art)]
	-- Concatenate the lines into a single string
	return table.concat(art, "\n")
end

-- Return the module
return M
