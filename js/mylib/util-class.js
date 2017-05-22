
// ----------------------------------------------------------------
// Util Class

class DatePlus {
  constructor(_date = new Date()) {
    this.date = new Date(_date);
  }
  
  getString(_format = '%Y/%m/%d %H:%M:%S') {
    return DatePlus.getDateString(this.date, _format);
  }
  
  static getDateString(_date = new Date(), _format = '%Y/%m/%d %H:%M:%S') {
    // $1 _date: Dateオブジェクトからゼロ埋めした日付文字列を生成
    // $2 _format: '%Y/%m/%d %H:%M:%S'
    //  %Y: 年4桁
    //  %y: 年2桁
    //  %m: 月
    //  %d: 日
    //  %H: 時
    //  %M: 分
    //  %S: 秒
    _format = _format.replace('%Y', ("000" + _date.getFullYear()).slice(-4));
    _format = _format.replace('%y', ("0" + _date.getFullYear()).slice(-2));
    _format = _format.replace('%m', ("0" + (_date.getMonth() + 1)).slice(-2));
    _format = _format.replace('%d', ("0" + _date.getDate()).slice(-2));
    _format = _format.replace('%H', ("0" + _date.getHours()).slice(-2));
    _format = _format.replace('%M', ("0" + _date.getMinutes()).slice(-2));
    _format = _format.replace('%S', ("0" + _date.getSeconds()).slice(-2));
    return _format;
  }
}
