
Date.prototype.getString = (_format = '%Y/%m/%d %H:%M:%S') => {
  return DatePlus.getDateString(this.date, _format);
}
