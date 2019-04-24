// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as path from 'path';

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
	let serverCmd = path.join(rootPath, "lib", "YATT", "Lite", "LanguageServer.pm");
	let serverOptions: ServerOptions = {
		run: { command: serverCmd, args: ["server"]},
		debug: { command: serverCmd, args: ["server"]}
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

// this method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();

}
