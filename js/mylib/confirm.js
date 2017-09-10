
// ----------------------------------------------------------------
// Confirm Class

// ----------------------------------------------------------------
// Model

class ConfirmModel extends CommonModel {
  static get TYPE_0BUTTON() { return 0; }
  static get TYPE_1BUTTON() { return 1; }
  static get TYPE_2BUTTON() { return 2; }

  constructor(
    _initSetting = {
      NAME: 'Confirm Object',
      DESTROY: true,
      CONFIRM_ID: 'confirm-id',
      CONFIRM_TITLE: 'title',
      CONFIRM_MESSAGE: '',
      EVENT_TRIGGER: 'click',
      EVENT_SELECTOR: null,
      AUTO_OPEN: false,
      DESTROY_TIME_MS: 250,
      TYPE: 2,
      IMAGE_URL: '',
      YES: 'Yes',
      NO: 'No',
      FUNCTION_YES: () => {},
      FUNCTION_NO: () => {},
      FUNCTION_CLOSE: () => {}
    }
  ) {
    super(_initSetting);
    
    this.GENERATE_SELECTOR = '#confirm-view';
    this.TEMPLATE_SELECTOR = '#confirm-view-template';
  }
  
  updateSelector() {
    this.CONFIRM_ID_SELECTOR = `#${this.CONFIRM_ID}`;
    this.CONFIRM_ID_SELECTOR_YES = `#${this.CONFIRM_ID}-yes`;
    this.CONFIRM_ID_SELECTOR_NO = `#${this.CONFIRM_ID}-no`;
    this.CONFIRM_ID_SELECTOR_CLOSE = `#${this.CONFIRM_ID}-close`;
  }
}

// ----------------------------------------------------------------
// View

class ConfirmView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Confirm View'
    }
  ) {
    super(_initSetting);
  }
  
  generateModal() {
    $(this.MODEL.GENERATE_SELECTOR).html(super.getTemplate(
      $(this.MODEL.TEMPLATE_SELECTOR),
      {
        confirmId: this.MODEL.CONFIRM_ID,
        confirmTitle: this.MODEL.CONFIRM_TITLE,
        confirmMessage: this.MODEL.CONFIRM_MESSAGE,
        yes: this.MODEL.YES,
        no: this.MODEL.NO,
        type: this.MODEL.TYPE,
        imageUrl: this.MODEL.IMAGE_URL
      }
    ));
  }
}

// ----------------------------------------------------------------
// Event

class ConfirmEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Confirm Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent(_set = null) {
    if (_set != null) {
      if (_set) {
        this.setOnOpen();
        this.setOnYesClick();
        this.setOnNoClick();
        this.setOnCloseClick();
      } else {
        this.setOffOpen();
        this.setOffYesClick();
        this.setOffNoClick();
        this.setOffCloseClick();
      }
    }
  }
  
  setOnOpen() {
    if (this.MODEL.AUTO_OPEN) {
      this.CONTROLLER.openConfirm();
    } else {
      super.setOn(
        this.MODEL.EVENT_TRIGGER,
        this.MODEL.EVENT_SELECTOR,
        () => {
          this.CONTROLLER.openConfirm();
        }
      );
    }
  }
  
  setOnYesClick() {
    super.setOn(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_YES,
      () => {
        this.CONTROLLER.selectYes();
      }
    );
  }
  
  setOnNoClick() {
    super.setOn(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_NO,
      () => {
        this.CONTROLLER.selectNo();
      }
    );
  }
  
  setOnCloseClick() {
    super.setOn(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_CLOSE,
      () => {
        this.CONTROLLER.selectClose();
      }
    );
  }
  
  setOffOpen() {
    if (!this.MODEL.AUTO_OPEN) {
      super.setOff(
        this.MODEL.EVENT_TRIGGER,
        this.MODEL.EVENT_SELECTOR
      );
    }
  }
  
  setOffYesClick() {
    super.setOff(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_YES
    );
  }
  
  setOffNoClick() {
    super.setOff(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_NO
    );
  }
  
  setOffCloseClick() {
    super.setOff(
      'click',
      this.MODEL.CONFIRM_ID_SELECTOR_CLOSE
    );
  }
}

// ----------------------------------------------------------------
// Controller

class ConfirmController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Confirm Controller',
      MODEL: new ConfirmModel(),
      VIEW: new ConfirmView(),
      EVENT: new ConfirmEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.initConfirm();
  }
  
  initConfirm() {
    this.MODEL.updateSelector();
    this.VIEW.generateModal();
    this.EVENT.setEvent(true);
  }
  
  openConfirm() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Open', Log.ARROW_INPUT);
    Log.logClass(this.NAME, this.MODEL.CONFIRM_ID_SELECTOR);
    $(this.MODEL.CONFIRM_ID_SELECTOR).modal();
  }
  
  selectYes() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Yes', Log.ARROW_INPUT);
    this.MODEL.FUNCTION_YES();
    this.destroy();
  }
  
  selectNo() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'No', Log.ARROW_INPUT);
    this.MODEL.FUNCTION_NO();
    this.destroy();
  }
  
  selectClose() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Close', Log.ARROW_INPUT);
    this.MODEL.FUNCTION_CLOSE();
    this.destroy();
  }
  
  destroy() {
    if (this.MODEL.DESTROY) {
      Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Destroy', Log.ARROW_INPUT);
      this.EVENT.setEvent(false);
      setTimeout(
        () => {
          this.remove();
        },
        this.MODEL.DESTROY_TIME_MS
      );
    }
  }
  
  remove() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Remove', Log.ARROW_INPUT);
    $(this.MODEL.CONFIRM_ID_SELECTOR).remove();
  }
}
