# WebdriverIO + TypeScript Automation Framework

This automation framework utilizes WebdriverIO, TypeScript, and Allure Reporter for an efficient, multi-platform testing experience.

## Key Features
- **Cross-Platform Support:** Test on desktop browsers (Chrome, Firefox), APIs, and mobile configurations.
- **Page Object Model (POM):** Maintainable and scalable test architecture.
- **Multiple Configurations:** Separate setups for Desktop, Mobile, API, and multi-browser (United) runs.
- **Allure Integration:** Generate comprehensive test reports.
- **Reusable Components:** BasePage methods promote code reusability.
- **CI/CD Ready:** Easily integrate with your continuous integration pipelines.

## Import Settings for Visual Studio Code

Follow the instructions below to import your VS Code settings:

### ✅ Windows (PowerShell)
```powershell
# Define the destination for VS Code user settings
$dest = "$env:APPDATA\Code\User"

# Copy settings
Copy-Item .vscode-settings-backup\settings.json -Destination "$dest\" -Force

# Copy snippets
Copy-Item .vscode-settings-backup\snippets\* -Destination "$dest\snippets\" -Force

# Install extensions listed in the backup file
Get-Content .vscode-settings-backup\extensions.txt | ForEach-Object { code --install-extension $_ }
```

### ✅ Linux/macOS (Bash)
```bash
DEST="$HOME/.config/Code/User"

# Copy settings
cp .vscode-settings-backup/settings.json "$DEST/"

# Ensure snippets directory exists and copy snippets
mkdir -p "$DEST/snippets"
cp .vscode-settings-backup/snippets/* "$DEST/snippets/"

# Install extensions from the list
xargs -n 1 code --install-extension < .vscode-settings-backup/extensions.txt
```

*Note:* If your Windows setup defaults to `bash`, you may run the `bash` script instead.
