return {
  "neovim/nvim-lspconfig",
  config = function()
    local lspconfig = require('lspconfig')
    lspconfig.lua_ls.setup {
      -- Server-specific settings. See `:help lspconfig-setup`
      settings = {
      },
    }
  end
}
