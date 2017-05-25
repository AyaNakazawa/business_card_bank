
// ----------------------------------------------------------------
// Classes

class CommonClass {
  constructor() {
    // Each Setting
    this.NAME = 'Common Class';
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
      // Check this.model
      if (this.model != null){
        // Exists this.model
        // Check this.model name
        if (this.model.NAME != null) {
          // Exists this.model name
          // Write this.model name
          Log.log(this.model.NAME, Log.ALIGN_CENTER);
          return;
        }
      }
      // Not exists this.model name
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
      // Check this.model
      if (this.model != null){
        // Exists this.model
        // Write this.model
        Log.logObj(this.model);
      } else {
        // Not exists this.model
        // Write this
        Log.logObj(this);
      }
    }
  }
}

// ----------------------------------------------------------------
// Common Class

class CommonModel extends CommonClass {
  constructor({
    name = null,
    echoPermission = false
  } = {})
  {
    super();
    
    this.NAME = name;
    
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    this.ACTIVE = 'active';
    this.BODY = 'body';
    this.$BODY = $(this.BODY);
    this.LOADING_TEMPLATE = '#loading-template';
    this.$LOADING_TEMPLATE = $(this.LOADING_TEMPLATE);
    this.ALERT_TEMPLATE = '#alert-template';
    this.$ALERT_TEMPLATE = $(this.ALERT_TEMPLATE);
    
    if (name != null && echoPermission) {
      super.viewNameModel(name);
    }
  }
  
  // Add var to Instance
  setKey(_var = 'var', _key = 'VALUE') {
    eval(`this.${_var} = ${_key}`);
  }
  
  // Get var from Instance
  getKey(_var = 'var') {
    return eval(`this.${_var}`);
  }
  
  // Remove var from Instance
  removeKey(_var = 'var') {
    eval(`this.${_var} = undefined`);
  }
}

class CommonView extends CommonClass {
  constructor(_model = new CommonModel()) {
    super();
    this.model = _model;
  }
  
  generateLoading(_$selector = null, _header = null, _message = null) {
    if (_$selector == null) {
      Log.logCaution(this.NAME, 'generateLoading', 'Undefined selector');
      return;
    }
    const template = this.model.$LOADING_TEMPLATE.text();
    const compiled = _.template(template);
    const model = {
      header: _header,
      message: _message
    };
    _$selector.empty();
    _$selector.html(compiled(model));
  }
  
  generateAlert(_$selector = null, _alert = null, _message = null) {
    if (_$selector == null) {
      Log.logCaution(this.NAME, 'generateAlert', 'Undefined selector');
      return;
    }
    if (_message != null) {
      const alertTemplate = this.model.$ALERT_TEMPLATE.text();
      const alertCompiled = _.template(alertTemplate);
      const alertModel = {
        type: _alert,
        message: _message
      };
      _$selector.append(alertCompiled(alertModel));
    }
  }
}

// ----------------------------------------------------------------
// Controllers

class CommonController extends CommonClass {
  constructor({
    name = null,
    viewName = false
  } = {})
  {
    super();
    
    this.NAME = name;
    if (name != null && viewName) {
      super.viewNameModel(name);
    }
  }
}

// ----------------------------------------------------------------
// Events

class CommonEvent extends CommonClass {
  constructor({
    name = null,
    viewName = true
  } = {})
  {
    super();
    
    if (name != null && viewName) {
      this.NAME = name;
      super.viewNameModel(name);
    }
  }
}

// ----------------------------------------------------------------
// Process

class CommonProcess extends CommonClass {
  constructor({
    name = null,
    viewName = true
  } = {})
  {
    super();
    
    if (name != null && viewName) {
      this.NAME = name;
      super.viewNameModel(name);
    }
  }
}
