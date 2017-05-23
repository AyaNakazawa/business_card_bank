
class BCBProcess extends CommonProcess {
  constructor() {
    super({
      name: `${Project.NAME} Process`
    });
    
    this.initProcess();
  }
  
  initProcess() {
    this.initPopover();
  }
  
  initPopover() {
    {
      new PopoverController({
        name: 'ID Popover',
        selector: '#login-id-help',
        help: 'IDを入力してください'
      });
      new PopoverController({
        name: 'Password Popover',
        selector: '#login-password-help',
        help: 'パスワードを入力してください'
      });
      new PopoverController({
        name: 'Login Check Popover',
        selector: '#login-check-help',
        help: '共有デバイスでは設定に注意してください。'
      });
    }
  }
}
