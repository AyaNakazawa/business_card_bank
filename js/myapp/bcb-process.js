
class BCBProcess extends CommonProcess {
  constructor() {
    super({
      name: `${Project.NAME} Process`
    });
    
    this.initProcess();
  }
  
  initProcess() {
    this.initContent();
    this.createDesc();
    BCBProcess.initPopover();
    this.initEvent();
    this.initController();
    this.show();
  }
  
  initContent() {
    $('main').empty();
    $('main').append(Content.getContent('desc-area'));
    $('main').append(Content.getContent('user-area'));
    $('main').append(Content.getContent('card-area'));
  }
  
  createDesc() {
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
  
  initEvent() {
    CE = new CardEvent();
    UE = new UserEvent();
    {
      new SwitchEvent({
        template: 'desc'
      });
      new SwitchEvent({
        template: 'user',
        view: true,
        lsKey: 'none'
      });
      new SwitchEvent({
        template: 'card',
        view: false,
        lsKey: 'none'
      });
    }
  }
  
  initController() {
    
  }
  
  show() {
    $('main').slideDown(300);
  }
}
