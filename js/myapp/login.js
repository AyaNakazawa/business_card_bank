
// ----------------------------------------------------------------
// Login Class

class LoginModel extends SwitchModel {
  constructor({
    name,
    lsKeyView,
    triggerSelector,
    switchSelector,
    loginTrigger = 'click',
    loginSelector = null,
    loginIdSelector = null,
    loginPasswordSelector = null,
    logoutTrigger = 'click',
    logoutSelector = null
  } = {}) {
    super({
      name: name,
      lsKeyView: lsKeyView,
      triggerSelector: triggerSelector,
      switchSelector: switchSelector
    });
    
    this.NAME = name;
    this.LOGIN_TRIGGER = loginTrigger;
    this.LOGIN_SELECTOR = loginSelector;
    
    this.LOGOUT_TRIGGER = logoutTrigger;
    this.LOGOUT_SELECTOR = logoutSelector;
    
    this.LOGIN_ID_SELECTOR = loginIdSelector;
    this.LOGIN_PASSWORD_SELECTOR = loginPasswordSelector;
    // this.LOGIN_CHECK_SELECTOR = '#login-check';
    
    this.LOGIN_AREA_SELECTOR = '#login-area';
    this.$LOGIN_AREA_SELECTOR = $(this.LOGIN_AREA_SELECTOR);
    this.TEMPLATE_LOGINED_SELECTOR = '#logined-template';
    this.$TEMPLATE_LOGINED_SELECTOR = $(this.TEMPLATE_LOGINED_SELECTOR);
    this.TEMPLATE_NOT_LOGIN_SELECTOR = '#not-login-template';
    this.$TEMPLATE_NOT_LOGIN_SELECTOR = $(this.TEMPLATE_NOT_LOGIN_SELECTOR);
  }
}

class LoginView extends SwitchView {
  constructor(_model = new LoginModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controller

class LoginController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new LoginModel(_obj);
    this.view = new LoginView(this.model);
  }
}

// ----------------------------------------------------------------
// Event

class LoginEvent extends CommonEvent {
  constructor({
    name = 'Login Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new LoginController({
      name: 'Login Switch',
      lsKeyView: 'login',
      triggerSelector: '#action-login',
      switchSelector: '#login-area',
      loginSelector: '#login-submit',
      loginIdSelector: '#login-id',
      loginPasswordSelector: '#login-password',
      logoutSelector: '#logined-logout'
    });
    
    this.LOGIN = false;
    this.ID = null;
    
    this.setOn();
    this.generateLoginArea();
  }
  
  setOn() {
    SetEvent.setOn(
      this.CONTROLLER.model.LOGIN_TRIGGER,
      this.CONTROLLER.model.LOGIN_SELECTOR,
      () => {
        this.submitLogin();
      }
    );
    SetEvent.setOn(
      this.CONTROLLER.model.LOGOUT_TRIGGER,
      this.CONTROLLER.model.LOGOUT_SELECTOR,
      () => {
        this.submitLogout();
      }
    );
  }
  
  generateLoginArea() {
    let template = null;
    if (this.LOGIN) {
      // ログインしているとき
      Log.logClass(this.NAME, 'Logined');
      template = this.CONTROLLER.model.$TEMPLATE_LOGINED_SELECTOR.text();
      
    } else {
      // ログインしていないとき
      Log.logClass(this.NAME, 'Not login');
      template = this.CONTROLLER.model.$TEMPLATE_NOT_LOGIN_SELECTOR.text();
      
    }
    const compiled = _.template(template);
    const model = {
      id: this.ID
    };
    
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.empty();
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.html(compiled(model));
    
    BCBProcess.initPopover();
  }
  
  generateLoading() {
    const template = this.CONTROLLER.model.$LOADING_TEMPLATE.text();
    const compiled = _.template(template);
    const model = {
      header: this.ID,
      message: 'ログイン中...'
    };
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.empty();
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.html(compiled(model));
  }
  
  submitLogin() {
    Log.logClassKey(this.NAME, 'Login', 'submit');
    this.LOGIN = true;
    this.ID = $(this.CONTROLLER.model.LOGIN_ID_SELECTOR).val();
    this.generateLoading();
    this.generateLoginArea();
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'Logout', 'submit');
    this.LOGIN = false;
    this.generateLoginArea();
    this.ID = null;
  }
}
