
// ----------------------------------------------------------------
// Content Class

class Content {
  static get TYPE_NAME_KEY() {
    return 0;
  }
  
  static get CONTENT() {
    return 'content';
  }
  
  static get ITEM() {
    return 'content-item';
  }
  
  static get ITEM_HEADER() {
    return 'content-item-header';
  }
  
  static get ITEM_NAME() {
    return 'content-item-name';
  }
  
  static get ITEM_KEYS() {
    return 'content-item-keys';
  }
  
  static get ITEM_KEY() {
    return 'content-item-key';
  }
  
  static createContentItem(
    _type = Content.TYPE_NAME_KEY,
    _header = null,
    _name = null,
    ..._key = []
  ) {
    let result = '';
    
    return result;
  }
}
