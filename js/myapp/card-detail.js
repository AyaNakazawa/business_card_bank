
// ----------------------------------------------------------------
// CardDetail Class

// ----------------------------------------------------------------
// Model

class CardDetailModel extends CommonModel {
  constructor({
    name
  } = {}) {
    super({
      name: name
    });
    
    this.NAME = 'Card Detail Model';
    this.EVENT = PS.CDE;
    
    this.CARD_DETAIL_AREA_SELECTOR = '#card-detail-area';
    this.$CARD_DETAIL_AREA_SELECTOR = $(this.CARD_DETAIL_AREA_SELECTOR);
    
    this.ID = null;
    this.HASH = null;
    this.CARD = null;
  }
}

// ----------------------------------------------------------------
// View

class CardDetailView extends CommonView {
  constructor(_model = new CardDetailModel()) {
    super(_model);
    
    this.NAME = 'Card Detail View';
  }
  
  generateCardDetailArea(
    _alertType = 'success',
    _message = null,
    _close = true
  ) {
    this.model.$USER_DETAIL_AREA_SELECTOR.empty();
    this.generateAlert(this.model.$USER_DETAIL_AREA_SELECTOR, _alertType, _message, _close);
    
  }
}

// ----------------------------------------------------------------
// Controller

class CardDetailController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new CardDetailModel(_obj);
    this.view = new CardDetailView(this.model);
    
    this.NAME = 'Card Detail Controller';
  }
}

// ----------------------------------------------------------------
// Event

class CardDetailEvent extends CommonEvent {
  constructor({
    name = 'Card Detail Event'
  } = {})
  {
    super({
      name: name
    });
    
    PS.CDE = this;
    
    this.NAME = name;
    this.CONTROLLER = new CardDetailController({
      name: 'Card Detail Controller',
    });
  }
}
