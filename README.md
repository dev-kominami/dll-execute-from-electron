# DLLをElectronアプリから実行するサンプルアプリ

## 実行環境

- windows11
- node varsion: v16.17.0
- Python 3.10.6 (ffi-napiインストール時のbuildに必要)

## 実行方法

ルートで `npm start` を実行する

## サンプルのdll定義関数

- test_print
  - 引数の文字を含めた文字を標準出力する
- register_callback
  - `hello`(文字列)をcallbackで受け取る
- test_add_int
  - 数字を1プラスする（dll内で＋１して返す）