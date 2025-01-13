return {
    {
        "nvim-telescope/telescope-file-browser.nvim",
    },
    {
        "nvim-telescope/telescope.nvim",
        tag = "0.1.5",
        dependencies = { "nvim-lua/plenary.nvim" },
        config = function()
            require("telescope").setup({
                defaults = {
                    theme = "center",               --'cursor', 'dropdown', 'ivy', 'center'
                    sorting_strategy = "ascending", --'ascending', 'descending'
                    layout_config = {
                        horizontal = {
                            prompt_position = "bottom", --'bottom', 'top'
                            preview_width = 0.3,
                        },
                    },
                },
                extensions = {
                    file_browser = {
                        -- disables netrw and use telescope-file-browser in its place
                        hijack_netrw = true,
                        result_height = 20,
                        prompt_title = 'Telescope File Browser',
                        prompt_prefix = 'Files> ',
                        mappings = {
                            ["i"] = {
                                -- your custom insert mode mappings
                            },
                            ["n"] = {
                                -- your custom normal mode mappings
                            },
                        },
                    },
                },
            })
            local builtin = require("telescope.builtin")
            local themes = require("telescope.themes")

            vim.keymap.set('n', '<leader>?', builtin.oldfiles, { desc = '[?] Find recently opened files' })
            vim.keymap.set('n', '<leader>/', function()
                -- You can pass additional configuration to telescope to change theme, layout, etc.
                builtin.current_buffer_fuzzy_find(themes.get_dropdown {
                    winblend = 10,
                    previewer = false,
                })
            end, { desc = '[/] Fuzzily search in current buffer' })

            vim.keymap.set('n', '<leader>gf', builtin.git_files, { desc = 'Search [G]it [F]iles' })
            vim.keymap.set('n', '<leader>sf', builtin.find_files, { desc = '[S]earch [F]iles' })
            vim.keymap.set('n', '<leader>sh', builtin.help_tags, { desc = '[S]earch [H]elp' })
            vim.keymap.set('n', '<leader>sw', builtin.grep_string, { desc = '[S]earch current [W]ord' })
            vim.keymap.set('n', '<leader>sg', builtin.live_grep, { desc = '[S]earch by [G]rep' })
            vim.keymap.set('n', '<leader>sd', builtin.diagnostics, { desc = '[S]earch [D]iagnostics' })
            vim.keymap.set('n', '<leader>sr', builtin.resume, { desc = '[S]earch [R]esume' })
            vim.keymap.set('n', '<leader>sc', builtin.commands, { desc = '[S]earch [C]ommands' })
            vim.keymap.set('n', '<leader>sk', builtin.keymaps, { desc = '[S]earch [K]eymaps' })
            vim.keymap.set('n', '<leader>sb', builtin.buffers, { desc = '[S]how [B]uffers' })
            vim.keymap.set('n', '<leader>ps', function()
                builtin.grep_string({ search = vim.fn.input("Grep > ") })
            end, { desc = '[P]ower [S]earch' })

            vim.keymap.set("n", "<space>fb", "<cmd>Telescope file_browser path=%:p:h select_buffer=true<CR>",
                { desc = '[F]ile [B]rowser', noremap = true })

            require("telescope").load_extension "file_browser"
        end,
    },
}
