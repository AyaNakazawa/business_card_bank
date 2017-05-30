
// ----------------------------------------------------------------
// Scroll Class

// ----------------------------------------------------------------
// Model

class ScrollModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Scroll Object',
      EVENT_TRIGGER: 'click',
      POSITION_OFFSET: 0,
      EVENT_SELECTOR: null,
      SCROLL_SELECTOR: null,
      SCROLL_TIME_MS: 750
    }
  ) {
    super(_initSetting);
  }
}

// ----------------------------------------------------------------
// View

class ScrollView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Scroll View'
    }
  ) {
    super(_initSetting);
  }
  
  scroll() {
    Log.logClass('Scroll', this.MODEL.NAME);
    $(this.MODEL.BODY).animate(
      {
        scrollTop: $(this.MODEL.SCROLL_SELECTOR).offset().top + this.MODEL.POSITION_OFFSET
      },
      {
        duration: this.MODEL.SCROLL_TIME_MS,
        easing: 'easeOutBack'
      }
    );
  }
}

// ----------------------------------------------------------------
// Event

class ScrollEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Scroll Event'
    }
  ) {
    super(_initSetting);
  }
  
  setOnScroll() {
    if (this.MODEL.EVENT_SELECTOR != null) {
      super.setOn(
        this.MODEL.EVENT_TRIGGER,
        this.MODEL.EVENT_SELECTOR,
        () => {
          this.VIEW.scroll();
        }
      );
    }
  }
}

// ----------------------------------------------------------------
// Controller

class ScrollController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Scroll Controller',
      MODEL: new ScrollModel(),
      VIEW: new ScrollView(),
      EVENT: new ScrollEvent(),
      VIEW_OBJECT: false
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setOnScroll();
  }
}
