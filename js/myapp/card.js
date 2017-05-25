
// ----------------------------------------------------------------
// Card Class

class CardModel extends SwitchModel {
  constructor({
    name,
    lsKeyView,
    triggerSelector,
    switchSelector,
    hash = null
  } = {}) {
    super({
      name: name,
      lsKeyView: lsKeyView,
      triggerSelector: triggerSelector,
      switchSelector: switchSelector
    });
    
    this.NAME = name;
    this.HASH = hash;
    
    this.CARD_TBODY = '#card-area tbody';
    this.$CARD_TBODY = $(this.CARD_TBODY);
  }
}

class CardView extends SwitchView {
  constructor(_model = new CardModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controller

class CardController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new CardModel(_obj);
    this.view = new CardView(this.model);
    
    this.ID = null;
    this.HASH = null;
    this.LOGIN = null;
  }
  
  setUser(_id = null, _hash = null) {
    this.ID = _id;
    this.HASH = _hash;
    if (this.ID != null && this.HASH != null) {
      this.LOGIN = true;
    }
  }
}

// ----------------------------------------------------------------
// Event

class CardEvent extends CommonEvent {
  constructor({
    name = 'Card Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new CardController({
      name: 'Card Switch',
      lsKeyView: 'card',
      triggerSelector: '#action-card',
      switchSelector: '#card-area'
    });
  }
}
