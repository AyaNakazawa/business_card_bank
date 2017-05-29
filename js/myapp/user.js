
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'User Object',
      USER_ID_SELECTOR: '#user-id',
      USER_PASSWORD_SELECTOR: '#user-password',
      USER_CHECK_SELECTOR: '#user-check',
      LOGIN_SELECTOR: '#login-submit',
      LOGIN_TRIGGER: 'click',
      LOGOUT_SELECTOR: '#logout-submit',
      LOGOUT_TRIGGER: 'click',
      SIGNUP_SELECTOR: '#signup-submit',
      SIGNUP_TRIGGER: 'click'
    }
  ) {
    super(_initSetting);
    
    this.LOGIN = false;
    this.ID = null;
    this.PASSWORD = null;
    this.HASH = null;
    
    this.USER_AREA_SELECTOR = '#user-area';
    this.TEMPLATE_LOGINED_SELECTOR = '#logined-template';
    this.TEMPLATE_NOT_LOGIN_SELECTOR = '#not-login-template';
    
    this.ID_LENGTH_MAX = 31;
    this.ID_LENGTH_MIN = 3;
    
    this.SWITCH_LABEL_SELECTOR = '#switch-user';
  }
}

// ----------------------------------------------------------------
// View

class UserView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'User View'
    }
  ) {
    super(_initSetting);
  }
  
  generateUserArea(_alertType = 'success', _message = null, _close = true) {
    $(this.MODEL.USER_AREA_SELECTOR).empty();
    this.generateAlert($(this.MODEL.USER_AREA_SELECTOR), _alertType, _message, _close);
    
    let $template = null;
    if (this.MODEL.LOGIN) {
      // ログインしているとき
      Log.logClass(this.NAME, 'Logined');
      $template = $(this.MODEL.TEMPLATE_LOGINED_SELECTOR);
      $(`${this.MODEL.SWITCH_LABEL_SELECTOR} a`).text('Logout');
      
      PS.CONTROLLER.SWITCH.USER.VIEW.setView(false);
      PS.CONTROLLER.SWITCH.CARD.VIEW.setView(true);
      
    } else {
      // ログインしていないとき
      Log.logClass(this.NAME, 'Not login');
      $template = $(this.MODEL.TEMPLATE_NOT_LOGIN_SELECTOR);
      $(`${this.MODEL.SWITCH_LABEL_SELECTOR} a`).text('Login');
      
    }
    
    $(this.MODEL.USER_AREA_SELECTOR).append(this.getTemplate(
      $template,
      {
        id: this.MODEL.ID,
        password: this.MODEL.PASSWORD
      }
    ));
    
    $(this.MODEL.USER_ID_SELECTOR).focus();
    
    BCBProcess.initPopover();
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    super.setOn(
      this.CONTROLLER.MODEL.LOGIN_TRIGGER,
      this.CONTROLLER.MODEL.LOGIN_SELECTOR,
      () => {
        this.CONTROLLER.submitLogin();
      }
    );
    super.setOn(
      this.CONTROLLER.MODEL.LOGOUT_TRIGGER,
      this.CONTROLLER.MODEL.LOGOUT_SELECTOR,
      () => {
        this.CONTROLLER.submitLogout();
      }
    );
    super.setOn(
      this.CONTROLLER.MODEL.SIGNUP_TRIGGER,
      this.CONTROLLER.MODEL.SIGNUP_SELECTOR,
      () => {
        this.CONTROLLER.submitSignup();
      }
    );
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_ID_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.USER_PASSWORD_SELECTOR).focus();
        }
      }
    );
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_PASSWORD_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.LOGIN_SELECTOR).trigger(this.CONTROLLER.MODEL.LOGIN_TRIGGER);
        }
      }
    );
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'User Controller',
      MODEL: new UserModel(),
      VIEW: new UserView(),
      EVENT: new UserEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setEvent();
    this.VIEW.generateUserArea();
  }
    
  checkValidate() {
    this.MODEL.ID = $(this.MODEL.USER_ID_SELECTOR).val();
    this.MODEL.PASSWORD = $(this.MODEL.USER_PASSWORD_SELECTOR).val();
    if (this.MODEL.ID.length == 0) {
      this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, 'ID を入力してください。');
      return false;
    } else if (this.MODEL.ID.length < this.MODEL.ID_LENGTH_MIN) {
      this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, `ID は ${this.MODEL.ID_LENGTH_MIN} 文字以上で入力してください。`);
      return false;
    } else if (this.MODEL.ID.length > this.MODEL.ID_LENGTH_MAX) {
      this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, `ID は ${this.MODEL.ID_LENGTH_MAX} 文字以下で入力してください。`);
      return false;
    } else if (this.MODEL.PASSWORD.length == 0) {
      this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, 'パスワード を入力してください。');
      return false;
    }
    return true;
  }
  
  submitLogin() {
    Log.logClassKey(this.NAME, 'Submit', 'Login');
    
    if (this.checkValidate() == false) {
      return;
    }
    
    this.MODEL.HASH = SHA256.getHash(this.MODEL.PASSWORD);
    
    this.VIEW.generateLoading($(this.MODEL.USER_AREA_SELECTOR), 'ログイン中', `${this.MODEL.ID} でログイン`);
    
    $.ajax({
      url: 'ruby/loginUser.rb',
      data: {
        id: this.MODEL.ID,
        password: this.MODEL.HASH
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax loginUser', 'success');
        if (_data.length > 0) {
          this.MODEL.ID = _data;
          this.MODEL.LOGIN = true;
          PS.CONTROLLER.CARD.setUser(this.MODEL.ID, this.MODEL.HASH);
          this.VIEW.generateUserArea(this.MODEL.ALERT_SUCCESS, `ユーザー ${this.MODEL.ID} でログインしました。`);
        } else {
          this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, 'IDとパスワードの組み合わせが正しくありません。');
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax loginUser', 'failed');
        this.VIEW.generateUserArea(this.MODEL.ALERT_DANGER, 'ajax通信に失敗しました。', false);
      }
    });
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'Submit', 'Logout');
    this.MODEL.LOGIN = false;
    this.MODEL.ID = null;
    this.MODEL.PASSWORD = null;
    PS.CONTROLLER.CARD.setUser();
    this.VIEW.generateUserArea('success', 'ログアウトしました。');
  }
  
  submitSignup() {
    Log.logClassKey(this.NAME, 'Submit', 'Sign Up');
    
    if (this.checkValidate() == false) {
      return;
    }
    
    this.MODEL.HASH = SHA256.getHash(this.MODEL.PASSWORD);
    
    this.VIEW.generateLoading($(this.MODEL.USER_AREA_SELECTOR),'登録中',  `${this.MODEL.ID} でユーザー登録`);
    
    $.ajax({
      url: 'ruby/signupUser.rb',
      data: {
        id: this.MODEL.ID,
        password: this.MODEL.HASH
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax signupUser', 'success');
        if (_data.length > 0) {
          this.MODEL.ID = _data;
          this.MODEL.LOGIN = true;
          PS.CONTROLLER.CARD.setUser(this.MODEL.ID, this.MODEL.HASH);
          this.VIEW.generateUserArea(this.MODEL.ALERT_SUCCESS, `ユーザー ${this.MODEL.ID} を登録しました。`);
        } else {
          this.VIEW.generateUserArea(this.MODEL.ALERT_WARNING, `ユーザー ${this.MODEL.ID} は登録済みです`);
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax signupUser', 'failed');
        this.VIEW.generateUserArea(this.MODEL.ALERT_DANGER, 'ajax通信に失敗しました。', false);
      }
    });
  }
}
