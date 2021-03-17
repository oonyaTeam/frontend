### views
|ファイル名|役割|
| --- | --- |
|AllWord|語彙の一覧ページ|
|Home|月ごとの表示ページ|
ほかはまんまなんで省略

### components
|ファイル名|役割|
| --- | --- |
|Graph|グラフを含むHome画面の上のブロック|
|Header|ヘッダーのコンポーネント|
|MainBlock|Home画面の上のブロック|
|WordItem|言葉のそれぞれのアイテム|
|WordList|Home画面の下のブロックでWordItemをラップ|


### Capacitorをつかってコマンドラインでapk作成
```ionic capacitor copy android && cd android && ./gradlew assembleDebug && ./gradlew installDebug```
apkは```android/app/build/outputs/apk/debug/app-debug.apk```
