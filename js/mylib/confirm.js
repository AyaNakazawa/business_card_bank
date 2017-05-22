
// ----------------------------------------------------------------
// Confirm Class

class ConfirmModel extends CommonModel {
  constructor({
    name = 'Confirm',
    destroy = true,
    confirmId = 'confirm-id',
    confirmTitle = 'title',
    confirmMessage = 'content',
    event = 'click',
    eventSelector = null,
    eventFunction = 'this.openConfirm()',
    destroyTimeMs = 250,
    templateSelector = '#confirm-view-template',
    generateSelector = '#confirm-view',
    yes = 'Yes',
    no = 'No',
    functionYes = () => {},
    functionNo = () => {},
    functionClose = () => {},
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.DESTROY = destroy;
    
    this.CONFIRM_ID = confirmId;
    this.CONFIRM_SELECTOR = `#${this.CONFIRM_ID}`;
    this.CONFIRM_SELECTOR_YES = `#${this.CONFIRM_ID}-yes`;
    this.CONFIRM_SELECTOR_NO = `#${this.CONFIRM_ID}-no`;
    this.CONFIRM_SELECTOR_CLOSE = `#${this.CONFIRM_ID}-close`;
    
    this.CONFIRM_TITLE = confirmTitle;
    this.CONFIRM_MESSAGE = confirmMessage;
    
    this.EVENT = event;
    this.EVENT_SELECTOR = eventSelector;
    this.EVENT_FUNCTION = eventFunction;
    
    this.DESTROY_TIME_MS = destroyTimeMs;
    
    this.TEMPLATE_SELECTOR = templateSelector;
    this.$TEMPLATE_SELECTOR = $(this.TEMPLATE_SELECTOR);
    this.GENERATE_SELECTOR = generateSelector;
    this.$GENERATE_SELECTOR = $(this.GENERATE_SELECTOR);
    
    this.YES = yes;
    this.NO = no;
    
    this.FUNCTION_YES = functionYes;
    this.FUNCTION_NO = functionNo;
    this.FUNCTION_CLOSE = functionClose;
  }
}

class ConfirmView extends CommonView {
  constructor(_model = new ConfirmModel()) {
    super(_model);
    
    this.initConfirm();
  }
  
  initConfirm() {
    this.generateModal();
    this.setOn();
  }
  
  generateModal() {
    const template = this.model.$TEMPLATE_SELECTOR.text();
    const compiled = _.template(template);
    const model = {
      confirmId: this.model.CONFIRM_ID,
      confirmTitle: this.model.CONFIRM_TITLE,
      confirmMessage: this.model.CONFIRM_MESSAGE,
      yes: this.model.YES,
      no: this.model.NO
    };
    this.model.$GENERATE_SELECTOR.html(compiled(model));
  }
  
  setOn() {
    if (this.model.EVENT_SELECTOR != null) {
      $(document).on(
        this.model.EVENT,
        this.model.EVENT_SELECTOR,
        () => {
          eval(this.model.EVENT_FUNCTION)
        }
      );
    } else {
      $(document).on(
        this.model.EVENT,
        () => {
          eval(this.model.EVENT_FUNCTION)
        }
      );
    }
    $(document).on('click', this.model.CONFIRM_SELECTOR_YES, () => {this.selectYes()});
    $(document).on('click', this.model.CONFIRM_SELECTOR_NO, () => {this.selectNo()});
    $(document).on('click', this.model.CONFIRM_SELECTOR_CLOSE, () => {this.selectClose()});
  }
  
  setOff() {
    if (this.model.EVENT_SELECTOR != null) {
      $(document).off(this.model.EVENT, this.model.EVENT_SELECTOR);
    } else {
      $(document).off(this.model.EVENT);
    }
    $(document).off('click', this.model.CONFIRM_SELECTOR_YES);
    $(document).off('click', this.model.CONFIRM_SELECTOR_NO);
    $(document).off('click', this.model.CONFIRM_SELECTOR_CLOSE);
  }
  
  openConfirm() {
    Log.logClass(this.model.NAME, 'Open confirm');
    $(this.model.CONFIRM_SELECTOR).modal();
  }
  
  selectYes() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Yes', Log.ARROW_INPUT);
    this.model.FUNCTION_YES();
    this.destroy();
  }
  
  selectNo() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'No', Log.ARROW_INPUT);
    this.model.FUNCTION_NO();
    this.destroy();
  }
  
  selectClose() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Close', Log.ARROW_INPUT);
    this.model.FUNCTION_CLOSE();
    this.destroy();
  }
  
  destroy() {
    if (this.model.DESTROY) {
      Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Destroy', Log.ARROW_INPUT);
      this.setOff();
      setTimeout(() => {this.remove()}, this.model.DESTROY_TIME_MS);
    }
  }
  
  remove() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Remove', Log.ARROW_INPUT);
    $(this.model.CONFIRM_SELECTOR).remove();
  }
}

// ----------------------------------------------------------------
// Controllers

class ConfirmController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Confirm Controller'
    });
    
    this.model = new ConfirmModel(_obj);
    this.view = new ConfirmView(this.model);
  }
}
