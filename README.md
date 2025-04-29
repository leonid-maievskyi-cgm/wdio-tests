# WebdriverIO + TypeScript Automation Framework

This project is a custom automation framework built with WebdriverIO, TypeScript, and Allure Reporter.
It supports testing for desktop browsers (Chrome and Firefox), API, and mobile configurations.

Project Features

WebdriverIO + TypeScript setup

Page Object Model (POM) architecture

Separate configs for Desktop, Mobile, API, and United (multi-browser) runs

Allure Reporter integration for test results

Clean structure with reusable BasePage methods

Ready for local and CI/CD runs

# Import settings for visual code

(Run it in terminal VS Code or in system console: PowerShell, Bash, etc.)

✅ Windows (PowerShell):

```powershell
# Шлях до VS Code user settings
$dest = "$env:APPDATA\Code\User"

# Копіювання налаштувань
copy .vscode-settings-backup\settings.json $dest\ -Force

# Копіювання сніпетів
copy .vscode-settings-backup\snippets\* $dest\snippets\ -Force

# Встановлення розширень
Get-Content .vscode-settings-backup\extensions.txt | ForEach-Object { code --install-extension $_ }
```

✅ Linux/macOS (Bash):
```bash
DEST="$HOME/.config/Code/User"

# Копіювання налаштувань
cp .vscode-settings-backup/settings.json "$DEST"/

# Копіювання сніпетів
mkdir -p "$DEST/snippets"
cp .vscode-settings-backup/snippets/* "$DEST/snippets/"

# Встановлення розширень
xargs -n 1 code --install-extension < .vscode-settings-backup/extensions.txt
```