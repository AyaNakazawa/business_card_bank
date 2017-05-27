
Date.prototype.getString = (_format = '%Y/%m/%d %H:%M:%S') => {
  return DatePlus.getDateString(this.date, _format);
}

String.prototype.capitalize = () => {
  return this.substring(0, 1).toUpperCase() + this.substring(1);
}
