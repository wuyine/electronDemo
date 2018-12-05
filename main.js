
const { app, BrowserWindow } = require('electron');

//-----------------------------------------------------------------
const { Menu, MenuItem, dialog, ipcMain } = require('electron');
const { appMenuTemplate } = require('./appmenu.js');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
//是否可以安全退出
let safeExit = false

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 })

  // 然后加载应用的 index.html。
  // win.loadFile('index.html')
  win.loadURL(`file://${__dirname}/index.html`);

  // 打开开发者工具
  win.webContents.openDevTools()

  //增加主菜单（在开发测试时会有一个默认菜单，但打包后这个菜单是没有的，需要自己增加）
  const menu=Menu.buildFromTemplate(appMenuTemplate); //从模板创建主菜单

  menu.items[0].submenu.append(new MenuItem({ //menu.items获取是的主菜单一级菜单的菜单数组，menu.items[0]在这里就是第1个File菜单对象，在其子菜单submenu中添加新的子菜单
    label: "New",
    click(){
      win.webContents.send('action', 'new'); //点击后向主页渲染进程发送“新建文件”的命令
    },
    accelerator: 'CmdOrCtrl+N' //快捷键：Ctrl+N
  }));
  //在New菜单后面添加名为Open的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    label: "Open",
    click(){
      win.webContents.send('action', 'open'); //点击后向主页渲染进程发送“打开文件”的命令
    },
    accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
  })); 
  //再添加一个名为Save的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    label: "Save",
    click(){
      win.webContents.send('action', 'save'); //点击后向主页渲染进程发送“保存文件”的命令
    },
    accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
  }));
  //添加一个分隔符
  menu.items[0].submenu.append(new MenuItem({
    type: 'separator'
  }));
  //再添加一个名为Exit的同级菜单
  menu.items[0].submenu.append(new MenuItem({
    role: 'quit'
  }));
  Menu.setApplicationMenu(menu); //注意：这个代码要放到菜单添加完成之后，否则会造成新增菜单的快捷键无效

  // 当 window 被关闭，这个事件会被触发。

  win.on('close', (e) => {
    if(!safeExit){
      e.preventDefault();
      win.webContents.send('action', 'exiting');
    }
  });

  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

ipcMain.on('reqaction', (event, arg) => {
  switch(arg){
    case 'exit':
      //做点其它操作：比如记录窗口大小、位置等，下次启动时自动使用这些设置；不过因为这里（主进程）无法访问localStorage，这些数据需要使用其它的方式来保存和加载，这里就不作演示了。这里推荐一个相关的工具类库，可以使用它在主进程中保存加载配置数据：https://github.com/sindresorhus/electron-store
      //...
      safeExit=true;
      app.quit();//退出程序
      break;
  }
});