import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('gitme-dev.gitme-dev-extension'));
    });

    test('Should create decision record command should be registered', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('gitme-dev-extension.createDecisionRecord'));
    });

    test('Should create decision record with template', async () => {
        // Create a temporary workspace folder
        const tmpFolder = path.join(__dirname, 'tmp-test-workspace');
        if (!fs.existsSync(tmpFolder)) {
            fs.mkdirSync(tmpFolder, { recursive: true });
        }

        try {
            // Open the temporary workspace
            await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(tmpFolder));

            // Execute the command
            await vscode.commands.executeCommand('gitme-dev-extension.createDecisionRecord');

            // Get the active text editor
            const editor = vscode.window.activeTextEditor;
            assert.ok(editor, 'Editor should be opened');

            // Verify template content
            const content = editor.document.getText();
            assert.ok(content.includes('# Decision Record: <Enter Decision Name>'), 'Template should have title');
            assert.ok(content.includes('## Decision Overview'), 'Template should have overview section');
            assert.ok(content.includes('## Context Recording'), 'Template should have context section');
            assert.ok(content.includes('## Impact Forecast'), 'Template should have impact section');
            assert.ok(content.includes('## Decision Sidecast'), 'Template should have sidecast section');

            // Test saving a decision record
            const testDecisionName = 'Test Decision';
            const expectedFileName = 'test-decision.md';

            // Replace the template title with test decision name
            await editor.edit(editBuilder => {
                const firstLine = editor.document.lineAt(0);
                editBuilder.replace(firstLine.range, `# Decision Record: ${testDecisionName}`);
            });

            // Save the document
            await editor.document.save();

            // Verify the file was created in .decisions directory
            const decisionsDir = path.join(tmpFolder, '.decisions');
            assert.ok(fs.existsSync(decisionsDir), '.decisions directory should be created');

            const decisionFile = path.join(decisionsDir, expectedFileName);
            assert.ok(fs.existsSync(decisionFile), 'Decision file should be created');

            // Verify file content
            const savedContent = fs.readFileSync(decisionFile, 'utf8');
            assert.ok(savedContent.includes(`# Decision Record: ${testDecisionName}`), 'Saved file should have correct title');
        } finally {
            // Cleanup
            if (fs.existsSync(tmpFolder)) {
                fs.rmSync(tmpFolder, { recursive: true, force: true });
            }
        }
    });

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
});
