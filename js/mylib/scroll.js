
// ----------------------------------------------------------------
// Scroll Class

class ScrollModel extends CommonModel {
  constructor({
    name = 'Scroll',
    event = 'click',
    positionOffset = 0,
    triggerSelector = null,
    scrollDistSelector = null,
    scrollTimeMs = 500
  } = {})
  {
    super({
      name: name
    });
    
    // each setting
    this.NAME = name;
    this.EVENT = event;
    this.POSITION_OFFSET = positionOffset;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SCROLL_SELECTOR = scrollDistSelector;
    this.$SCROLL_SELECTOR = $(this.SCROLL_SELECTOR);
    this.SCROLL_TIME_MS = scrollTimeMs;
  }
}

class ScrollView extends CommonView {
  constructor(_model = new ScrollModel()) {
    super(_model);
    
    // Init ScrollView
    this.setOn();
  }
  
  setOn() {
    if (this.model.SCROLL_SELECTOR != null) {
      if (this.model.TRIGGER_SELECTOR != null) {
        $(document).on(this.model.EVENT, this.model.TRIGGER_SELECTOR, () => {this.scroll()});
      } else {
        $(document).on(this.model.EVENT, () => {this.scroll()});
      }
    }
  }
  
  scroll() {
    Log.logClass('Scroll', this.model.NAME);
    this.model.$BODY.animate(
      {
        scrollTop: this.model.$SCROLL_SELECTOR.offset().top + this.model.POSITION_OFFSET
      },
      this.model.SCROLL_TIME_MS
    );
  }
}

// ----------------------------------------------------------------
// Controllers

class ScrollController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Scroll Controller'
    });
    
    this.model = new ScrollModel(_obj);
    this.view = new ScrollView(this.model);
  }
}
