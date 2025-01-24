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

## Decision Record Template Guide

The decision record template is structured to capture comprehensive information about your architectural decisions. Here's what to include in each section:

### Title
```markdown
# Decision Record: <Enter Decision Name>
```
Provide a clear, concise name for your decision. This will also be used to generate the file name.

### Decision Overview
```markdown
## Decision Overview
- Description: <Enter a brief description of the decision>
```
Write a short summary (1-2 sentences) of what this decision is about. This should give readers a quick understanding of the decision without diving into details.

### Context Recording
```markdown
## Context Recording
### Current Situation/Problem
<Describe the situation or problem you are facing that led to this decision>

### Assumptions
<List the key assumptions behind this decision>
```
- **Current Situation/Problem**: Explain the circumstances or challenges that prompted this decision. Include:
  - What triggered the need for this decision?
  - What problems are you trying to solve?
  - What is the current state of the system?

- **Assumptions**: List any assumptions you're making about:
  - Technical environment
  - Business context
  - Resource availability
  - Future conditions
  - Constraints

### Impact Forecast
```markdown
## Impact Forecast
### Potential Positive Impacts
<List potential positive impacts to the system>

#### Required Actions for Positive Impacts
<List actions needed to pursue these positive impacts>

### Potential Negative Impacts
<List potential negative impacts to the system>

#### Mitigation Actions for Negative Impacts
<List actions needed to avoid or mitigate these negative impacts>
```
- **Positive Impacts**: Describe the benefits and improvements this decision will bring:
  - Performance improvements
  - Better maintainability
  - Enhanced security
  - Cost savings
  - List specific actions needed to achieve these benefits

- **Negative Impacts**: Consider potential drawbacks and risks:
  - Technical debt
  - Resource requirements
  - Learning curve
  - Migration challenges
  - Include specific mitigation strategies for each risk

### Decision Sidecast
```markdown
## Decision Sidecast
### Alternatives Considered
<List alternative approaches that were considered>

### Comparison Analysis
#### Pros of Current Decision
<List advantages of this decision compared to alternatives>

#### Cons of Current Decision
<List disadvantages of this decision compared to alternatives>
```
- **Alternatives**: Document other options you considered:
  - Different technologies
  - Alternative approaches
  - Other solutions evaluated

- **Comparison Analysis**: Provide a balanced analysis:
  - Why this solution was chosen over alternatives
  - Trade-offs made in the decision
  - Long-term implications of the choice

## Best Practices for Writing Decision Records

1. **Be Specific**: Provide concrete details and examples where possible
2. **Stay Objective**: Present facts and balanced arguments
3. **Think Long-term**: Consider future maintenance and scalability
4. **Consider Context**: Include relevant technical and business context
5. **Be Concise**: Keep information clear and to the point
6. **Update When Needed**: Revisit and update decisions if circumstances change

## Requirements

TBA

## Release Notes

### 0.0.1 (31-01-2025)

Initial release.

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
