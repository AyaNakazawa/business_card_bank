
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
    
    this.ID_LENGTH_MAX = 31;
    this.ID_LENGTH_MIN = 3;
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
    SetEvent.setOn(
      'keypress',
      this.CONTROLLER.model.LOGIN_ID_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.model.LOGIN_PASSWORD_SELECTOR).focus();
        }
      }
    );
    SetEvent.setOn(
      'keypress',
      this.CONTROLLER.model.LOGIN_PASSWORD_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.model.LOGIN_SELECTOR).trigger(this.CONTROLLER.model.LOGIN_TRIGGER);
        }
      }
    );
  }
  
  generateLoginArea(_loginAlert = 'success', _loginFailedMessage = null) {
    let template = null;
    if (this.LOGIN) {
      // ログインしているとき
      Log.logClass(this.NAME, 'Logined');
      template = this.CONTROLLER.model.$TEMPLATE_LOGINED_SELECTOR.text();
      $(`${this.CONTROLLER.model.TRIGGER_SELECTOR} a`).text('Logout');
      
    } else {
      // ログインしていないとき
      Log.logClass(this.NAME, 'Not login');
      template = this.CONTROLLER.model.$TEMPLATE_NOT_LOGIN_SELECTOR.text();
      $(`${this.CONTROLLER.model.TRIGGER_SELECTOR} a`).text('Login');
      
    }
    const compiled = _.template(template);
    const model = {
      id: this.ID,
      password: this.PASSWORD
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
    
    $(this.CONTROLLER.model.LOGIN_ID_SELECTOR).focus();
    
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
    Log.logClassKey(this.NAME, 'submit', 'Login');
    this.ID = $(this.CONTROLLER.model.LOGIN_ID_SELECTOR).val();
    this.PASSWORD = $(this.CONTROLLER.model.LOGIN_PASSWORD_SELECTOR).val();
    this.PASSWORD_HASH = SHA256.getHash(this.PASSWORD);
    
    if (this.ID.length == 0) {
      this.generateLoginArea('danger', 'ID を入力してください。');
      return;
    } else if (this.ID.length < this.CONTROLLER.model.ID_LENGTH_MIN) {
      this.generateLoginArea('danger', `ID は ${this.CONTROLLER.model.ID_LENGTH_MIN} 文字以上で入力してください。`);
      return;
    } else if (this.ID.length > this.CONTROLLER.model.ID_LENGTH_MAX) {
      this.generateLoginArea('danger', `ID は ${this.CONTROLLER.model.ID_LENGTH_MAX} 文字以下で入力してください。`);
      return;
    } else if (this.PASSWORD.length == 0) {
      this.generateLoginArea('danger', 'パスワード を入力してください。');
      return;
    }
    
    this.generateLoading();
    
    $.ajax({
      url: 'ruby/loginUser.rb',
      data: {
        id: this.ID,
        password: this.PASSWORD_HASH
      },
      success: (_data) => {
        Log.logClass(this.NAME, 'loginUser ajax success');
        if (_data.length > 0) {
          this.ID = _data;
          this.LOGIN = true;
          this.generateLoginArea('success', `ユーザー ${this.ID} でログインしました。`);
        } else {
          this.generateLoginArea('danger', 'IDとパスワードの組み合わせが正しくありません。');
        }
      },
      error: () => {
        Log.logClass(this.NAME, 'loginUser ajax failed');
        this.generateLoginArea('danger', 'ajax通信に失敗しました。');
      }
    });
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'submit', 'Logout');
    this.LOGIN = false;
    this.ID = null;
    this.PASSWORD = null;
    this.generateLoginArea('success', 'ログアウトしました。');
  }
}
