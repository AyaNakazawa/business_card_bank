
// ----------------------------------------------------------------
// Switch Class

// ----------------------------------------------------------------
// Model

class SwitchModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Common Switch',
      TEMPLATE: null,
      currentView: null,
      INIT_VIEW: true,
      LS_KEY: null,
      EVENT_TRIGGER: 'click',
      TRIGGER_SELECTOR: null,
      SWITCH_SELECTOR: null,
      TOGGLE_TIME_MS: 500
    }
  ) {
    super(_initSetting);
  }
  
  compile() {
    if (this.TEMPLATE != null) {
      if (this.NAME == 'Common Switch') {
        this.NAME = `${this.TEMPLATE.capitalize()} Switch`;
      }
      
      if (this.LS_KEY != null && this.LS_KEY != 'none') {
        this.LS_KEY = `View.${this.LS_KEY}`;
      }
      
      if (this.LS_KEY != 'none') {
        this.LS_KEY = `View.${this.TEMPLATE}`;
      } else {
        this.LS_KEY = null;
      }
      
      if (this.TRIGGER_SELECTOR != 'none') {
        this.TRIGGER_SELECTOR = `#switch-${this.TEMPLATE}`;
      }
      
      if (this.SWITCH_SELECTOR != 'none') {
        this.SWITCH_SELECTOR = `#${this.TEMPLATE}-area`;
      }
    }
  }
}

// ----------------------------------------------------------------
// View

class SwitchView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Switch View'
    }
  ) {
    super(_initSetting);
  }
  
  setView(_view = null, _speed = this.MODEL.TOGGLE_TIME_MS) {
    Log.logClassKey('View', this.MODEL.NAME, _view, Log.ARROW_INPUT);
    
    if (_view != null) {
      if (_view) {
        $(this.MODEL.TRIGGER_SELECTOR).addClass(this.MODEL.ACTIVE);
        $(this.MODEL.SWITCH_SELECTOR).show(_speed);
      } else {
        $(this.MODEL.TRIGGER_SELECTOR).removeClass(this.MODEL.ACTIVE);
        $(this.MODEL.SWITCH_SELECTOR).hide(_speed);
      }
      
      // save
      if (this.MODEL.LS_KEY != null) {
        LocalStorage.setItem(this.MODEL.LS_KEY, _view);
      }
      this.MODEL.currentView = _view;
    }
  }
}

// ----------------------------------------------------------------
// Event

class SwitchEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Switch Event'
    }
  ) {
    super(_initSetting);
  }
  
  setOnSwitch() {
    if (this.MODEL.TRIGGER_SELECTOR != null) {
      super.setOn(
        this.MODEL.EVENT_TRIGGER,
        this.MODEL.TRIGGER_SELECTOR,
        () => {
          this.CONTROLLER.switchView();
        }
      );
    }
  }
}

// ----------------------------------------------------------------
// Controller

class SwitchController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Switch Controller',
      MODEL: new SwitchModel(),
      VIEW: new SwitchView(),
      EVENT: new SwitchEvent(),
      VIEW_OBJECT: false
    }
  ) {
    super(_model, _initSetting);
    
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.MODEL.compile();
    this.setCurrentView();
    this.VIEW.setView(this.MODEL.currentView, 0);
    this.EVENT.setOnSwitch();
  }
  
  setCurrentView() {
    if (this.MODEL.currentView == null) {
      if (this.MODEL.LS_KEY == null) {
        this.MODEL.currentView = this.MODEL.INIT_VIEW;
      } else {
        const LS_VAL = LocalStorage.getItem(this.MODEL.LS_KEY);
        if (LS_VAL == null) {
          this.MODEL.currentView = true;
        } else if (LS_VAL == 'true') {
          this.MODEL.currentView = true;
        } else if (LS_VAL == 'false') {
          this.MODEL.currentView = false;
        }
      }
    }
  }
  
  switchView() {
    Log.logClass('Switch', `${this.MODEL.NAME}`);
    
    this.setCurrentView();
    this.VIEW.setView(!this.MODEL.currentView);
  }
}
