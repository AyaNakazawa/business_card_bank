
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
  }
  
  setHash(_hash = null) {
    this.model.HASH = _hash;
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
