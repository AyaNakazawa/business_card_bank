
// ----------------------------------------------------------------
// Popover Class

class PopoverModel extends CommonModel {
  constructor({
    name = 'Popover',
    selector = null,
    help = 'popover',
    trigger = 'hover'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.SELECTOR = selector;
    this.HELP = help;
    this.TRIGGER = trigger;
  }
}

class PopoverView extends CommonView {
  constructor(_model = new PopoverModel()) {
    super(_model);
    
    this.setPopover();
  }
  
  setPopover() {
    if (this.model.SELECTOR != null) {
      $(this.model.SELECTOR).attr('data-toggle', 'popover');
      $(this.model.SELECTOR).attr('data-content', this.model.HELP);
      $(this.model.SELECTOR).attr('data-trigger', this.model.TRIGGER);
      $(this.model.SELECTOR).popover();
    }
  }
}

// ----------------------------------------------------------------
// Controllers

class PopoverController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Popover Controller'
    });
    
    this.model = new PopoverModel(_obj);
    this.view = new PopoverView(this.model);
  }
}
