import React, { Component } from 'react';
import HeaderTwo from './header/HeaderTwo';

export class ChatAgent extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: '4bca18f3458cf56f92e20d2d16070f09',
        // appId: '1e8770ee3930455a5b34e3b916dcf5664',
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      kommunicateSettings.onInit = function () {
        var cssChanges =
          '  .mck-box{width: 387px!important; Height: 500px !important}';
        var css2 = '  .mck-sidebox{top: 190!important; left:60 !important}';
        window.Kommunicate.customizeWidgetCss(cssChanges);
        window.Kommunicate.customizeWidgetCss(css2);
      };
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      var h = document.getElementsByTagName('head')[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <>
        <HeaderTwo />
        <div>
          <img className="nexonEv" src="../../../Images/nexonEv.jpg" alt="" />
        </div>
      </>
    );
  }
}

export default ChatAgent;
