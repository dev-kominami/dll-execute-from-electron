const ffi = require("ffi-napi");
console.log('dll test start');

const function_ptr_1 = ffi.Function("void",[]);
const library_file = "dll/Dll1.dll";


// DLL側を呼び出すfunctionの定義
const dll = ffi.Library(library_file, {
  // register_callback: ["string", ["string", function_ptr_1]],
  test_print: ["string", ["string", function_ptr_1]],
});

// DLLを実行

dll.test_print("test print!!", function() {});

// dll.register_callback("TEST", function(callbackVal) {
//   console.log('DLL側のregister_callbackの実行');
//   console.log("callbackVal=", callbackVal);
// });



// retはregister_callback自体の戻り値
console.log('retはregister_callback自体の戻り値');
// console.log(ret());