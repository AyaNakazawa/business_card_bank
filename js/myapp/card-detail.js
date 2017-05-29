
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
  }
}

// ----------------------------------------------------------------
// View

class CardDetailView extends CommonView {
  constructor(_model = new CardDetailModel()) {
    super(_model);
    
    this.NAME = 'Card Detail View';
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
    this.model.ID = null;
    this.model.HASH = null;
    this.model.CARD = null;
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
    
    this.NAME = name;
    this.CONTROLLER = new CardDetailController({
      name: 'Card Detail Controller',
    });
  }
}
