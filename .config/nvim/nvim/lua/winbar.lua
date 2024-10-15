local M = {}

local colors = {
    background = '#1E1E2E',
    purple = '#B192D8',
    green = '#709573',
    orange = '#FAB387',
    white = '#CDD6F4'
}

vim.api.nvim_set_hl(0, 'WinBarSeparator', { bg = colors.background, fg = colors.white })
vim.api.nvim_set_hl(0, 'WinBarContent', { bg = colors.background, fg = colors.green })
vim.api.nvim_set_hl(0, 'WinBarContentModified', { bg = colors.background, fg = colors.orange })

M.eval = function()
    --local file_name = "%-.80t"
    local file_name = vim.api.nvim_eval_statusline("%f", {}).str
    local buf_nr = "[%n]"
    --local modified = " %-m"
    local modified = vim.api.nvim_eval_statusline("%M", {}).str == '+' and ' ➕ ' or '   '
    local right_align = "%="


    -- passing in 'null-ls' to ignore that client in the winbar
    -- otherwise it will show most of the time
    local lsp_client = require("utilities").get_lsp_client('null-ls')

    local lsp_diag = function()
        local count = {}
        local levels = {
            errors = "Error",
            warnings = "Warn",
            info = "Info",
            hints = "Hint",
        }

        for k, level in pairs(levels) do
            count[k] = vim.tbl_count(vim.diagnostic.get(0, { severity = level }))
        end

        local errors = ""
        local warnings = ""
        local hints = ""
        local info = ""

        if count["errors"] ~= 0 then
            errors = " %#LspDiagnosticsSignError#🛑 " .. count["errors"]
        end
        if count["warnings"] ~= 0 then
            warnings = " %#LspDiagnosticsSignWarning#⚠️ " .. count["warnings"]
        end
        -- if count["hints"] ~= 0 then
        --     hints = " %#LspDiagnosticsSignHint# " .. count["hints"]
        -- end
        -- if count["info"] ~= 0 then
        --     info = " %#LspDiagnosticsSignInformation# " .. count["info"]
        -- end

        return errors .. warnings .. hints .. info .. "%#Normal#"
    end

    local lsp_diagnostics = lsp_diag()

    return
        '%#WinBarContent#'
        .. ' '
        .. file_name
        .. modified
        .. '%#WinBarContentModified#'
        .. lsp_client
        .. lsp_diagnostics
        .. '%#WinBarSeparator#'
        .. right_align
        .. buf_nr
end

return M
