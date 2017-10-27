function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function sensitiveChat(){

  var styles = {
    'button': [
      'border: none;',
      'display: block;',
      'position: fixed;',
      'top: auto;',
      'left: auto;',
      'bottom: 0px;',
      'right: 0px;',
      'width: 80px !important;',
      'height: 80px !important;',
      'visibility: visible;',
      'z-index 2147483647;',
      'max-height: 100vh;',
      'max-width: 100vw;',
      'transition: none;',
      'background: none transparent;',
      'opacity: 1;',
    ],
    'mini-chat': [
      'border: none;',
      'display: block;',
      'position: fixed;',
      'top: auto;',
      'left: auto;',
      'bottom: 0px;',
      'right: 0px;',
      'width: 280px !important;',
      'height: 450px !important;',
      'visibility: visible;',
      'z-index 2147483647;',
      'max-height: 100vh;',
      'max-width: 100vw;',
      'transition: none;',
      'background: none transparent;',
      'opacity: 1;',
    ],
    'side-chat': [
      'border: none;',
      'display: block;',
      'position: fixed;',
      'top: auto;',
      'left: auto;',
      'bottom: 0px;',
      'right: 0px;',
      'width: 360px !important;',
      'height: 100% !important;',
      'visibility: visible;',
      'z-index 2147483647;',
      'max-height: 100vh;',
      'max-width: 100vw;',
      'transition: none;',
      'background: none transparent;',
      'opacity: 1;',
    ],
  }

  return {
    load: function(){
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'http://localhost:4200/');
      iframe.setAttribute('id', 'sensitive-widget');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('style', styles.button.join('')); // default
      document.body.appendChild(iframe);
      this.listenerMessage(iframe);
    },
    postMessage: function(iframe){
      iframe.contentWindow.postMessage('test', '*');
    },
    listenerMessage: function(iframe){
      var self = this;
      window.addEventListener('message', (event) => {
        if(event.data.type && event.data.state){
          var styles = self.getStyle(self.getStyleFromState(event.data.state));
          iframe.setAttribute('style', styles);
        }
      }, false);
    },
    getStyleFromState: function(state){
      if (!state.showMiniChat && !state.showSideChat) {
        return 'button';
      } else if(state.showMiniChat && !state.showSideChat) {
        return 'mini-chat';
      } else if(!state.showMiniChat && state.showSideChat) {
        return 'side-chat';
      }
    },
    getStyle: function(key){
      if(styles.hasOwnProperty(key)){
        return styles[key].join('');
      }
      return 'button'; // default
    }
  }
}

!function() {
  window.sensitiveChat = sensitiveChat();
  ready(function(){
    window.sensitiveChat.load();
  });
}();
