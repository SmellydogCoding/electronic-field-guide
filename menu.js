module.exports = {
  menu: [
    {
      label: 'File',
      submenu: [
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'copy'
        },
        {
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        // {
        //   role: 'reload' // comment out for production
        // },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      label: 'About',
      click () {
        const main = require('./app.js');
        // open 'about' modal window in the browser window
        main.webContents.send('about');
      }
    }
  ]
}