chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var storageKey = 'SAR';
  var data = localStorage.getItem(storageKey);
  
  if (request.method === 'SARgetLocalStorage') {
    if (data) {
      sendResponse({data: JSON.parse(data)});
    }
  }
  else {
    sendResponse({data: {
        power: true,
        scripts: [],
        options: {
          exclude: ''
        }
      }
    });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.browserAction.setPopup({
    'popup': 'popup.html'
  });
});
