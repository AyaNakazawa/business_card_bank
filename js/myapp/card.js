
// ----------------------------------------------------------------
// Card Class

// ----------------------------------------------------------------
// Model

class CardModel extends CommonModel {
  constructor({
    name
  } = {}) {
    super({
      name: name
    });
    
    this.NAME = name;
    this.EVENT = PS.CE;
    
    this.CARD_AREA_SELECTOR = '#card-area';
    this.$CARD_AREA_SELECTOR = $(this.CARD_AREA_SELECTOR);
    this.TEMPLATE_CARD_TABLE_SELECTOR = '#card-table-template';
    this.$TEMPLATE_CARD_TABLE_SELECTOR = $(this.TEMPLATE_CARD_TABLE_SELECTOR);
    this.TEMPLATE_CARD_TBODY_SELECTOR = '#card-tbody-template';
    this.$TEMPLATE_CARD_TBODY_SELECTOR = $(this.TEMPLATE_CARD_TBODY_SELECTOR);
    this.TEMPLATE_CARD_HOVER_SELECTOR = '#card-hover-template';
    this.$TEMPLATE_CARD_HOVER_SELECTOR = $(this.TEMPLATE_CARD_HOVER_SELECTOR);
    
    this.CARD_TBODY = '#card-tbody';
    this.$CARD_TBODY = $(this.CARD_TBODY);
    
    this.VIEW_SPEED_MS = 100;
    this.HEADER_TEXT = '名刺情報';
    
    this.model.SELECT = null;
  }
}

// ----------------------------------------------------------------
// View

class CardView extends CommonView {
  constructor(_model = new CardModel()) {
    super(_model);
    
    this.NAME = 'Card View';
  }
  
  generateCardArea(_alertType = this.model.ALERT_SUCCESS, _message = null, _close = true) {
    this.model.$CARD_AREA_SELECTOR.empty();
    this.model.$CARD_AREA_SELECTOR.append(Content.getHeader(this.model.HEADER_TEXT));
    this.generateAlert(this.model.$CARD_AREA_SELECTOR, _alertType, _message, _close);
    
    let template = null;
    if (this.model.DOWNLOAD) {
      Log.logClass(this.NAME, 'Card is found');
      this.model.$CARD_AREA_SELECTOR.append(this.getTemplate(
        this.model.$TEMPLATE_CARD_TABLE_SELECTOR,
        {}
      ));
      this.model.$CARD_TBODY = $(this.model.CARD_TBODY);
      
      $.each(this.model.CARD, (_id, _val) => {
        this.model.CARD[_id][this.model.ACTIVE] = false;
        this.model.$CARD_TBODY.append(this.getTemplate(
          this.model.$TEMPLATE_CARD_TBODY_SELECTOR,
          {card: _val}
        ));
        this.model.$CARD_AREA_SELECTOR.append(this.getTemplate(
          this.model.$TEMPLATE_CARD_HOVER_SELECTOR,
          {card: _val}
        ));
        this.model.EVENT.setCardClick(_id);
        this.model.EVENT.setCardHover(_id);
        this.model.EVENT.setEditClick(_id);
        this.model.EVENT.setDeleteClick(_id);
        this.model.EVENT.setCopyClick(_id);
        this.model.EVENT.setcloseClick(_id);
      });
      
    } else {
      Log.logClass(this.NAME, 'Card is not found');
    }
  }
  
