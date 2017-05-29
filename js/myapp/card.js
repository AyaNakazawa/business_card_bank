
// ----------------------------------------------------------------
// Card Class

class CardModel extends CommonModel {
  constructor({
    name
  } = {}) {
    super({
      name: name
    });
    
    this.NAME = name;
    
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
  }
}

class CardView extends CommonView {
  constructor(_model = new CardModel()) {
    super(_model);
    
    this.NAME = 'Card View';
    
    this.model.SELECT = null;
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
        this.setClick(_id);
        this.setHover(_id);
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
  
  setDetailView(_id = null, _view = null, _speed = 0) {
    if (_id != null && _view != null) {
      if (_view) {
        this.setCardPosition(_id);
        $(`#card-${_id}-detail`).slideDown(_speed);
      } else {
        $(`#card-${_id}-detail`).slideUp(_speed);
      }
    }
  }
  
  switchCardActive(_id = null, _flg = null) {
    if (_id != null && _flg != null) {
      if (_flg) {
        $(`#card-${_id}-main`).addClass(this.model.ACTIVE);
      } else {
        $(`#card-${_id}-main`).removeClass(this.model.ACTIVE);
      }
    }
  }
  
  setClick(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-main`).click(
        () => {
          if (this.model.CARD[_id][this.model.ACTIVE]) {
            // 既にアクティブなときは解除
            this.model.CARD[_id][this.model.ACTIVE] = false;
            this.model.CARD[_id][this.model.HOVER] = false;
            this.model.SELECT = null;
            this.switchCardActive(_id, false);
            this.setDetailView(_id, false, this.model.VIEW_SPEED_MS);
          } else {
            // アクティブにする
            $.each(this.model.CARD, (_id, _val) => {
              // 他の項目を解除する
              this.model.CARD[_id][this.model.ACTIVE] = false;
              this.switchCardActive(_id, false);
              this.setDetailView(_id, false, 0);
            });
              // クリックした項目をアクティブにする
            this.model.CARD[_id][this.model.ACTIVE] = true;
            this.model.SELECT = _id;
            this.switchCardActive(_id, true);
            // ホバー表示済みかで速度を変更
            if (this.model.CARD[_id][this.model.HOVER]) {
              this.setDetailView(_id, true, 0);
            } else {
              this.setDetailView(_id, true, this.model.VIEW_SPEED_MS);
            }
          }
        }
      );
    }
  }
  
  setHover(_id = null) {
    if (_id != null) {
      $(`#card-${_id}-main`).hover(
        () => {
          // なにもアクティブでないとき
          if (this.model.SELECT == null) {
            // ホバーにする
            this.model.CARD[_id][this.model.HOVER] = true;
            this.setDetailView(_id, true, this.model.VIEW_SPEED_MS);
          }
        },
        () => {
          // アクティブでないとき
          if (!this.model.CARD[_id][this.model.ACTIVE]) {
            // ホバー解除
            this.model.CARD[_id][this.model.HOVER] = false;
            this.setDetailView(_id, false, 0);
          }
        }
      );
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
    
    this.NAME = name;
    this.CONTROLLER = new CardController({
      name: 'Card Controller',
    });
  }
}
