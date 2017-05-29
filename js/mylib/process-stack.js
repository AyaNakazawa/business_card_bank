
// 初期化
// 監視を開始
// 新しい処理が登録されると、カウントアップ
// 処理が終われば、カレントのCOMPLETEをTrueにする
// 定期的にカレントの処理が終わってるか確認する
// カレントのCOMPLETEがTrueならカレントアップと同時に、次の処理を実行

// 登録する処理の第１引数は、コールバック関数が自動で入る
// 必ず登録する処理の最後に、第１引数のコールバック関数を実行すること

class ProcessStack {
  constructor() {
    this.NAME = 'ProcessStack';
    this.REPEAT_MS_INIT = 100;
    this.REPEAT_MS_DIFF = 1.5;
    this.REPEAT_MS_MIN = 1000 / 60;
    this.REPEAT_MS_MAX = 5000;
    
    this.count = 0;
    this.current = 0;
    this.stack = [];
    
    this.initializeSpeed();
    
    Log.log();
    Log.log(this.NAME, Log.ALIGN_CENTER);
    
    // 初期化
    this.push();
    this.stack[this.current].COMPLETE = true;
    
    // 監視を開始
    Log.logClass(this.NAME, 'Monitoring');
    this.check();
  }
  
  // カレントの監視
  check() {
    setTimeout(() => {
      // Log.logClass(this.NAME, 'Check');
      // カレントの存在確認
      if (this.stack[this.current] != null) {
        // Log.logClass(this.NAME, 'Current is exists');
        // Log.logClassKey(this.NAME, 'this.repeatMs', this.repeatMs);
        // カレントが存在する
        // カレントの終了確認
        if (this.stack[this.current].COMPLETE) {
          // Log.logClassKey(this.NAME, this.stack[this.current].NAME, `ID:${this.current} / Check Complete`);
          // カレントが終了している
          // 次の処理が登録されているか確認
          if (this.stack[this.current + 1] != null) {
            // 処理速度を早くする
            this.changeSpeed(true);
            // カレントアップ
            this.current ++;
            // 次の処理を実行する
            // Log.logClassKey(this.NAME, this.stack[this.current].NAME, `ID:${this.current} / Run`);
            this.stack[this.current].FUNCTION(() => {
              // 次の処理の第１引数に処理終了のコールバック関数を入れる
              // Log.logClassKey(this.NAME, this.stack[this.current].NAME, `ID:${this.current} / Complete`);
              this.stack[this.current].COMPLETE = true;
            });
          } else {
            // Log.logClass(this.NAME, 'Next is not exists');
            // 処理速度を遅くする
            this.changeSpeed(false);
          }
        } else {
          // 処理速度を遅くする
          this.changeSpeed(false);
        }
      }
      // カレントの監視を再実行
      this.check();
    }, this.repeatMs);
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
    
    this.initializeSpeed();
    
    if (this.count == 0) {
      Log.logClass(this.NAME, 'Initialize');
    } else {
      Log.logClassKey(this.NAME, this.stack[this.count].NAME, `ID:${this.count} / Set`);
    }
    
    // カウントアップ
    this.count ++;
  }
  
  initializeSpeed() {
    this.repeatMs = this.REPEAT_MS_INIT;
  }
  
  changeSpeed(_type) {
    if (_type) {
      if (this.repeatMs > this.REPEAT_MS_MIN) {
        this.repeatMs /= this.REPEAT_MS_DIFF;
        if (this.repeatMs < this.REPEAT_MS_MIN) {
          this.repeatMs = this.REPEAT_MS_MIN;
        }
      }
    } else {
      if (this.repeatMs < this.REPEAT_MS_MAX) {
        this.repeatMs *= this.REPEAT_MS_DIFF;
        if (this.repeatMs > this.REPEAT_MS_MAX) {
          this.repeatMs = this.REPEAT_MS_MAX;
        }
      }
    }
  }
}
