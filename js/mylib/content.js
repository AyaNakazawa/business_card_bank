
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
  
  static get HEADER() {
    return 'content-header';
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
  
  static getContent(_id = null) {
    if (_id != null) {
      return `<div class="${Content.CONTENT}" id="${_id}"></div>`
    }
    return '';
  }
  
  static getHeader(_header = null) {
    if (_header != null) {
      return `<div class="${Content.HEADER}">${_header}</div>`
    }
    return '';
  }
  
  static getItemName(_name = null) {
    if (_name != null) {
      return `<div class="${Content.ITEM_NAME}">${_name}</div>`
    }
    return '';
  }
  
  static getItemKey(..._keys) {
    let result = '';
    if (_keys.length > 0 && (_keys.length == 1 && _keys[0] != null)) {
      result += `<div class="${Content.ITEM_KEYS}">`
      for (let i = 0; i < _keys.length; i++) {
        // content-key の作成
        result += `<div class="${Content.ITEM_KEY}">${_keys[i]}</div>`
      }
      result += `</div>`
    }
    return result;
  }
  
  static getItem({
    type = Content.TYPE_NAME_KEY,
    contentId = null,
    header = null,
    name = null,
    keys = null
  } = {}) {
    let result = '';
    
    if (contentId != null) {
      result += `<div class="${Content.CONTENT}" id="${contentId}">`
    }
    if (type == Content.TYPE_NAME_KEY) {
      // content-header の作成
      result += Content.getHeader(header);
      
      // content-item の作成
      result += `<div class="${Content.ITEM}">`
      
      // content-name の作成
      result += Content.getItemName(name);
      
      // content-keys の作成
      result += Content.getItemKey(keys);
      
      result += `</div>`
    }
    if (contentId != null) {
      result += `</div>`
    }
    return result;
  }
}
