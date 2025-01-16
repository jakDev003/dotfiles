local M = {}
---@diagnostic disable-next-line: deprecated
local uv = vim.version().minor >= 10 and vim.uv or vim.loop
M.os = vim.loop.os_uname().sysname
M.iswin = M.os:match("Windows")
M.ismac = M.os == "Darwin"
M.is_ten = vim.version().minor >= 10
M.path_sep = M.iswin and "\\" or "/"

M.path_join = function(...)
	return table.concat({ ... }, M.path_sep)
end

M.get_lsp_client = function(ignoreClient)
	local msg = "No Active Lsp"
	local buf_ft = vim.api.nvim_buf_get_option(0, "filetype")
	local clients = vim.lsp.get_active_clients()
	ignoreClient = ignoreClient or ""
	if next(clients) == nil then
		return msg
	end

	for _, client in ipairs(clients) do
		if ignoreClient ~= client.name then
			local filetypes = client.config.filetypes
			if filetypes and vim.fn.index(filetypes, buf_ft) ~= -1 then
				return client.name
			end
		end
	end
	return msg
end

M.search_lsp_client = function(clientName)
	local msg = "No Active Lsp"
	---@diagnostic disable-next-line: deprecated
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
