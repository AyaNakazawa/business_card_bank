
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
    
    this.CARD_DETAIL_ADD_SELECTOR = '#card-detail-add';
    this.CARD_DETAIL_SAVE_SELECTOR = '#card-detail-save';
    this.CARD_DETAIL_DELETE_SELECTOR = '#card-detail-delete';
    
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
  
  setModel(
    _card = null
  ) {
    
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
  
  setCard(
    _id = null,
    _hash = null,
    _card = null
  ) {
    this.model.ID = _id;
    this.model.HASH = _hash;
    this.model.CARD = _card;
  }
  
  openCard(
    _id = this.model.ID,
    _hash = this.model.HASH,
    _card = this.model.CARD
  ) {
    if (_id != null && _hash != null) {
      if (_card == null) {
        // カードの追加
        
      } else {
        // カードの編集
        
      }
    }
  }
  
  addCard() {
    
  }
  
  saveCard() {
    
  }
  
  deleteCard(
    _id = this.model.ID,
    _hash = this.model.HASH,
    _card = this.model.CARD
  ) {
    if (_id != null && _hash != null && _card != null) {
      
    }
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
    
    this.setOn();
  }
  
  setOn() {
    this.setAddClick();
    this.setSaveClick();
    this.setDeleteClick();
  }
  
  setAddClick() {
    SetEvent.setOn(
      'click',
      '#card-detail-add',
      () => {
        this.CONTROLLER.addCard();
      }
    );
  }
  
  setSaveClick() {
    SetEvent.setOn(
      'click',
      '#card-detail-save',
      () => {
        this.CONTROLLER.saveCard();
      }
    );
  }
  
  setDeleteClick() {
    SetEvent.setOn(
      'click',
      '#card-detail-delete',
      () => {
        this.CONTROLLER.deleteCard();
      }
    );
  }
}
