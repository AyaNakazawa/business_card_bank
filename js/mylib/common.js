
// ----------------------------------------------------------------
// Common Class

class CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Class',
      VIEW_NAME: false
    }
  ) {
    Object.assign(this, _common, _initSetting);
    
    if (this.NAME != null && this.VIEW_NAME) {
      this.viewNameModel(this.NAME);
    }
  }
  
  viewName(_name) {
    // Draw line
    Log.log();
    // Check name
    if (_name != null) {
      // Exists name
      // Write name
      Log.log(_name, Log.ALIGN_CENTER);
      return;
    } else {
      // Not exists name
      // Write this name
      Log.log(this.NAME, Log.ALIGN_CENTER);
    }
  }
  
  viewNameModel(_name, _model) {
    // Write name
    this.viewName(_name);
    
    // Check model
    if (_model != null) {
      // Exists model
      // Write model
      Log.logObj(_model);
    } else {
      // Not exists model
      // Write this
      Log.logObj(this);
    }
  }
}

// ----------------------------------------------------------------
// Model

class CommonModel extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Object',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
    
    this.ACTIVE = 'active';
    this.HOVER = 'hover';
    
    this.ALERT_SUCCESS = 'success';
    this.ALERT_INFO = 'info';
    this.ALERT_WARNING = 'warning';
    this.ALERT_DANGER = 'danger';
    
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    
    this.BODY = 'html, body';
    this.TEMPLATE_LOADING = '#loading-template';
    this.TEMPLATE_ALERT = '#alert-template';
    this.TEMPLATE_RUBY = '#ruby-template';
  }
  
  // Add var to Instance
  setKey(_key = 'KEY', _val = 'VALUE') {
    this[_key] = _val;
  }
  
  // Get var from Instance
  getKey(_key = 'KEY') {
    return this[_key];
  }
  
  // Remove var from Instance
  removeKey(_key = 'KEY') {
    this[_key] = undefined;
  }
}

class CommonView extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common View',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }
  
  getTemplate(
    _template = null,
    _model = null
  ) {
    if (_template == null) {
      return null;
    }
    const template = $(_template).text();
    const compiled = _.template(template);
    return compiled(_model);
  }
  
  generateLoading(
    _selector = null,
    _header = null,
    _message = null
  ) {
    if (_selector == null) {
      Log.logCaution(this.NAME, 'generateLoading', 'Undefined selector');
      return;
    }
    $(_selector).empty();
    $(_selector).append(this.getTemplate(
      $(this.MODEL.TEMPLATE_LOADING),
      {
        header: _header,
        message: _message
      }
    ));
  }
  
  generateAlert(
    _selector = null,
    _type = 'success',
    _message = null,
    _close = true
  ) {
    if (_selector == null) {
      Log.logCaution(this.NAME, 'generateAlert', 'Undefined selector');
      return;
    }
    if (_message != null) {
      $(_selector).append(this.getTemplate(
        $(this.MODEL.TEMPLATE_ALERT),
        {
          type: _type,
          message: _message,
          close: _close
        }
      ));
    }
  }
}

// ----------------------------------------------------------------
// Event

class CommonEvent extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Event',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }
  
  setOn(
    _trigger = 'click',
    _selector = null,
    _func = () => {}
  ) {
    if (_selector != null) {
      $(document).on(_trigger, _selector, _func);
    } else {
      $(document).on(_trigger, _func);
    }
  }
  
  setOff(
    _trigger = 'click',
    _selector = null
  ) {
    if (_selector != null) {
      $(document).off(_trigger, _selector);
    } else {
      $(document).off(_trigger);
    }
  }
}

// ----------------------------------------------------------------
// Controller

class CommonController extends CommonClass {
  constructor(
    _model = {},
    _initSetting = {},
    _common = {
      NAME: 'Common Controller',
      VIEW_NAME: false,
      VIEW_OBJECT: true,
      MODEL: new CommonModel(),
      VIEW: new CommonView(),
      EVENT: new CommonEvent()
    }
  ) {
    super(_initSetting, _common);
    Object.assign(this.MODEL, _model);
    
    if (this.VIEW_OBJECT) {
      super.viewNameModel(this.MODEL.NAME);
    }
    
    this.applyObject();
  }
  
  applyObject() {
    this.CONTROLLER = this;
    
    this.VIEW.MODEL = this.MODEL;
    this.VIEW.VIEW = this.VIEW;
    this.VIEW.EVENT = this.EVENT;
    this.VIEW.CONTROLLER = this;
    
    this.EVENT.MODEL = this.MODEL;
    this.EVENT.VIEW = this.VIEW;
    this.EVENT.EVENT = this.EVENT;
    this.EVENT.CONTROLLER = this;
  }
}

// ----------------------------------------------------------------
// Process

class CommonProcess extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Process',
      VIEW_NAME: true
    }
  ) {
    super(_initSetting, _common);
  }
}
