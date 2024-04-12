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

  function isMatch(host, regex) {
    if (host === '' || host === 'any') {
      return true;
    }
    
    var hostname = window.location.hostname;
    var hosts, match;
    if (host.indexOf(',') !== -1) {
      hosts = host.split(',');
      match = hosts.some((_host) => {
        let check = false;
        if (regex) {
          var hostTrim = _host.trim();
          const regexExp = `/${hostTrim}/g`;
          check = hostname.match(regexExp);
        }
        else {
          check = hostname.indexOf(_host.trim()) !== -1;
        }
        return check;
      });
    }
    else {
      var hostTrim = host.trim();
      if (regex) {
        const regexExp = `/${hostTrim}/g`;
        match = hostname.match(regexExp);
      }
      else {
        match = hostname.indexOf(hostTrim) !== -1;
      }
    }
    return match;
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
        if(isMatch(script.host, script.regex)) {
          runScript(script);
        }
      }
    });
  }  
});
