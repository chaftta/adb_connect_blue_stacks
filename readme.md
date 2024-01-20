# 概要

adbとBlueStacksを接続するツール

## ツールの機能説明

BlueStacksのエミュレータをADB使用できるようにしても、起動する毎に以下の様に接続する必要がありますが、ポートが毎回変わる為にエミュレータの設定を確認する必要があります。
それだと色々面倒くさいので固定コマンドで接続できるようにする為のツールです。
```
adb connect localhost:port
```

## 環境

下記ソフトのパスが通っている事
- node.js
- android sdk

## 使い方
```
node adb_connect_blue_stacks.js path/to/bluestacks.conf
```