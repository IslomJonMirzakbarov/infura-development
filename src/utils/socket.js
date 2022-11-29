import { store } from 'store';
import { popupActions } from 'store/popup/popup.slice';

const handleUpdateDownloaded = (version) => {
  store.dispatch(
    popupActions.toggleStorePopup({
      key: 'updatePopup',
      res: {
        open: true,
        version
      }
    })
  );
};

function connectSocket() {
  const ws = new WebSocket(`ws://127.0.0.1:9000`);

  ws.onopen = function () {
    console.log('Connected to the websocket');
    ws.send('we have been connected to the web-socket :)');
  };

  ws.onmessage = function (mes) {
    try {
      if (mes.data.includes('key')) {
        const key = JSON.parse(mes?.data)?.key;
        if (!!key) {
          const payload = JSON.parse(mes?.data)?.payload;

          switch (key) {
            case 'update-available':
              break;
            case 'update-not-available':
              ws.close();
              break;
            case 'update-downloaded':
              handleUpdateDownloaded(payload?.version);
              break;
            default:
              console.log(key);
              break;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  ws.onclose = function (e) {
    console.log(`Socket is closed.`);

    connectSocket();
  };

  ws.onerror = function (err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };
  return ws;
}

export { connectSocket };
