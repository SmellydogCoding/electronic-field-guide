'use strict';

// Express functionality
const express = require('express');
const router = express.Router();
const expressApp = express();
// file system functionality for the shell.open command
const path = require('path');
const fs = require('fs');
// remove spaces and other not-allowed characters from pdf document links
const qs = require ("querystring");
// serve icon from the NSIS directory
const iconPath = path.join(__dirname, '/NSIS/icon.png');
// Electron functionality
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const app = electron.app;

// Express routes
router.get('/', function(req, res) {
  res.render('index',{page: "home"});
});

router.get('/food', function(req, res) {
  res.render('food',{page: "Food Establishment"});
});

router.get('/general', function(req, res) {
  res.render('general',{page: "General Sanitation"});
});

router.get('/water', function(req, res) {
  res.render('water',{page: "Drinking Water"});
});

router.get('/pools', function(req, res) {
  res.render('pools',{page: "Recreational Water Facility"});
});

router.get('/bodyart', function(req, res) {
  res.render('bodyart',{page: "Body Art"});
});

router.get('/mobilehome', function(req, res) {
  res.render('mobilehome',{page: "Manufactured Home Community"});
});

router.get('/land', function(req, res) {
  res.render('land',{page: "Land Development"});
});

router.get('/childcare', function(req, res) {
  res.render('childcare',{page: "Child Care"});
});

router.get('/indoorair', function(req, res) {
  res.render('indoorair',{page: "Indoor Air"});
});

router.get('/rabies', function(req, res) {
  res.render('rabies',{page: "Rabies and Vector Control"});
});

router.get('/tanning', function(req, res) {
  res.render('tanning',{page: "Tanning"});
});

router.get('/disaster', function(req, res) {
  res.render('disaster',{page: "Disaster Sanitation"});
});

router.get('/admin', function(req, res) {
  res.render('admin',{page: "Administration"});
});

router.get('/about', (req,res) => {
  res.render('about');
});
  
router.get('/docs/:module/:type/:file', function(req, res) {  
  openfile(req.params.module,req.params.type,req.params.file);
  res.end();
});

// open pdf's in a new window and .xlsx files in Excel
let newWindow;
const openfile = function(module,filetype,filename) {

  let file = 'file:///' + __dirname + '/app/docs/' + module + '/' + filetype + '/' + filename;

  if (filename.includes('.xlsx')) {
    let xlsx = path.join(__dirname + '/app/docs/' + module + '/' + filetype + '/' + filename);
    let xlsxtemp = path.join(app.getPath('temp'),filename);

    let ws = fs.createWriteStream(xlsxtemp);
    // save the excel file as a temp file that can be opened with shell.open
    fs.createReadStream(xlsx).pipe(ws);
      ws.on('finish', () => {
    shell.openItem(xlsxtemp);
    });
  }  else {
    // open pdf's in a new window
    let newWindow = new BrowserWindow({
      width: 800, 
      height: 600,
      icon: iconPath,
      webPreferences: { nodeIntegration: false, contextIsolation: true}
    });

    // new window has no menu
    newWindow.setMenu(null);
    // newWindow.webContents.openDevTools();  // comment out for production

    // prevents eval() from being called - prevents strings being run as JavaScript code
    newWindow.eval = global.eval = function() {
      throw new Error("Sorry, N1 does not support window.eval() for security reasons.");
    }

    const param = qs.stringify({file: file});

    newWindow.loadURL('file://' + __dirname + '/app/pdfjs/web/viewer.html?' + param);
    
    newWindow.on('closed', function() {
      newWindow = null;
    });
  }
}

module.exports = router;