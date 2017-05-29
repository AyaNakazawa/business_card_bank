
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
