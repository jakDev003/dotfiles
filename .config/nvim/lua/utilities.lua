local M = {}

M.get_lsp_client = function(ignoreClient)
    local msg = 'No Active Lsp'
    local buf_ft = vim.api.nvim_buf_get_option(0, 'filetype')
    local clients = vim.lsp.get_active_clients()
    ignoreClient = ignoreClient or ''
    if next(clients) == nil then
        return msg
    end

    for _, client in ipairs(clients) do
        if ignoreClient and client.name ~= ignoreClient then
            local filetypes = client.config.filetypes
            if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
                return client.name
            end
        end
    end
    return msg
end

M.search_lsp_client = function(clientName)
    local msg = 'No Active Lsp'
    local buf_ft = vim.api.nvim_buf_get_option(0, 'filetype')
    local clients = vim.lsp.get_active_clients()
    if next(clients) == nil then
        return msg
    end

    for _, client in ipairs(clients) do
        if clientName == client.name then
            return client.name
        end
    end
    return msg
end


return M
