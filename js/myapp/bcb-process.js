
class BCBProcess extends CommonProcess {
  constructor() {
    super({
      name: `${Project.NAME} Process`
    });
    
    BCBProcess.initProcess();
  }
  
  static initProcess() {
    BCBProcess.createDesc();
    BCBProcess.initPopover();
    BCBProcess.initEvent();
    BCBProcess.initController();
    BCBProcess.show();
  }
  
  static createDesc() {
    $('#desc-area').append(Content.getHeader('テストデータ'));
    $('#desc-area').append(Content.getItem({
      name: 'test',
      keys: 'pass'
    }));
    $('#desc-area').append(Content.getItem({
      name: 'test2',
      keys: 'pass2'
    }));
    $('#desc-area').append(Content.getItem({
      name: 'aya',
      keys: 'P@ssw0rd'
    }));
  }
  
  static initPopover() {
    {
      new PopoverController({
        name: 'ID Popover',
        selector: '#user-id-help',
        help: 'ID を入力してください。'
      });
      new PopoverController({
        name: 'Password Popover',
        selector: '#user-password-help',
        help: 'パスワード を入力してください。'
      });
      new PopoverController({
        name: 'Login Check Popover',
        selector: '#user-check-help',
        help: '共有デバイスでは設定に注意してください。'
      });
      new PopoverController({
        name: 'Logined ID Popover',
        selector: '#logined-id-help',
        help: 'ログインしている ID です。'
      });
    }
  }
  
  static initEvent() {
    CE = new CardEvent();
    UE = new UserEvent();
  }
  
  static initController() {
    new SwitchController({
      name: 'Desc Switch',
      lsKeyView: 'desc',
      triggerSelector: '#action-desc',
      switchSelector: '#desc-area'
    });
  }
  
  static show() {
    $('body').show();
  }
}
