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
}

class DecisionRecordPanel {
    public static currentPanel: DecisionRecordPanel | undefined;
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
                    case 'submit':
                        await this._createDecisionRecord(message.data);
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

        DecisionRecordPanel.currentPanel = new DecisionRecordPanel(panel, extensionPath);
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

    let disposable = vscode.commands.registerCommand('gitme-dev-extension.createDecisionRecord', () => {
        DecisionRecordPanel.createOrShow(context.extensionPath);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
