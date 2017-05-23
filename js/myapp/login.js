
// ----------------------------------------------------------------
// Login Class

class LoginModel extends SwitchModel {
  constructor({
    name,
    lsKeyView,
    triggerSelector,
    switchSelector
  } = {}) {
    super({
      name: name,
      lsKeyView: lsKeyView,
      triggerSelector: triggerSelector,
      switchSelector: switchSelector
    });
    
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
      switchSelector: '#login-area'
    });
  }
  
}
