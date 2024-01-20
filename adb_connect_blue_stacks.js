const fs = require('fs');
const { exec } = require('child_process');

// blue stacksのADBに接続するスクリプト
// 使い方：node adb_connect_blue_stacks.js path/to/bluestacks.conf

/**
 * 指定されたファイルパスから設定を読み込む
 *
 * @param {string} filePath - 設定ファイルのパス
 * @return {string|null} - 設定ファイルから読み取ったポート番号、または見つからない場合はnull
 */
function readConfFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n');
  for (const line of lines) {
    if (line.startsWith("bst.instance.Pie64.status.adb_port")) {
      return line.split("=")[1].trim();
    }
  }
  return null;
}

/**
 * 指定されたポートでADBコマンドを実行する
 *
 * @param {string} port - ADBコマンドを実行するためのポート番号
 */
function runAdbCommand(port) {
  const command = `adb connect 127.0.0.1:${port}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error.message);
      return;
    }
    if (stderr) {
      console.error(stderr);
      return;
    }
    console.log(stdout);
  });
}

// メインの実行部
const filePath = process.argv[2];
if (!filePath) {
  console.error('Error: No file path provided.');
  process.exit(1);
}

if (fs.existsSync(filePath)) {
  const port = readConfFile(filePath);
  if (port) {
    runAdbCommand(port);
  } else {
    console.log("Could not find adb_port in the configuration file.");
  }
} else {
  console.log(`The specified file ${filePath} does not exist.`);
}
