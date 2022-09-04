/**
 * サンプルドキュメント
 * https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
 */
const ffi = require("ffi-napi");
console.log('dll test start');

// const function_ptr_1 = ffi.Function("void",[]);
// const function_ptr_2 = ffi.Function("void",["string"]);

// ddlファイルパス
const library_file = "dylib/demo.dylib";


// DLL側を呼び出すfunctionの定義
const dll = ffi.Library(library_file, {
  register_callback: ["void", ["pointer"]], //callbackの場合の定義
  test_print: ["void", ["string"]],
  test_add_int: ["int", ["int","int"]],
});

/**
 * DLLを実行
 * ffi.Callbackでネイティブ・ライブラリに渡すことができるポインタを返す。
 *  */
const callback = ffi.Callback("void", ["string"], function(callback) {
  console.log("callback value:", callback)
});

console.log('register_callback start');
dll.register_callback(callback); //callbackポインタを引数に指定
dll.test_print("test print!!");
const res = dll.test_add_int(10, 1);
console.log('test_add_int', res);
console.log('done');

/**
 * GCを避けるため、コールバックポインタへの参照を追加する。
 * https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial#callbacks
 **/
process.on('exit', function() {
  callback
});
