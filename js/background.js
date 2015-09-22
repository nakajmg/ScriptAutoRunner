var hostname;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var data = localStorage.getItem('SRA');
  
  if (request.method === 'SARgetLocalStorage') {
    if (data) {
      sendResponse({data: JSON.parse(data)});
    }
    
  }
  else if (request.method === 'SARsetHostName') {
      hostname = request.hostname;
      sendResponse({});
  }
  else if (request.method === 'SARgetHostName') {
      sendResponse({hostname: hostname});
  }
  else {
    sendResponse({data: {
        power: true,
        scripts: []
      }
    });
  }
});
