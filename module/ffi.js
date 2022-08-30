const ffi = require("ffi-napi");
const library_file = "../dll/Dll1.dll";

const dll = ffi.Library(library_file, {
  register_callback: ["void", ["pointer"]], //callbackの場合の定義
  test_print: ["string", ["string"]],
});

const callback = ffi.Callback("void", ["string"], function(callback) {
  console.log("callback value:", callback)
});


const dll_ffi = {
  register_callback: function() { 
    dll.register_callback(callback)    
    process.on('exit', function() {
      callback
    });
  },
  test_print: function() { dll.test_print("test print!!") }
}

module.exports = dll_ffi;
// console.log('register_callback start');
// var register_callback = dll.register_callback(callback); //callbackポインタを引数に指定
// var test_print =  dll.test_print("test print!!");
// console.log('done');

// process.on('exit', function() {
//   callback
// });