
// ----------------------------------------------------------------
// Switch Class

class SwitchModel extends CommonModel {
  constructor({
    template = null,
    name = 'Common Switch',
    view = null,
    lsKey = null,
    triggerSelector = null,
    switchSelector = null,
    toggleTimeMs = 500
  } = {})
  {
    super({
      name: name
    });
    
    this.INIT_VIEW = true;
    
    if (lsKey != null && lsKey != 'none') {
      lsKey = `View.${lsKey}`;
    }
    
    this.TEMPLATE = template;
    this.NAME = name;
    this.view = view;
    this.LS_KEY = lsKey;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SWITCH_SELECTOR = switchSelector;
    this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
    this.TOGGLE_TIME_MS = toggleTimeMs;
    
    this.compile();
  }
  
  compile() {
    if (this.TEMPLATE != null) {
      if (this.NAME != 'none') {
        this.NAME = `${this.TEMPLATE.capitalize()} Switch`;
      }
      if (this.LS_KEY != 'none') {
        this.LS_KEY = `View.${this.TEMPLATE}`;
      } else {
        this.LS_KEY = null;
      }
      if (this.TRIGGER_SELECTOR != 'none') {
        this.TRIGGER_SELECTOR = `#switch-${this.TEMPLATE}`;
        this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
      }
      if (this.SWITCH_SELECTOR != 'none') {
        this.SWITCH_SELECTOR = `#${this.TEMPLATE}-area`;
        this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
      }
    }
  }
}

class SwitchView extends CommonView {
  constructor(_model = new SwitchModel()) {
    super(_model);
    
    if (this.model.TEMPLATE != null) {
      this.NAME = `${this.model.TEMPLATE.capitalize()} View`;
    } else {
      this.NAME = this.model.name;
    }
  }
  
  setView(_view = null, _speed = this.model.TOGGLE_TIME_MS) {
    Log.logClassKey('View', this.NAME, _view, Log.ARROW_INPUT);
    
    if (_view != null) {
      if (_view) {
        this.model.$TRIGGER_SELECTOR.addClass(this.model.CURRENT);
        this.model.$SWITCH_SELECTOR.show(_speed);
      } else {
        this.model.$TRIGGER_SELECTOR.removeClass(this.model.CURRENT);
        this.model.$SWITCH_SELECTOR.hide(_speed);
      }
      
      // save
      if (this.model.LS_KEY != null) {
        LocalStorage.setItem(this.model.LS_KEY, _view);
      }
      this.model.view = _view;
    }
  }
}

// ----------------------------------------------------------------
// Controllers

class SwitchController extends CommonController {
  constructor(_obj) {
    super({
      name: _obj.name
    });
    
    this.model = new SwitchModel(_obj);
    this.view = new SwitchView(this.model);
    
    if (_obj.template != null) {
      this.NAME = `${_obj.template.capitalize()} Controller`;
    } else {
      this.NAME = _obj.name;
    }
    
    // Init SwitchView
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.setCurrentView();
    this.view.setView(this.model.view, 0);
  }
  
  setCurrentView() {
    if (this.model.view == null) {
      if (this.model.LS_KEY == null) {
        this.model.view = this.model.INIT_VIEW;
      } else {
        const LS_VAL = LocalStorage.getItem(this.model.LS_KEY);
        if (LS_VAL == null) {
          this.model.view = true;
        } else if (LS_VAL == 'true') {
          this.model.view = true;
        } else if (LS_VAL == 'false') {
          this.model.view = false;
        }
      }
    }
  }
  
  switchView() {
    Log.logClass('Switch', `${this.NAME}`);
    
    this.setCurrentView();
    this.view.setView(!this.model.view);
  }
}

class SwitchEvent extends CommonEvent {
  constructor(_obj) {
    super(_obj);
    
    if (_obj.template != null) {
      this.NAME = `${_obj.template.capitalize()} Event`;
    } else {
      this.NAME = _obj.name;
    }
    this.CONTROLLER_SWITCH = new SwitchController(_obj);
    
    this.setOnSwitch();
  }
  
  setOnSwitch() {
    SetEvent.setOn(
      'click',
      this.CONTROLLER_SWITCH.model.TRIGGER_SELECTOR,
      () => {
        this.CONTROLLER_SWITCH.switchView();
      }
    );
  }
}
