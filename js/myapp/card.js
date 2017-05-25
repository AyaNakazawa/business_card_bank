
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
    
    this.CARD_AREA_SELECTOR = '#card-area';
    this.$CARD_AREA_SELECTOR = $(this.CARD_AREA_SELECTOR);
    this.TEMPLATE_CARD_TABLE_SELECTOR = '#card-table-template';
    this.$TEMPLATE_CARD_TABLE_SELECTOR = $(this.TEMPLATE_CARD_TABLE_SELECTOR);
    
    this.CARD_TBODY = '#card-tbody';
    this.$CARD_TBODY = $(this.CARD_TBODY);
  }
}

class CardView extends SwitchView {
  constructor(_model = new CardModel()) {
    super(_model);
  }
  
  generateCardArea(_alertType = 'success', _message = null) {
    this.model.$CARD_AREA_SELECTOR.empty();
    this.model.$CARD_AREA_SELECTOR.append(Content.getHeader('名刺情報'));
    this.generateAlert(this.model.$CARD_AREA_SELECTOR, _alertType, _message);
    
    let template = null;
    if (this.model.LOGIN) {
      // ログインしているとき
      template = this.model.$TEMPLATE_CARD_TABLE_SELECTOR.text();
      const compiled = _.template(template);
      const model = {};
      this.model.$CARD_AREA_SELECTOR.append(compiled(model));
      this.model.$CARD_TBODY = $(this.model.CARD_TBODY);
    }
  }
}

// ----------------------------------------------------------------
// Controller

class CardController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new CardModel(_obj);
    this.view = new CardView(this.model);
    
    this.model.ID = null;
    this.model.HASH = null;
    this.model.LOGIN = null;
  }
  
  setUser(_id = null, _hash = null) {
    this.model.ID = _id;
    this.model.HASH = _hash;
    if (this.model.ID != null && this.model.HASH != null) {
      this.model.LOGIN = true;
    } else {
      this.model.LOGIN = false;
    }
    
    this.downloadCard(this.model.ID, this.model.HASH)
  }
  
  downloadCard(_id = null, _hash = null) {
    
    this.view.generateLoading(this.model.$CARD_AREA_SELECTOR, '通信中', `ユーザーID ${this.model.ID} の名刺データを取得中...`);
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
