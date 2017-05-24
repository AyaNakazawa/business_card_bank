
// ----------------------------------------------------------------
// User Class

class UserModel extends SwitchModel {
  constructor({
    name,
    lsKeyView,
    triggerSelector,
    switchSelector,
    userIdSelector = null,
    userPasswordSelector = null,
    loginTrigger = 'click',
    loginSelector = null,
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
    
    this.USER_ID_SELECTOR = userIdSelector;
    this.USER_PASSWORD_SELECTOR = userPasswordSelector;
    // this.LOGIN_CHECK_SELECTOR = '#login-check';
    
    this.USER_AREA_SELECTOR = '#user-area';
    this.$USER_AREA_SELECTOR = $(this.USER_AREA_SELECTOR);
    this.TEMPLATE_LOGINED_SELECTOR = '#logined-template';
    this.$TEMPLATE_LOGINED_SELECTOR = $(this.TEMPLATE_LOGINED_SELECTOR);
    this.TEMPLATE_NOT_LOGIN_SELECTOR = '#not-login-template';
    this.$TEMPLATE_NOT_LOGIN_SELECTOR = $(this.TEMPLATE_NOT_LOGIN_SELECTOR);
    
    this.ID_LENGTH_MAX = 31;
    this.ID_LENGTH_MIN = 3;
  }
}

class UserView extends SwitchView {
  constructor(_model = new UserModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new UserModel(_obj);
    this.view = new UserView(this.model);
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor({
    name = 'User Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new UserController({
      name: 'User Switch',
      lsKeyView: 'user',
      triggerSelector: '#action-user',
      switchSelector: '#user-area',
      userIdSelector: '#user-id',
      userPasswordSelector: '#user-password',
      loginSelector: '#login-submit',
      logoutSelector: '#logined-logout'
    });
    
    this.LOGIN = false;
    this.ID = null;
    
    this.setOn();
    this.generateUserArea();
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
      this.CONTROLLER.model.USER_ID_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.model.USER_PASSWORD_SELECTOR).focus();
        }
      }
    );
    SetEvent.setOn(
      'keypress',
      this.CONTROLLER.model.USER_PASSWORD_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.model.LOGIN_SELECTOR).trigger(this.CONTROLLER.model.LOGIN_TRIGGER);
        }
      }
    );
  }
  
  generateUserArea(_loginAlert = 'success', _loginFailedMessage = null) {
    let template = null;
    if (this.LOGIN) {
      // ログインしているとき
      Log.logClass(this.NAME, 'Usered');
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
    
    this.CONTROLLER.model.$USER_AREA_SELECTOR.empty();
    if (_loginFailedMessage != null) {
      const alertTemplate = this.CONTROLLER.model.$ALERT_TEMPLATE.text();
      const alertCompiled = _.template(alertTemplate);
      const alertModel = {
        type: _loginAlert,
        message: _loginFailedMessage
      };
      this.CONTROLLER.model.$USER_AREA_SELECTOR.append(alertCompiled(alertModel));
    }
    this.CONTROLLER.model.$USER_AREA_SELECTOR.append(compiled(model));
    
    $(this.CONTROLLER.model.USER_ID_SELECTOR).focus();
    
    BCBProcess.initPopover();
  }
  
  generateLoading() {
    const template = this.CONTROLLER.model.$LOADING_TEMPLATE.text();
    const compiled = _.template(template);
    const model = {
      header: `${this.ID} でログイン`,
      message: 'ログイン中...'
    };
    this.CONTROLLER.model.$USER_AREA_SELECTOR.empty();
    this.CONTROLLER.model.$USER_AREA_SELECTOR.html(compiled(model));
  }
  
  checkValidate() {
    if (this.ID.length == 0) {
      this.generateUserArea('danger', 'ID を入力してください。');
      return false;
    } else if (this.ID.length < this.CONTROLLER.model.ID_LENGTH_MIN) {
      this.generateUserArea('danger', `ID は ${this.CONTROLLER.model.ID_LENGTH_MIN} 文字以上で入力してください。`);
      return false;
    } else if (this.ID.length > this.CONTROLLER.model.ID_LENGTH_MAX) {
      this.generateUserArea('danger', `ID は ${this.CONTROLLER.model.ID_LENGTH_MAX} 文字以下で入力してください。`);
      return false;
    } else if (this.PASSWORD.length == 0) {
      this.generateUserArea('danger', 'パスワード を入力してください。');
      return false;
    }
    return true;
  }
  
  submitLogin() {
    Log.logClassKey(this.NAME, 'submit', 'Login');
    this.ID = $(this.CONTROLLER.model.USER_ID_SELECTOR).val();
    this.PASSWORD = $(this.CONTROLLER.model.USER_PASSWORD_SELECTOR).val();
    this.PASSWORD_HASH = SHA256.getHash(this.PASSWORD);
    
    if (!this.checkValidate()) {
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
          this.generateUserArea('success', `ユーザー ${this.ID} でログインしました。`);
        } else {
          this.generateUserArea('danger', 'IDとパスワードの組み合わせが正しくありません。');
        }
      },
      error: () => {
        Log.logClass(this.NAME, 'loginUser ajax failed');
        this.generateUserArea('danger', 'ajax通信に失敗しました。');
      }
    });
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'submit', 'Logout');
    this.LOGIN = false;
    this.ID = null;
    this.PASSWORD = null;
    this.generateUserArea('success', 'ログアウトしました。');
  }
  
  submitSignUp() {
    
  }
}
