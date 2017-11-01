'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create the application menu
const Menu = electron.Menu;
// Module to listen for data from the the remote process;
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// import the menu object
const template = require('./menu.js')
// Module to open a pdf in a new remote browser window
const remote = electron.remote;
// express functionality
const express = require('express');
const expressApp = express();
const port = process.env.PORT || 3000;
const path = require('path')
const url = require('url')

// content security policy
expressApp.use((req,res,next) => {
  res.setHeader(
    "content-security-policy", "script-src 'self'"
  )
  next();
});

// get routes file
const router = require('./router.js');
// use routes file for routing, mounted at root
expressApp.use('/', router);

// serve static files in the public directory
expressApp.use(express.static(__dirname + '/app/public'));
// serve pdf files in the docs directory
expressApp.use(express.static(__dirname + '/app/docs'));
// serve icon from the NSIS directory
const iconPath = path.join(__dirname, '/NSIS/icon.png');

// pug template engine
expressApp.set('view engine','pug');
expressApp.set('views', __dirname + '/app/views');

// express server
expressApp.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});

// Electron Functionality

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the menu
  const menu = Menu.buildFromTemplate(template.menu)
  Menu.setApplicationMenu(menu)

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1280, height: 800, icon: iconPath });

  // and load the index page of the app.
  mainWindow.loadURL('http://localhost:3000');

  // prevents eval() from being called - prevents strings being run as JavaScript code
  mainWindow.eval = global.eval = function() {
    throw new Error("Sorry, N1 does not support window.eval() for security reasons.");
  }

  // Open the DevTools.  Comment out on production version.
  // mainWindow.webContents.openDevTools()
 
  // export webcontents for use in the menu.js file
  // export openWindowsList function for use in the router.js file
  // webContents must be exported after the main window is initialized or it will be undefined
  module.exports = {
    webContents: mainWindow.webContents,
  };

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    // quitting the app on main window close will close any other open windows
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})