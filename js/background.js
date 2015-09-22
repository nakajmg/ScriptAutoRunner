chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var data = localStorage.getItem('SRA');
  
  if (request.method === 'SARgetLocalStorage') {
    if (data) {
      sendResponse({data: JSON.parse(data)});
    }
    
  }
  else {
    sendResponse({data: {
        power: true,
        scripts: []
      }
    });
  }
});
