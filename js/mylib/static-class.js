
// ----------------------------------------------------------------
// Static classes

class Log {
  // Common line setting
  static get LOG_LENGTH() { return 96; }
  static get LOG_CHARACTER() { return '-'; }
  
  // View permission
  static get LOG_VIEW() { return true; }
  static get LOG_VIEW_OBJECT() { return true; }
  static get LOG_VIEW_CLASS() { return true; }
  static get LOG_VIEW_CLASS_KEY() { return true; }
  static get LOG_VIEW_ERROR() { return true; }
  static get LOG_VIEW_CAUTION() { return true; }
  
  // Align definition
  static get ALIGN_LEFT() { return 0; }
  static get ALIGN_CENTER() { return 1; }
  static get ALIGN_RIGHT() { return 2; }
  
  // Arrow definition
  static get ARROW_OUTPUT() { return ' ---> '; }
  static get ARROW_INPUT() { return ' <--- '; }
  
  // Length definition
  static get CLASS_LENGTH() { return 24; }
  static get KEY_LENGTH() { return 24; }
  
  // Style definition
  static get STYLE_COLOR_RED() { return 'color:#f00;'; }
  static get STYLE_COLOR_GREEN() { return 'color:#0f0;'; }
  static get STYLE_COLOR_BLUE() { return 'color:#00f;'; }
  static get STYLE_COLOR_YELLOW() { return 'color:#ff0;'; }
  static get STYLE_COLOR_MAGENTA() { return 'color:#f0f;'; }
  static get STYLE_COLOR_CYAN() { return 'color:#0ff;'; }
  
  static get STYLE_CLASS() { return 'color:#222;'; }
  static get STYLE_KEY() { return 'color:#828;'; }
  static get STYLE_VALUE() { return 'color:#228;'; }
  
  static get STYLE_ERROR_LINE() { return 'color:#f00;'; }
  static get STYLE_ERROR_HEADER() { return 'color:#a00;'; }
  static get STYLE_ERROR_CONTENT() { return 'color:#111;'; }
  
  static get STYLE_CAUTION_LINE() { return 'color:#aa0;'; }
  static get STYLE_CAUTION_HEADER() { return 'color:#440;'; }
  static get STYLE_CAUTION_CONTENT() { return 'color:#111;'; }
  
  static logError(...array) {
    // View permission
    if (this.LOG_VIEW_ERROR) {
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
      // Write title
      this.log('ERROR', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);
      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_ERROR_CONTENT);
      }
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
    }
  }
  
  static logCaution(...array) {
    // View permission
    if (this.LOG_VIEW_CAUTION) {
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
      // Write title
      this.log('CAUTION', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);
      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_CAUTION_CONTENT);
      }
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
    }
  }
  
  static logObj(_obj) {
    // View permission
    if (this.LOG_VIEW_OBJECT) {
      // Write object
      console.log(_obj);
    }
  }
  
  static logClass(_class = 'Class', _value = 'value', _style1 = this.STYLE_CLASS, _style2 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write value
      result += _value;
      
      // Write result
      console.log(result, _style1, _style2);
    }
  }
  
  static logClassKey(_class = 'Class', _key = 'key', _value = 'value', _arrow = Log.ARROW_OUTPUT, _style1 = this.STYLE_CLASS, _style2 = this.STYLE_KEY, _style3 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS_KEY) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write key
      result += _key;
      // Set spacing
      const keyLength = _key.length;
      for (let i = 0; i < this.KEY_LENGTH - keyLength; i++) {
        result += ' ';
      }
      // Set style
      result += '%c';
      // Write arrow
      result += _arrow;
      // Set style
      result += '%c';
      // Write value
      result += _value;
      
      // Write result
      console.log(result, _style1, _style2, this.STYLE_RESET, _style3);
    }
  }
  
  static log(_string, _align = this.ALIGN_LEFT, _style = this.STYLE_RESET) {
    // View permission
    if (this.LOG_VIEW) {
      let result = '';
      
      // String is null
      if (_string == null) {
        // Draw line
        for (let i = 0; i < this.LOG_LENGTH; i++) {
          result += this.LOG_CHARACTER;
          
        }
        // String exists
      } else {
        // Align left
        if (_align == this.ALIGN_LEFT) {
          // Write string
          result = _string;
          
          // Align center
        } else if (_align == this.ALIGN_CENTER) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < (this.LOG_LENGTH / 2) - (strLength / 2); i++) {
            result += ' ';
          }
          // Write string
          result += _string;
          
          // Align right
        } else if (_align == this.ALIGN_RIGHT) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < this.LOG_LENGTH - strLength; i++) {
            result += ' ';
          }
          // Write string
          result += _string;
        }
      }
      
      // Set style
      // Write result
      console.log(`%c${result}`, _style);
    }
  }
}

class LocalStorage {
  // Check localStorage support
  static get SUPPORT() {
    let result = true;
    if (!localStorage) {
      result = false;
    }
    return result;
  }
  
  // Build key
  static buildKey(_key) {
      return `${Project.NAME_KEY}.${_key}`;
  }
  
  // All clear localStorage
  static clear() {
    // Check support
    if (this.SUPPORT) {
      Log.logClass('Local Storage', 'All Clear.');
      // Clear
      localStorage.clear();
    }
  }
  
  // getItem from localStorage
  static getItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      const _val = localStorage.getItem(_key);
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_OUTPUT);
      // Get
      return _val;
    }
  }
  
  // setItem from localStorage
  static setItem(_key = 'key', _val = 'value') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_INPUT);
      // Set
      localStorage.setItem(_key, _val);
    }
  }
  
  // removeItem from localStorage
  static removeItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, 'null', Log.ARROW_INPUT);
      // Remove
      localStorage.removeItem(_key);
    }
  }
}

class SHA256 {
  static getHash(_string = null) {
    if (_string != null) {
      let shaObject = new jsSHA("SHA-256", "TEXT", 1);
      shaObject.update(_string);
      return shaObject.getHash("HEX");
    }
    return null;
  }
}
