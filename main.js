const { app, BrowserWindow, shell, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://gemini.google.com') || url.startsWith('https://accounts.google.com')) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('did-create-window', (childWindow) => {
    childWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https://gemini.google.com') || url.startsWith('https://accounts.google.com')) {
        mainWindow.loadURL(url);
        childWindow.close();
        return { action: 'deny' };
      }
      shell.openExternal(url);
      return { action: 'deny' };
    });
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('https://gemini.google.com') && !url.startsWith('https://accounts.google.com')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'j' && input.meta && !input.shift && !input.alt && !input.control) {
      event.preventDefault();
      mainWindow.webContents.sendInputEvent({
        type: 'keyDown',
        keyCode: 'O',
        modifiers: ['meta', 'shift']
      });
    }
  });

  mainWindow.loadURL('https://gemini.google.com');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

