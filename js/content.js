chrome.runtime.sendMessage({method: "SARgetLocalStorage"}, (response) => {

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

  function isMatch(host) {
    if (host === '' || host === 'any') {
      return true;
    }
    
    var hostname = window.location.hostname;
    var hosts, match;
    if (host.indexOf(',') !== -1) {
      hosts = host.split(',');
      match = hosts.some((_host) => {
        return hostname === _host.trim();
      });
    }

    return hostname === host;
  }
  
  function isExcludeHost(host) {
    if (host === '') {
      return false;
    }
    
    var hostname = window.location.hostname;
    var hosts, match;
    if (host.indexOf(',') !== -1) {
      hosts = host.split(',');
      match = hosts.some((_host) => {
        return hostname.indexOf(_host.trim()) !== -1;
      });
      
    }
    else {
      match = hostname.indexOf(host) !== -1;
    }
    
    return match;
  }
  
  var data = response.data;
  
  if (data.options && data.options.exclude) {
    if (isExcludeHost(data.options.exclude)) {
      return false;
    }
  }
  
  if (data.power) {
    data.scripts.forEach((script) => {
      if (script.enable) {
        if(isMatch(script.host)) {
          runScript(script);
        }
      }
    });
  }  
});
