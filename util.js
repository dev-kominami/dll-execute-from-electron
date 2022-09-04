
class Utils {
  libraryFilePath () {
    console.log('platform:', process.platform);
    switch (process.platform) {
      case 'win32':
        return "./dll/Dll1.dll";
      case 'darwin':
        return "./dylib/demo.dylib";
      default:
        throw new Error('platform defined');
    }
  }
}

module.exports = Utils