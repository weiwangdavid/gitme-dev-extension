# gitme-dev-extension README

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the README for your extension "gitme-dev-extension". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Decision Record Manager

A VS Code extension for creating and managing decision records directly in your workspace. This extension helps teams document and track important decisions in their projects.

### Creating Decision Records
To create a new decision record:
1. Open the command palette (Cmd+Shift+P / Ctrl+Shift+P)
2. Type "Record a decision"
3. A markdown template will open in your editor with the following sections:
   - Decision Overview: Name and description of the decision
   - Context Recording: Current situation and assumptions
   - Impact Forecast: Positive/negative impacts and required actions
   - Decision Sidecast: Alternatives and comparison analysis
4. Fill in the template with your decision details
5. Save the file (Cmd+S / Ctrl+S)

The extension will:
- Create a `.decisions` directory in your workspace (if it doesn't exist)
- Save your decision record as a markdown file
- Name the file based on your decision name
- Open the saved file for review

## File Structure

Decision records are stored in the `.decisions` directory of your workspace. Each file is named using the decision name (converted to lowercase with spaces replaced by hyphens).

For example, if your decision is named "Use PostgreSQL for Database", the file will be saved as:
```
.decisions/use-postgresql-for-database.md
```

Each decision record follows a structured template that includes:
- Decision Overview
- Context Recording
- Impact Forecast
- Decision Sidecast

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Development

### Testing the Extension

There are two ways to test the extension:

#### 1. Running in Development Mode
1. Open this project in VS Code
2. Press `F5` to start debugging
3. A new VS Code window will open with the extension loaded
4. Open the Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
5. Type "Record a decision" and select the command
6. Test the workflow:
   - Verify the template opens
   - Fill in the decision details
   - Save the file
   - Check that it's saved in the `.decisions` directory with the correct name

#### 2. Running Automated Tests
1. Open a terminal in the project root
2. Run the following commands:
   ```bash
   npm install  # Install dependencies
   npm run test # Run the test suite
   ```

The test suite includes:
- Verification of extension activation
- Command registration check
- Full workflow test with template creation and file saving
- Cleanup of test artifacts

### Test Coverage
The automated tests cover:
- Extension presence and activation
- Command registration
- Template content verification
- File saving and naming
- Directory creation
- Error handling for invalid inputs

Report any issues or bugs in the GitHub repository's issue tracker.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
