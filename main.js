const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  // Get the primary display's work area size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html')).catch((err) => {
    console.error("Failed to load HTML file:", err);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});