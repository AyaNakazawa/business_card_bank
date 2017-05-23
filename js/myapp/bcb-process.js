
class BCBProcess extends CommonProcess {
  constructor() {
    super({
      name: `${Project.NAME} Process`
    });
    
    BCBProcess.initProcess();
  }
  
  static initProcess() {
    BCBProcess.initPopover();
    BCBProcess.initEvent();
    BCBProcess.initController();
  }
  
  static initPopover() {
    {
      new PopoverController({
        name: 'ID Popover',
        selector: '#login-id-help',
        help: 'ID を入力してください。'
      });
      new PopoverController({
        name: 'Password Popover',
        selector: '#login-password-help',
        help: 'パスワード を入力してください。'
      });
      new PopoverController({
        name: 'Login Check Popover',
        selector: '#login-check-help',
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
    new LoginEvent();
  }
  static initController() {
    new SwitchController({
      name: 'Desc Switch',
      lsKeyView: 'desc',
      triggerSelector: '#action-desc',
      switchSelector: '#desc-area'
    });
  }
}
