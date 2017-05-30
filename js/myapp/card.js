
// ----------------------------------------------------------------
// Card Class

// ----------------------------------------------------------------
// Model

class CardModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Card Object',
      VIEW_SPEED_MS: 100,
      HEADER_TEXT: '名刺情報'
    }
  ) {
    super(_initSetting);
    
    this.CARD_AREA_SELECTOR = '#card-area';
    this.CARD_TBODY_SELECTOR = '#card-tbody';
    
    this.TEMPLATE_CARD_TABLE_SELECTOR = '#card-table-template';
    this.TEMPLATE_CARD_TBODY_SELECTOR = '#card-tbody-template';
    this.TEMPLATE_CARD_HOVER_SELECTOR = '#card-hover-template';
    
    this.ID = null;
    this.HASH = null;
    this.DOWNLOAD = null;
    this.CARDS = null;
    
    this.INITIALIZE = true;
    
    this.SELECT = null;
  }
}

// ----------------------------------------------------------------
// View

class CardView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Card View'
    }
  ) {
    super(_initSetting);
  }
  
  generateCardArea(
    _alertType = this.MODEL.ALERT_SUCCESS,
    _message = null,
    _close = true
  ) {
    $(this.MODEL.CARD_AREA_SELECTOR).empty();
    $(this.MODEL.CARD_AREA_SELECTOR).append(Content.getHeader(this.MODEL.HEADER_TEXT));
    this.generateAlert(this.MODEL.CARD_AREA_SELECTOR, _alertType, _message, _close);
    
    let template = null;
    if (this.MODEL.DOWNLOAD) {
      Log.logClass(this.NAME, 'Cards is found');
      $(this.MODEL.CARD_AREA_SELECTOR).append(this.getTemplate(
        this.MODEL.TEMPLATE_CARD_TABLE_SELECTOR,
        {}
      ));
      
      $.each(this.MODEL.CARDS, (_id, _val) => {
        this.MODEL.CARDS[_id][this.MODEL.ACTIVE] = false;
        $(this.MODEL.CARD_TBODY_SELECTOR).append(this.getTemplate(
          this.MODEL.TEMPLATE_CARD_TBODY_SELECTOR,
          {card: _val}
        ));
        $(this.MODEL.CARD_AREA_SELECTOR).append(this.getTemplate(
          this.MODEL.TEMPLATE_CARD_HOVER_SELECTOR,
          {card: _val}
        ));
        this.EVENT.setCardClick(_id);
        this.EVENT.setCardHover(_id);
        this.EVENT.setEditClick(_id);
        this.EVENT.setDeleteClick(_id);
        this.EVENT.setCopyClick(_id);
        this.EVENT.setcloseClick(_id);
      });
      
    } else {
      Log.logClass(this.NAME, 'Cards is not found');
    }
  }
  
  setCardPosition(
    _id = null
  ) {
    if (_id != null) {
      $(`#card-${_id}-detail`).css('top', ($(`#card-${_id}-main`).offset().top + $(`#card-${_id}-main`).height()) + 'px');
    }
  }
  
  setDetailView(
    _id = null,
    _view = null,
    _type = null,
    _speed = 0
  ) {
    if (_id != null && _view != null && _type != null) {
      if (_view) {
        this.setCardPosition(_id);
        if (_type == this.MODEL.HOVER) {
          // ホバーにする
          this.MODEL.CARDS[_id][this.MODEL.HOVER] = true;
        } else if (_type == this.MODEL.ACTIVE) {
          // アクティブにする
          this.MODEL.SELECT = _id;
          this.setCardActive(_id, true);
          // ホバー表示済みかで速度を変更
          if (this.MODEL.CARDS[_id][this.MODEL.HOVER]) {
            _speed = 0;
          } else {
            _speed = this.MODEL.VIEW_SPEED_MS;
          }
        }
        $(`#card-${_id}-detail`).slideDown(_speed);
      } else {
        if (_type == this.MODEL.HOVER) {
          // ホバーを解除
          this.MODEL.CARDS[_id][this.MODEL.HOVER] = false;
        } else if (_type == this.MODEL.ACTIVE) {
          // アクティブを解除
          this.MODEL.SELECT = null;
          this.MODEL.CARDS[_id][this.MODEL.HOVER] = false;
          this.setCardActive(_id, false);
        }
        $(`#card-${_id}-detail`).slideUp(_speed);
      }
    }
  }
  
  setCardActive(
    _id = null,
    _flg = null
  ) {
    if (_id != null && _flg != null) {
      if (_flg) {
        this.MODEL.CARDS[_id][this.MODEL.ACTIVE] = true;
        $(`#card-${_id}-main`).addClass(this.MODEL.ACTIVE);
      } else {
        this.MODEL.CARDS[_id][this.MODEL.ACTIVE] = false;
        $(`#card-${_id}-main`).removeClass(this.MODEL.ACTIVE);
      }
    }
  }
}

