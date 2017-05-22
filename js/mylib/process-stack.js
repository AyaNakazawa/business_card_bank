
// 初期化
// 監視を開始
// 新しい処理が登録されると、カウントアップ
// 処理が終われば、カレントのCOMPLETEをTrueにする
// 定期的にカレントの処理が終わってるか確認する
// カレントのCOMPLETEがTrueならカレントアップと同時に、次の処理を実行

// 登録する処理の第１引数は、コールバック関数が自動で入る
// 必ず登録する処理の最後に、第１引数のコールバック関数を実行すること

class ProcessStack {
  constructor(repeatMs = 100) {
    this.count = 0;
    this.current = 0;
    this.REPEAT_MS = repeatMs;
    this.stack = [];
    
    Log.log();
    Log.log('ProcessStack', Log.ALIGN_CENTER);
    
    // 初期化
    this.push();
    this.stack[this.current].COMPLETE = true;
    
    // 監視を開始
    Log.logClass('ProcessStack', 'Monitoring');
    this.check();
  }
  
  // カレントの監視
  check() {
    setTimeout(() => {
      // Log.logClass('ProcessStack', 'Check');
      // カレントの存在確認
      if (this.stack[this.current] != null) {
        // Log.logClass('ProcessStack', 'Current is exists');
        // カレントが存在する
        // カレントの終了確認
        if (this.stack[this.current].COMPLETE) {
          // Log.logClassKey('ProcessStack', this.stack[this.current].NAME, `ID:${this.current} / Check Complete`);
          // カレントが終了している
          // 次の処理が登録されているか確認
          if (this.stack[this.current + 1] != null) {
            // カレントアップ
            this.current ++;
            // 次の処理を実行する
            Log.logClassKey('ProcessStack', this.stack[this.current].NAME, `ID:${this.current} / Run`);
            this.stack[this.current].FUNCTION(() => {
              // 次の処理の第１引数に処理終了のコールバック関数を入れる
              Log.logClassKey('ProcessStack', this.stack[this.current].NAME, `ID:${this.current} / Complete`);
              this.stack[this.current].COMPLETE = true;
            });
          } else {
            // Log.logClass('ProcessStack', 'Next is not exists');
          }
        }
      }
      // カレントの監視を再実行
      this.check();
    }, this.REPEAT_MS);
  }
  
  // 新しい処理の登録
  push({
    name = `Stack ${this.count}`,
    func = (callback) => {callback();}
  } = {}) {
    
    this.stack[this.count] = {};
    this.stack[this.count].NAME = name;
    this.stack[this.count].FUNCTION = func;
    this.stack[this.count].COMPLETE = false;
    
    if (this.count == 0) {
      Log.logClass('ProcessStack', 'Initialize');
    } else {
      Log.logClassKey('ProcessStack', this.stack[this.count].NAME, `ID:${this.count} / Set`);
    }
    
    // カウントアップ
    this.count ++;
  }
}
