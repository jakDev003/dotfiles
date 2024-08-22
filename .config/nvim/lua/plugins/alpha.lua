return {
    {
        'goolord/alpha-nvim',
        dependencies = {
            'nvim-tree/nvim-web-devicons',
            'nvim-lua/plenary.nvim'
        },
        init = function()
            local alpha = require("alpha")
            local dashboard = require("alpha.themes.dashboard")
            local headers = require("shared").art

            -- Set header
            math.randomseed(os.time())
            dashboard.section.header.val = headers[math.random(1, #headers)]

            local function footer()
                local total_plugins = require("lazy").stats().count
                local datetime = os.date(" %d-%m-%Y   %H:%M:%S")
                local version = vim.version()
                local nvim_version_info = "   v" .. version.major .. "." .. version.minor .. "." .. version.patch

                return datetime .. "   " .. total_plugins .. " plugins" .. nvim_version_info
            end

            -- Set menu
            dashboard.section.buttons.val = {
                dashboard.button("e", "📝  > New file", ":ene <BAR> startinsert <CR>"),
                dashboard.button("f", "🔍  > Find file", ":Telescope find_files<CR>"),
                dashboard.button("o", "📜  > Recent", ":Telescope oldfiles<CR>"),
                dashboard.button("x", "🐢  > Keymaps", ":Telescope keymaps<CR>"),
                dashboard.button("t", "💻  > Terminal", ":ToggleTerm<CR>"),
                dashboard.button("s", "⚙️   > Settings", ":e $MYVIMRC | :cd %:p:h<CR>"),
                dashboard.button("q", "🛑  > Quit NVIM", ":qa<CR>"),
            }

            dashboard.section.footer.val = footer()
            dashboard.section.footer.opts.hl = "Constant"

            -- Send config to alpha
            alpha.setup(dashboard.opts)

            -- Disable folding on alpha buffer
            vim.cmd([[
                autocmd FileType alpha setlocal nofoldenable
            ]])
        end
    },
}