  setCardPosition(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-detail`).css('top', ($(`#card-${_id}-main`).offset().top + $(`#card-${_id}-main`).height()) + 'px');
    }
  }
  
  setDetailView(_id = null, _view = null, _type = null, _speed = 0) {
    if (_id != null && _view != null && _type != null) {
      if (_view) {
        this.setCardPosition(_id);
        if (_type == this.model.HOVER) {
          // ホバーにする
          this.model.CARD[_id][this.model.HOVER] = true;
        } else if (_type == this.model.ACTIVE) {
          // アクティブにする
          this.model.SELECT = _id;
          this.setCardActive(_id, true);
          // ホバー表示済みかで速度を変更
          if (this.model.CARD[_id][this.model.HOVER]) {
            _speed = 0;
          } else {
            _speed = this.model.VIEW_SPEED_MS;
          }
        }
        $(`#card-${_id}-detail`).slideDown(_speed);
      } else {
        if (_type == this.model.HOVER) {
          // ホバーを解除
          this.model.CARD[_id][this.model.HOVER] = false;
        } else if (_type == this.model.ACTIVE) {
          // アクティブを解除
          this.model.SELECT = null;
          this.model.CARD[_id][this.model.HOVER] = false;
          this.setCardActive(_id, false);
        }
        $(`#card-${_id}-detail`).slideUp(_speed);
      }
    }
  }
  
  setCardActive(_id = null, _flg = null) {
    if (_id != null && _flg != null) {
      if (_flg) {
        this.model.CARD[_id][this.model.ACTIVE] = true;
        $(`#card-${_id}-main`).addClass(this.model.ACTIVE);
      } else {
        this.model.CARD[_id][this.model.ACTIVE] = false;
        $(`#card-${_id}-main`).removeClass(this.model.ACTIVE);
      }
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
    
    this.NAME = 'Card Controller';
    this.model.ID = null;
    this.model.HASH = null;
    this.model.DOWNLOAD = null;
    this.model.CARD = null;
    
    this.downloadCard();
  }
  
  setUser(_id = null, _hash = null) {
    this.model.ID = _id;
    this.model.HASH = _hash;
    
    this.downloadCard(this.model.ID, this.model.HASH)
  }
  
  downloadCard(_id = null, _hash = null) {
    this.model.DOWNLOAD = false;
    
    this.view.generateLoading(this.model.$CARD_AREA_SELECTOR, '通信中', `ユーザーID ${_id} の名刺データを取得中`);
    
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
          if (Object.keys(_data).length > 0) {
            this.model.DOWNLOAD = true;
            this.model.CARD = _data;
            this.view.generateCardArea(this.model.ALERT_SUCCESS, `名刺データを取得しました。`);
          } else {
            this.view.generateCardArea(this.model.ALERT_INFO, '名刺データは存在しません。', false);
          }
        },
        error: () => {
          Log.logClassKey(this.NAME, 'ajax getCard', 'failed');
          this.view.generateCardArea(this.model.ALERT_DANGER, 'ajax通信に失敗しました。', false);
        }
      });
    } else {
      this.view.generateCardArea(this.model.ALERT_WARNING, 'ログインしてください。', false);
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
    
    PS.CE = this;
    
    this.NAME = name;
    this.CONTROLLER = new CardController({
      name: 'Card Controller',
    });
  }
  
  setCardClick(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-main`).click(
        () => {
          if (this.CONTROLLER.model.CARD[_id][this.CONTROLLER.model.ACTIVE]) {
            // 既にアクティブなときは解除
            this.CONTROLLER.view.setDetailView(_id, false, this.CONTROLLER.model.ACTIVE, this.CONTROLLER.model.VIEW_SPEED_MS);
          } else {
            // アクティブにする
            $.each(this.CONTROLLER.model.CARD, (_id2, _val2) => {
              // 他の項目を解除する
              if (_id2 != _id) {
                this.CONTROLLER.view.setDetailView(_id2, false, this.CONTROLLER.model.ACTIVE);
              }
            });
            // クリックした項目をアクティブにする
            this.CONTROLLER.view.setDetailView(_id, true, this.CONTROLLER.model.ACTIVE);
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
          if (this.CONTROLLER.model.SELECT == null) {
            // ホバーにする
            this.CONTROLLER.view.setDetailView(_id, true, this.CONTROLLER.model.HOVER, this.CONTROLLER.model.VIEW_SPEED_MS);
          }
        },
        () => {
          // アクティブでないとき
          if (!this.CONTROLLER.model.CARD[_id][this.CONTROLLER.model.ACTIVE]) {
            // ホバー解除
            this.CONTROLLER.view.setDetailView(_id, false, this.CONTROLLER.model.HOVER);
          }
        }
      );
    }
  }
  
  setEditClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-edit`).click(
        () => {
          Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Edit');
        }
      );
    }
  }
  
  setDeleteClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-delete`).click(
        () => {
          Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Delete');
        }
      );
    }
  }
  
  setCopyClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-copy`).click(
        () => {
          Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Copy');
        }
      );
    }
  }
  
  setcloseClick(_id = null) {
    if (_id != null) {
      $(`.card-${_id}-close`).click(
        () => {
          Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Close');
          this.CONTROLLER.view.setDetailView(_id, false, this.CONTROLLER.model.ACTIVE, this.CONTROLLER.model.VIEW_SPEED_MS);
        }
      );
    }
  }
}
