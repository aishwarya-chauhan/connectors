// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "connectors" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'connectors.createConnectorYaml', async function () {
		// The code you place here will be executed every time your command is executed
	
		if (!vscode.workspace) {
		  return vscode.window.showErrorMessage('Please open a project folder first');
		}
	
		const folderPath = vscode.workspace.workspaceFolders[0].uri
		  .toString()
		  .split(':')[1];
	
		const connectorYamlContent = `new_connector_function_name:
		title: <Add function title here>
		type: API
		bindings:
		  inputs:
			uri: <3P API Uri>
			method: <GET/POST/PUT/..>
			params: <3P API Request Params>
			headers:
			  Content-Type:
			  Accept: 
		  outputs:
		description: <Add some description about this connector function>
		input_parameters:
		  properties:
			<input_param_1>:
			  type: 
			  title: 
			  name: 
			  description: 
			<input_param_2>:
			  type: 
			  title: 
			  name: 
			  description: 
		output_parameters:
		  required:
		  properties:
			<output_param_1>:
			  type: 
			  title: 
			  name: 
			  description: 
			<output_param_2>:
			  type: 
			  title: 
			  name: 
			  description: `;
	
		fs.writeFile(path.join(folderPath, 'new_connector.yaml'), connectorYamlContent, (err) => {
		  if (err) {
			return vscode.window.showErrorMessage(
			  'Failed to create connector yaml file!'
			);
		  }
		  vscode.window.showInformationMessage('Created Connector Yaml file');
		}); });
    context.subscriptions.push(disposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;