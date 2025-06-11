# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VS Code extension that provides language support for YATT (Yet Another Template Toolkit) files. The extension implements a Language Server Protocol (LSP) client that communicates with a Perl-based language server.

## Development Commands

Build the extension:
```bash
npm run compile
```

Watch mode for development:
```bash
npm run watch
```

Run tests:
```bash
npm test
```

Prepare for publishing:
```bash
npm run vscode:prepublish
```

## Architecture

The extension follows a client-server architecture:

1. **Client (TypeScript)**: Located in `src/extension.ts`, uses `vscode-languageclient` to establish LSP communication
2. **Server (Perl)**: The extension searches for `YATT::Lite::LanguageServer` in three locations:
   - `{rootPath}/lib/YATT/Lite/LanguageServer.pm` (git submodule)
   - `{rootPath}/local/lib/perl5/YATT/Lite/LanguageServer.pm` (local installation)
   - Global `yatt langserver` command

The client is activated when opening `.yatt` or `.ytmpl` files and establishes communication with the Perl language server to provide IDE features.

## Key Files

- `src/extension.ts`: Main extension entry point and language server client setup
- `package.json`: Extension manifest defining capabilities, activation events, and configuration
- `syntaxes/yatt.tmLanguage.json`: TextMate grammar for YATT syntax highlighting
- `syntaxes/yatt-multipart.tmLanguage.json`: Grammar for multipart YATT files

## Extension Capabilities

- Syntax highlighting for `.yatt` and `.ytmpl` files
- Language server integration for intelligent code features
- Custom theme support ("yatt default" theme)
- Configurable tracing for debugging LSP communication