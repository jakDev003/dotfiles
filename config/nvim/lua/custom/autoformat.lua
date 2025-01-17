local setup = function()
  -- Autoformatting Setup
  local conform = require "conform"
  conform.setup {
    formatters = {
      ["ml-format"] = {
        command = "./_build/_private/default/.dev-tool/ocamlformat/ocamlformat/target/bin/ocamlformat",
        args = {
          "--enable-outside-detected-project",
          "--name",
          "$FILENAME",
          "-",
        },
      },
    },
    formatters_by_ft = {
      lua = { "stylua" },
      blade = { "blade-formatter" },
    },
  }

  conform.formatters.injected = {
    options = {
      ignore_errors = false,
      lang_to_formatters = {
      },
    },
  }

  vim.api.nvim_create_autocmd("BufWritePre", {
    group = vim.api.nvim_create_augroup("custom-conform", { clear = true }),
    callback = function(args)
      local ft = vim.bo.filetype
      require("conform").format {
        bufnr = args.buf,
        lsp_fallback = true,
        quiet = true,
      }
    end,
  })
end

setup()

return { setup = setup }
