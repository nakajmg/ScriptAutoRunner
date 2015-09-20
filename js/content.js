chrome.runtime.sendMessage({method: "SARgetLocalStorage", key: "SAR"}, (response)=> {

  function runScript(script) {
    var tag = document.createElement('script');
    
    if (script.type === 'snippet') {
      tag.innerHTML = script.code;
    }
    if (script.type === 'external') {
      tag.src = script.src;
    }
    document.body.appendChild(tag);
  }
  
  var scripts = JSON.parse(response.scripts);
  
  scripts.forEach((script) =>{
    if (script.enable) {
      runScript(script);
    }
  });
});
