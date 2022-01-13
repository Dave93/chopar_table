const { app, BrowserWindow } = require("electron");
const path = require("path");
const ElectronPreferences = require("electron-preferences");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const preferences = new ElectronPreferences({
  /**
   * Where should preferences be saved?
   */
  dataStore: path.resolve(app.getPath("userData"), "preferences.json"),
  /**
   * Default values.
   */
  defaults: {},
  sections: [
    {
      id: "main",
      label: "Главные настройки",
      /**
       * See the list of available icons below.
       */
      icon: "settings-gear-63",
      form: {
        groups: [
          {
            /**
             * Group heading is optional.
             */
            label: "Настройки",
            fields: [
              {
                label: "Путь к order.txt",
                key: "file_path",
                type: "text",
                /**
                 * Optional text to be displayed beneath the field.
                 */
                help: "Укажите путь к файлу order.txt",
              },
            ],
          },
        ],
      },
    },
  ],
  browserWindowOpts: {
    title: "Настройки",
    width: 900,
    maxWidth: 1000,
    height: 700,
    maxHeight: 1000,
    resizable: true,
    maximizable: false,
    //...
  },
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    "accept-first-mouse": true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
