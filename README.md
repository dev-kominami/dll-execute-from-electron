# Sample app to run DLL from Electron app

## environment

- windows11
- macOS
- node varsion: v16.17.0
- Python 3.10.6 (Required for build when installing ffi-napi)


### environment building

```
npm install
```

## execution method

Run `npm start` on root

## Sample dll-defined functions

- test_print
  - Standard output of characters including argument characters
- register_callback
  - Receives `hello` (string) in callback
- test_add_int
  - Add 1 to the number (+1 in the dll and return)

## Sample Electron Mounting Method

Build in sandbox mode for improved security. Since node cannot be executed in the render process in the sandbox, it is necessary to set up communication between the render process and the main process.


### main process

Main process defines ffi node-related.
``` js :main.js
const ffi = require('ffi-napi')
const library_file = "./dll/Dll1.dll"; //dllファイル
const dll = ffi.Library(library_file, {
  register_callback: ["void", ["pointer"]], //callbackの場合の定義
  test_print: ["void", ["string"]],
  test_add_int: ["int", ["int", "int"]],
});

const callback = ffi.Callback("void", ["string"], function(callback) {
  console.log("callback value:", callback)
});
```
Also, define the bridge on the main process side as a handler in createWindow.
``` js :main.js
  ipcMain.handle('register_callback', async (_e, _arg) => {
    const res = dll.register_callback(callback)
    process.on('exit', function() {
      callback
    });
    return res;
  });
```

### contextBridge
Define a contextBridge between the main process and the render process. within the contextBridge, define the handler names on the main process side and the method names on the render process side.
``` js :preload.js
const electron = require("electron")

electron.contextBridge.exposeInMainWorld(
  // window.requires.xxxでレンダープロセスからアクセスできるようにする
  "requires", {
    register_callback: async () => electron.ipcRenderer.invoke("register_callback"),
    test_print: async () => electron.ipcRenderer.invoke("test_print"),
    test_add_int: async ({a,b}) => electron.ipcRenderer.invoke("test_add_int", {a,b})
  }
);
```

### render process
The method name defined in contextBridge is used as the name of the method in `window.{api name}. {method name}`.

The following is a sample:
``` js :listener.js
const button = document.querySelector('.dll-button');
const addButton = document.querySelector('#add-int-button');

button.addEventListener('click', async function (clickEvent) {
    const res = await window.requires.register_callback();
    // TODO: resはnullになる
    console.log('res',res);

    window.requires.test_print();
  })

addButton.addEventListener('click', async function (clickEvent) {
  const doc = document.getElementById("add-int-value");
  const text = doc.textContent;
  const val = parseInt(text);

  const add_res = await window.requires.test_add_int( { a:val, b:1 } );
  doc.innerHTML = add_res.toString();
})

```