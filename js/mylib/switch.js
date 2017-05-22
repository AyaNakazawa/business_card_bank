
// ----------------------------------------------------------------
// Switch Class

class SwitchModel extends CommonModel {
  constructor({
    name = 'Switch',
    view = null,
    lsKeyView = null,
    triggerSelector = 'none',
    switchSelector = 'none',
    toggleTimeMs = 500
  } = {})
  {
    super({
      name: name
    });
    
    this.initView = true;
    
    if (lsKeyView != null) {
      lsKeyView = `View.${lsKeyView}`;
    }
    
    this.NAME = name;
    this.view = view;
    this.LS_KEY_VIEW = lsKeyView;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SWITCH_SELECTOR = switchSelector;
    this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
    this.TOGGLE_TIME_MS = toggleTimeMs;
  }
}

class SwitchView extends CommonView {
  constructor(_model = new SwitchModel()) {
    super(_model);
    
    // Init SwitchView
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.setCurrentView();
    this.setView(this.model.view, 0);
    this.setOn();
  }
  
  setOn() {
    $(document).on('click', this.model.TRIGGER_SELECTOR, () => {this.switchView()});
  }
  
  setCurrentView() {
    if (this.model.view == null) {
      if (this.model.LS_KEY_VIEW == null) {
        this.model.view = this.model.initView;
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
    Log.logClass('Switch', `${this.model.NAME} View`);
    
    this.setCurrentView();
    this.setView(!this.model.view);
  }
  
  setView(_view, _speed = this.model.TOGGLE_TIME_MS) {
    Log.logClassKey('View', this.model.NAME, _view, Log.ARROW_INPUT);
    
    if (_view) {
      this.model.$TRIGGER_SELECTOR.addClass(this.model.CURRENT);
      this.model.$SWITCH_SELECTOR.show(_speed);
    } else {
      this.model.$TRIGGER_SELECTOR.removeClass(this.model.CURRENT);
      this.model.$SWITCH_SELECTOR.hide(_speed);
    }
    
    // save
    LocalStorage.setItem(this.model.LS_KEY_VIEW, _view);
    this.model.view = _view;
  }
}

// ----------------------------------------------------------------
// Controllers

class SwitchController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Switch Controller'
    });
    
    this.model = new SwitchModel(_obj);
    this.view = new SwitchView(this.model);
  }
}
