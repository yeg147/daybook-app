const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true, // Changed to true
      contextIsolation: false // Changed to false for simpler printing
    }
  });

  win.loadFile('index.html');

  // This part handles the print command from your web app
  ipcMain.on('print-to-pdf', (event) => {
    const winToPrint = BrowserWindow.fromWebContents(event.sender);
    winToPrint.webContents.print({}, (success, failureReason) => {
      if (!success) console.log(failureReason);
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
