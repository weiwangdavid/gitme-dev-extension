// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface DecisionRecord {
    title: string;
    context: string;
    decision: string;
    impacts: string;
    date: string;
    codeChanges: string;
}

class CodeInputPanel {
    public static currentPanel: CodeInputPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;

        this._panel.webview.html = this._getWebviewContent();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'continue':
                        this._panel.dispose();
                        DecisionRecordPanel.createOrShow(this._extensionPath, message.data.codeChanges);
                        break;
                }
            },
            null,
            this._disposables
        );
    }

    public static createOrShow(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (CodeInputPanel.currentPanel) {
            CodeInputPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'codeInput',
            'Code Changes Input',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, 'src', 'webview'))
                ]
            }
        );

        CodeInputPanel.currentPanel = new CodeInputPanel(panel, extensionPath);
    }

    private _getWebviewContent() {
        const webviewPath = path.join(this._extensionPath, 'src', 'webview', 'codeInputForm.html');
        let content = fs.readFileSync(webviewPath, 'utf8');
        return content;
    }

    public dispose() {
        CodeInputPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}

class DecisionRecordPanel {
    public static currentPanel: DecisionRecordPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private readonly _codeChanges: string;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionPath: string, codeChanges: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;
        this._codeChanges = codeChanges;

        this._panel.webview.html = this._getWebviewContent();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'submit':
                        await this._createDecisionRecord({
                            ...message.data,
                            codeChanges: this._codeChanges
                        });
                        break;
                }
            },
            null,
            this._disposables
        );
    }

    public static createOrShow(extensionPath: string, codeChanges: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (DecisionRecordPanel.currentPanel) {
            DecisionRecordPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'decisionRecord',
            'Create Decision Record',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, 'src', 'webview'))
                ]
            }
        );

        DecisionRecordPanel.currentPanel = new DecisionRecordPanel(panel, extensionPath, codeChanges);
    }

    private async _createDecisionRecord(data: any) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                throw new Error('No workspace folder found');
            }

            const decisionsDir = path.join(workspaceFolder.uri.fsPath, '.decisions');
            if (!fs.existsSync(decisionsDir)) {
                fs.mkdirSync(decisionsDir);
            }

            const record: DecisionRecord = {
                ...data,
                date: new Date().toISOString().split('T')[0]
            };

            const fileName = `${record.date}-${record.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
            const filePath = path.join(decisionsDir, fileName);
            
            const content = `# ${record.title}\n\n` +
                `Date: ${record.date}\n\n` +
                `## Code Changes\n\n\`\`\`\n${record.codeChanges}\n\`\`\`\n\n` +
                `## Context\n\n${record.context}\n\n` +
                `## Decision\n\n${record.decision}\n\n` +
                `## Impacts\n\n${record.impacts}\n`;

            fs.writeFileSync(filePath, content);

            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
            
            vscode.window.showInformationMessage('Decision record created successfully!');
            this._panel.dispose();
        } catch (error) {
            vscode.window.showErrorMessage(`Error creating decision record: ${error}`);
        }
    }

    private _getWebviewContent() {
        const webviewPath = path.join(this._extensionPath, 'src', 'webview', 'decisionForm.html');
        let content = fs.readFileSync(webviewPath, 'utf8');
        return content;
    }

    public dispose() {
        DecisionRecordPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Decision Record extension is now active!');

    let disposable = vscode.commands.registerCommand('gitme-dev-extension.createDecisionRecord', async () => {
        // Create template content
        const template = `# Decision Record: <Enter Decision Name>

## Decision Overview
- Decision Name: <Enter the name of your decision>
- Description: <Enter a brief description of the decision>

## Context Recording
### Current Situation/Problem
<Describe the situation or problem you are facing that led to this decision>

### Assumptions
<List the key assumptions behind this decision>

## Impact Forecast
### Potential Positive Impacts
<List potential positive impacts to the system>

#### Required Actions for Positive Impacts
<List actions needed to pursue these positive impacts>

### Potential Negative Impacts
<List potential negative impacts to the system>

#### Mitigation Actions for Negative Impacts
<List actions needed to avoid or mitigate these negative impacts>

## Decision Sidecast
### Alternatives Considered
<List alternative approaches that were considered>

### Comparison Analysis
#### Pros of Current Decision
<List advantages of this decision compared to alternatives>

#### Cons of Current Decision
<List disadvantages of this decision compared to alternatives>
`;

        try {
            // Create a new untitled markdown file
            const document = await vscode.workspace.openTextDocument({
                content: template,
                language: 'markdown'
            });

            // Show the document in the editor
            await vscode.window.showTextDocument(document);

            // Register save handler
            const saveDisposable = vscode.workspace.onDidSaveTextDocument(async (doc) => {
                if (doc === document) {
                    // Extract decision name from the first line
                    const firstLine = doc.lineAt(0).text;
                    const match = firstLine.match(/^# Decision Record: (.+)$/);
                    if (!match) {
                        vscode.window.showErrorMessage('Please provide a decision name in the first line of the document.');
                        return;
                    }

                    const decisionName = match[1].trim();
                    if (decisionName === '<Enter Decision Name>') {
                        vscode.window.showErrorMessage('Please replace "<Enter Decision Name>" with an actual decision name.');
                        return;
                    }

                    // Create .decisions directory if it doesn't exist
                    const workspaceFolders = vscode.workspace.workspaceFolders;
                    if (!workspaceFolders) {
                        vscode.window.showErrorMessage('No workspace folder is open.');
                        return;
                    }

                    const decisionsDir = path.join(workspaceFolders[0].uri.fsPath, '.decisions');
                    if (!fs.existsSync(decisionsDir)) {
                        fs.mkdirSync(decisionsDir);
                    }

                    // Create the decision record file
                    const fileName = `${decisionName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
                    const filePath = path.join(decisionsDir, fileName);

                    try {
                        fs.writeFileSync(filePath, doc.getText());
                        await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
                        vscode.window.showInformationMessage(`Decision record saved as ${fileName}`);
                        
                        // Close the untitled document
                        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                    } catch (err) {
                        vscode.window.showErrorMessage(`Failed to save decision record: ${err}`);
                    }

                    // Dispose the save handler
                    saveDisposable.dispose();
                }
            });
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create decision record template: ${err}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
