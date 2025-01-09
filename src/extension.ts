// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as path from 'path';

import * as fs from 'fs';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;

function defaultValue<T>(value: T | undefined | null, defaultValue: T): T {
	if (value) {
		return value;
	} else {
		return defaultValue;
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "yatt-langserver" is now active!');
	let rootPath: string = defaultValue(
		vscode.workspace.rootPath,
		context.asAbsolutePath(path.join())
	);

  const {command, args} = find_langserver(rootPath);
  console.log("language server:", command, args);
	let serverOptions: ServerOptions = {
		run: { command, args},
		debug: { command, args}
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{scheme: 'file', language: 'yatt'}]
	};

	client = new LanguageClient(
		"yattLanguageServer",
		"yatt language server ex",
		serverOptions,
		clientOptions
	);

	client.start();
}

export function find_langserver(rootPath: string): {command: string, args: string[]} {
  let command = path.join(rootPath, "lib", "YATT", "Lite", "LanguageServer.pm")
  if (fs.existsSync(command)) {
    return {command, args: ["server"]}
  }
  command = path.join(rootPath, "local", "lib", "perl5", "YATT", "Lite", "LanguageServer.pm")
  if (fs.existsSync(command)) {
    return {command, args: ["server"]}
  }

  return {command: "yatt", args: ["langserver"]};
}

// this method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();

}
