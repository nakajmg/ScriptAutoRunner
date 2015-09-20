chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'SARgetLocalStorage') {
    var scripts = localStorage.getItem('SRA');
    console.log(scripts);
    sendResponse({scripts: scripts});
  }
  else {
    sendResponse({scripts: []});
  }
});
