
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
    
    if (lsKey != null) {
      lsKey = `View.${lsKey}`;
    }
    
    this.NAME = name;
    this.view = view;
    this.LS_KEY_VIEW = lsKey;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SWITCH_SELECTOR = switchSelector;
    this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
    this.TOGGLE_TIME_MS = toggleTimeMs;
    
    this.compile(template);
  }
  
  compile(_template = null) {
    if (_template != null) {
      if (this.NAME != 'none') {
        this.NAME = `${_template.capitalize()} Switch`;
      }
      if (this.LS_KEY_VIEW != 'none') {
        this.LS_KEY_VIEW = `View.${_template}`;
      }
      if (this.TRIGGER_SELECTOR != 'none') {
        this.TRIGGER_SELECTOR = `#switch-${_template}`;
        this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
      }
      if (this.SWITCH_SELECTOR != 'none') {
        this.SWITCH_SELECTOR = `#${_template}-area`;
        this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
      }
    }
  }
}

class SwitchView extends CommonView {
  constructor(_model = new SwitchModel()) {
    super(_model);
  }
  
  setView(_view = null, _speed = this.model.TOGGLE_TIME_MS) {
    Log.logClassKey('View', this.model.NAME, _view, Log.ARROW_INPUT);
    
    if (_view != null) {
      if (_view) {
        this.model.$TRIGGER_SELECTOR.addClass(this.model.CURRENT);
        this.model.$SWITCH_SELECTOR.show(_speed);
      } else {
        this.model.$TRIGGER_SELECTOR.removeClass(this.model.CURRENT);
        this.model.$SWITCH_SELECTOR.hide(_speed);
      }
      
      // save
      if (this.model.LS_KEY_VIEW != null) {
        LocalStorage.setItem(this.model.LS_KEY_VIEW, _view);
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
    
    this.NAME = this.model.name;
    
    // Init SwitchView
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.setCurrentView();
    this.view.setView(this.model.view, 0);
  }
  
  setCurrentView() {
    if (this.model.view == null) {
      if (this.model.LS_KEY_VIEW == null) {
        this.model.view = this.model.INIT_VIEW;
      } else {
        const lsValView = LocalStorage.getItem(this.model.LS_KEY_VIEW);
        if (lsValView == null) {
          this.model.view = true;
        } else if (lsValView == 'true') {
          this.model.view = true;
        } else if (lsValView == 'false') {
          this.model.view = false;
        }
      }
    }
  }
  
  switchView() {
    Log.logClass('Switch', `${this.NAME} View`);
    
    this.setCurrentView();
    this.view.setView(!this.model.view);
  }
}

class SwitchEvent extends CommonEvent {
  constructor(_obj) {
    super(_obj);
    
    this.NAME = _obj.name;
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
