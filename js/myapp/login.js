
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
  
  generateLoginArea(_loginAlert = 'success', _loginFailedMessage = null) {
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
    if (_loginFailedMessage != null) {
      const alertTemplate = this.CONTROLLER.model.$ALERT_TEMPLATE.text();
      const alertCompiled = _.template(alertTemplate);
      const alertModel = {
        type: _loginAlert,
        message: _loginFailedMessage
      };
      this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.append(alertCompiled(alertModel));
    }
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.append(compiled(model));
    
    BCBProcess.initPopover();
  }
  
  generateLoading() {
    const template = this.CONTROLLER.model.$LOADING_TEMPLATE.text();
    const compiled = _.template(template);
    const model = {
      header: `${this.ID} でログイン`,
      message: 'ログイン中...'
    };
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.empty();
    this.CONTROLLER.model.$LOGIN_AREA_SELECTOR.html(compiled(model));
  }
  
  submitLogin() {
    Log.logClassKey(this.NAME, 'Login', 'submit');
    this.ID = $(this.CONTROLLER.model.LOGIN_ID_SELECTOR).val();
    this.PASSWORD = $(this.CONTROLLER.model.LOGIN_PASSWORD_SELECTOR).val();
    
    this.generateLoading();
    
    $.ajax({
      url: 'ruby/getSQLiteResult.rb',
      data: {
        query: `SELECT name FROM User where name = '${this.ID}' and password = '${this.PASSWORD}';`
      },
      dataType: 'json',
      success: (_data) => {
        if (Object.keys(_data).length > 0) {
          this.ID = Object.keys(_data)[0];
          this.LOGIN = true;
          this.generateLoginArea('success', `ユーザー ${this.ID} でログインしました。`);
        } else {
          this.generateLoginArea('danger', 'IDとパスワードの組み合わせが正しくありません。');
        }
      },
      error: () => {
        this.generateLoginArea('danger', 'ajax通信に失敗しました。');
      }
    });
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'Logout', 'submit');
    this.LOGIN = false;
    this.generateLoginArea('success', 'ログアウトしました。');
    this.ID = null;
  }
}
