
// ----------------------------------------------------------------
// CardDetail Class

// ----------------------------------------------------------------
// Model

class CardDetailModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Card Detail Object'
    }
  ) {
    super(_initSetting);
    
    this.CARD_DETAIL_AREA_SELECTOR = '#card-detail-area';
    
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
  constructor(
    _initSetting = {
      NAME: 'Card Detail View'
    }
  ) {
    super(_initSetting);
  }
  
  generateCardDetailArea(
    _alertType = 'success',
    _message = null,
    _close = true
  ) {
    $(this.MODEL.CARD_DETAIL_AREA_SELECTOR).empty();
    this.generateAlert(
      this.MODEL.CARD_DETAIL_AREA_SELECTOR,
      _alertType,
      _message,
      _close
    );
    
  }
}

// ----------------------------------------------------------------
// Event

class CardDetailEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Card Detail Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    this.setAddClick();
    this.setSaveClick();
    this.setDeleteClick();
  }
  
  setAddClick() {
    super.setOn(
      'click',
      this.CONTROLLER.MODEL.CARD_DETAIL_ADD_SELECTOR,
      () => {
        this.CONTROLLER.addCard();
      }
    );
  }
  
  setSaveClick() {
    super.setOn(
      'click',
      this.CONTROLLER.MODEL.CARD_DETAIL_SAVE_SELECTOR,
      () => {
        this.CONTROLLER.saveCard();
      }
    );
  }
  
  setDeleteClick() {
    super.setOn(
      'click',
      this.CONTROLLER.MODEL.CARD_DETAIL_DELETE_SELECTOR,
      () => {
        this.CONTROLLER.deleteCard();
      }
    );
  }
}

// ----------------------------------------------------------------
// Controller

class CardDetailController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Card Detail Controller',
      MODEL: new CardDetailModel(),
      VIEW: new CardDetailView(),
      EVENT: new CardDetailEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setEvent();
  }
  
  setCard(
    _id = null,
    _hash = null,
    _card = null
  ) {
    this.MODEL.ID = _id;
    this.MODEL.HASH = _hash;
    this.MODEL.CARD = _card;
  }
  
  openCard(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _card = this.MODEL.CARD,
    _copy = false
  ) {
    if (_id != null && _hash != null) {
      if (_card == null) {
        // カードがない場合
        if (PS.CONTROLLER.USER.MODEL.LOGIN) {
          // ログイン済み
          // カードの追加
          this.VIEW.generateCardDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'カードを追加できます。'
          );
          PS.CONTROLLER.SWITCH.CARD_DETAIL.VIEW.setView(true);
        } else {
          // ログインしていない
          // カードの選択
          this.VIEW.generateCardDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'ログインしてカードを選択してください。'
          );
          PS.CONTROLLER.SWITCH.CARD_DETAIL.VIEW.setView(false);
        }
      } else {
        if (_copy) {
          // カードの編集
          this.VIEW.generateCardDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'コピーしたカードを追加できます。'
          );
          PS.CONTROLLER.SWITCH.CARD_DETAIL.VIEW.setView(true);
        } else {
          // カードの編集
          this.VIEW.generateCardDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'カードを編集できます。'
          );
          PS.CONTROLLER.SWITCH.CARD_DETAIL.VIEW.setView(true);
        }
      }
    }
  }
  
  addCard(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH
  ) {
    
  }
  
  saveCard(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _card = this.MODEL.CARD
  ) {
    
  }
  
  deleteCard(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _card = this.MODEL.CARD
  ) {
    if (_id != null && _hash != null && _card != null) {
      
    }
  }
}
