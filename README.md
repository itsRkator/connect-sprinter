# LinkedIn Auto Connection Chrome Extension

This Chrome extension automates sending connection requests on LinkedIn. Follow the steps below to set up, run, build, and install the extension.

---

### Table of Contents

1. [Project Setup](#project-setup)
2. [Folder Structure](#folder-structure)
3. [Available Scripts](#available-scripts)
4. [Running the Application](#running-the-application)
5. [Building the Extension](#building-the-extension)
6. [Creating a CRX File](#creating-a-crx-file)
7. [Loading the Extension into Chrome](#loading-the-extension-into-chrome)
8. [Generating an Installable Extension](#generating-an-installable-extension)

---

### Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/itsRkator/connect-sprinter.git
   cd linkedin-auto-connection
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Install Chrome Types for Development (Optional but Recommended):**

   ```bash
   npm install --save-dev @types/chrome
   ```

---

### Folder Structure

The main folder structure is as follows:

```plaintext
linkedin-auto-connection/
├── build/                         # Built extension files
│   ├── static/
│   ├── asset-manifest.json
│   ├── background.js
│   ├── content.js
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── node_modules/
├── public/                        # Public files for the React application
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/                           # Source files
│   ├── Popup/
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── background.ts
│   ├── content.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

---

### Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the project for production, creating files under the `build/` directory.

---

### Running the Application

To run the application in development mode:

```bash
npm start
```

This will start a local development server and open the app in the browser. The page will reload automatically if you make changes to the source files.

---

### Building the Extension

To prepare the extension for Chrome, you’ll need to build the project:

```bash
npm run build
```

This command creates optimized files under the `build` directory. These files will be used to load the extension into Chrome or to create an installable `.crx` file.

---

### Creating a CRX File

To generate an installable `.crx` file:

1. **Install `crx3` globally** (if you haven’t done so already):

   ```bash
   npm install -g crx3
   ```

2. **Navigate to the `build` directory**:

   ```bash
   cd build
   ```

3. **Refactor the generated content.js and background.js**
   Navigate to the content.js and background.js files in the generated `build` directory and remove the following line from both mentioned files before loading in the chrome:

   ```
   exports.__esModule = true;
   ```

4. **Use `crx3` to pack the extension**, generating a `.pem` key if one does not exist:

   ```bash
   crx3 --pack . --out linkedin-auto-connection.crx
   ```

   This command will create two files:

   - **linkedin-auto-connection.crx**: The installable extension file.
   - **linkedin-auto-connection.pem**: The private key file used for signing the extension.

> **Note**: Keep the `.pem` file safe as it is necessary for future updates to this extension.

---

### Loading the Extension into Chrome

To test the extension in Chrome:

1. Open Chrome and go to **chrome://extensions/**.
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select the `build` directory.

This will load the extension as an unpacked extension, allowing you to test its functionality directly in the browser.

---

### Generating an Installable Extension

To generate a fully installable `.crx` file, follow these steps:

1. **Create the CRX File**: As outlined above, use `crx3` to package the `build` directory into a `.crx` file. The `.crx` file serves as your installable extension file.

2. **Distribute the CRX**: Share the `.crx` file with users who wish to install the extension by dragging it into the Chrome **Extensions** page or by loading it directly.

---

> **Note**: Since this extension is not hosted on the Chrome Web Store, you may receive a warning when installing it, stating that it was added without going through the Chrome Web Store.
