
// ----------------------------------------------------------------
// Popover Class

// ----------------------------------------------------------------
// Model

class PopoverModel extends CommonModel {
  constructor(
    _setting = {}, 
    _initSetting = {
      NAME: 'Popover Object',
      SELECTOR: null,
      HELP: 'popover',
      TRIGGER: 'hover'
    }
  ) {
    super(_setting, _initSetting);
  }
}

// ----------------------------------------------------------------
// View

class PopoverView extends CommonView {
  constructor(
    _setting = {}, 
    _initSetting = {
      NAME: 'Popover View'
    }
  ) {
    super(_setting, _initSetting);
  }
}

// ----------------------------------------------------------------
// Event

class PopoverEvent extends CommonEvent {
  constructor(
    _setting = {}, 
    _initSetting = {
      NAME: 'Popover Event'
    }
  ) {
    super(_setting, _initSetting);
  }
  
  setPopover() {
    if (this.MODEL.SELECTOR != null) {
      $(this.MODEL.SELECTOR).attr('data-toggle', 'popover');
      $(this.MODEL.SELECTOR).attr('data-content', this.MODEL.HELP);
      $(this.MODEL.SELECTOR).attr('data-trigger', this.MODEL.TRIGGER);
      $(this.MODEL.SELECTOR).popover();
    }
  }
}

// ----------------------------------------------------------------
// Controller

class PopoverController extends CommonController {
  constructor(
    _model = {}, 
    _initSetting = {
      NAME: 'Popover Controller',
      MODEL: new PopoverModel(),
      VIEW: new PopoverView(),
      EVENT: new PopoverEvent(),
      VIEW_OBJECT: false
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setPopover();
  }
}