// ----------------------------------------------------------------
// Event

class CardEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Card Event'
    }
  ) {
    super(_initSetting);
  }
  
  setCardClick(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-main`).click(
        () => {
          if (this.MODEL.CARDS[_id][this.MODEL.ACTIVE]) {
            // 既にアクティブなときは解除
            this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
          } else {
            // アクティブにする
            $.each(this.MODEL.CARDS, (_id2, _val2) => {
              // 他の項目を解除する
              if (_id2 != _id) {
                this.VIEW.setDetailView(_id2, false, this.MODEL.ACTIVE);
              }
            });
            // クリックした項目をアクティブにする
            this.VIEW.setDetailView(_id, true, this.MODEL.ACTIVE);
          }
        }
      );
    }
  }
  
  setCardHover(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-main`).hover(
        () => {
          // なにもアクティブでないとき
          if (this.MODEL.SELECT == null) {
            // ホバーにする
            this.VIEW.setDetailView(_id, true, this.MODEL.HOVER, this.MODEL.VIEW_SPEED_MS);
          }
        },
        () => {
          // アクティブでないとき
          if (!this.MODEL.CARDS[_id][this.MODEL.ACTIVE]) {
            // ホバー解除
            this.VIEW.setDetailView(_id, false, this.MODEL.HOVER);
          }
        }
      );
    }
  }
  
  setEditClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-edit`).click(
        () => {
          this.CONTROLLER.editCard(_id);
        }
      );
    }
  }
  
  setDeleteClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-delete`).click(
        () => {
          this.CONTROLLER.deleteCard(_id);
        }
      );
    }
  }
  
  setCopyClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-copy`).click(
        () => {
          this.CONTROLLER.copyCard(_id);
        }
      );
    }
  }
  
  setcloseClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-close`).click(
        () => {
          this.CONTROLLER.closeCard(_id);
        }
      );
    }
  }
}

// ----------------------------------------------------------------
// Controller

class CardController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Card Controller',
      MODEL: new CardModel(),
      VIEW: new CardView(),
      EVENT: new CardEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.downloadCard();
  }
  
  setUser(_id = this.MODEL.ID, _hash = this.MODEL.HASH) {
    this.MODEL.ID = _id;
    this.MODEL.HASH = _hash;
    
    this.downloadCard();
  }
  
  downloadCard(_id = this.MODEL.ID, _hash = this.MODEL.HASH) {
    this.MODEL.DOWNLOAD = false;
    
    this.VIEW.generateLoading(this.MODEL.CARD_AREA_SELECTOR, '通信中', `ユーザーID ${_id} の名刺データを取得中`);
    
    if (_id != null && _hash != null) {
      $.ajax({
        url: 'ruby/getCard.rb',
        data: {
          id: _id,
          password: _hash
        },
        dataType: 'json',
        success: (_data) => {
          Log.logClassKey(this.NAME, 'ajax getCard', 'success');
          this.MODEL.DOWNLOAD = true;
          if (Object.keys(_data).length > 0) {
            this.MODEL.CARDS = _data;
            if (this.MODEL.INITIALIZE) {
              this.VIEW.generateCardArea(this.MODEL.ALERT_SUCCESS, `名刺データを取得しました。`);
              
            } else {
              this.VIEW.generateCardArea(this.MODEL.ALERT_INFO, `名刺データを更新しました。`);
            }
            this.MODEL.INITIALIZE = false;
            
          } else {
            this.MODEL.CARDS = null;
            this.VIEW.generateCardArea(this.MODEL.ALERT_INFO, '名刺データは存在しません。', false);
          }
        },
        error: () => {
          Log.logClassKey(this.NAME, 'ajax getCard', 'failed');
          this.VIEW.generateCardArea(this.MODEL.ALERT_DANGER, 'ajax通信に失敗しました。', false);
          this.MODEL.INITIALIZE = true;
        }
      });
    } else {
      this.VIEW.generateCardArea(this.MODEL.ALERT_WARNING, 'ログインしてください。', false);
      this.MODEL.INITIALIZE = true;
    }
  }
  
  editCard(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Edit');
    PS.CONTROLLER.CARD_DETAIL.openCard(
      this.MODEL.ID,
      this.MODEL.HASH,
      this.MODEL.CARDS[_id],
      false
    );
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  deleteCard(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Delete');
    PS.CONTROLLER.CARD_DETAIL.deleteCard(
      this.MODEL.ID,
      this.MODEL.HASH,
      this.MODEL.CARDS[_id]
    );
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  copyCard(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Copy');
    PS.CONTROLLER.CARD_DETAIL.openCard(
      this.MODEL.ID,
      this.MODEL.HASH,
      this.MODEL.CARDS[_id],
      true
    );
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  closeCard(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Close');
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
}
