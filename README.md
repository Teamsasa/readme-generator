# Project
### Readme Generator

# Quick Start Guide
Access the application and select the content and color you want to add to your README from the select box, then press the Generate Code button. You can add as many items as you like.
```
https://readmes.studio/
```

# Developer Content
## Quick Start Guide
1. install dependencies
	```
	npm install
	```
2. Start the development server
	```
	npm run dev
	```
3. Access the application at local server
	```
	http://localhost:5173/
	```
## Tests used in CI
### ESlint
ESLint is a static code analysis tool for JavaScript and TypeScript that detects syntax errors and style issues without executing the code.<br/>

🔻By running the following command in the terminal, you can detect errors🔻
```
npm run lint
```
### prettier
Prettier is a code formatter that helps keep your code looking neat and consistent. It supports JavaScript, TypeScript, HTML, CSS, JSON, Markdown, and more. By using Prettier, you can easily maintain a uniform code style across your project, which improves readability and makes the code easier to work with.<br/>

🔻By running the following command in the terminal, you can detect parts of the code that differ from the format🔻
```
npx prettier . --check
```
🔻By running the following command in the terminal, you can format your code🔻
```
npx prettier . --write
```
### TypeScript Type Checking
It compiles TypeScript code to check for errors without actually generating JavaScript files.<br/>

🔻By running the following command in the terminal, you can detect errors🔻
```
npx tsc --noEmit
```
