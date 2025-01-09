"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.find_langserver = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const vscode_languageclient_1 = require("vscode-languageclient");
let client;
function defaultValue(value, defaultValue) {
    if (value) {
        return value;
    }
    else {
        return defaultValue;
    }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "yatt-langserver" is now active!');
    let rootPath = defaultValue(vscode.workspace.rootPath, context.asAbsolutePath(path.join()));
    const { command, args } = find_langserver(rootPath);
    console.log("language server:", command, args);
    let serverOptions = {
        run: { command, args },
        debug: { command, args }
    };
    let clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'yatt' }]
    };
    client = new vscode_languageclient_1.LanguageClient("yattLanguageServer", "yatt language server ex", serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
function find_langserver(rootPath) {
    let command = path.join(rootPath, "lib", "YATT", "Lite", "LanguageServer.pm");
    if (fs.existsSync(command)) {
        return { command, args: ["server"] };
    }
    command = path.join(rootPath, "local", "lib", "perl5", "YATT", "Lite", "LanguageServer.pm");
    if (fs.existsSync(command)) {
        return { command, args: ["server"] };
    }
    return { command: "yatt", args: ["langserver"] };
}
exports.find_langserver = find_langserver;
// this method is called when your extension is deactivated
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map