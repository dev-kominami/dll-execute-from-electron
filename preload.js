const electron = require("electron")

electron.contextBridge.exposeInMainWorld(
  // window.requires.xxxでレンダープロセスからアクセスできるようにする
  "requires", {
    register_callback: async () => electron.ipcRenderer.invoke("register_callback"),
    test_print: async () => electron.ipcRenderer.invoke("test_print"),
    test_add_int: async ({a,b}) => electron.ipcRenderer.invoke("test_add_int", {a,b})
  }
);