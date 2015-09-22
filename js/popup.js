chrome.runtime.sendMessage({method: "SARgetHostName"}, (response)=> {
  var hostname = response.hostname;
  
  (function() {  
    var vm = new Vue({
      el: '#app',
      data: {
        power: false,
        scripts: []
      },
      ready() {
        var data = JSON.parse(localStorage.getItem('SRA'));
        if (data) {
          this.$set('power', data.power);
          this.$set('scripts', data.scripts);
        }
        else {
          this.$set('power', true);
          this.$set('scripts', []);
        }
      },
      methods: {
        togglePower() {
          this.power = !this.power;
          this.save();
        },
        toggle(index) {
          var script = this.scripts[index];
          script.enable = !script.enable;
          this.save();
        },
        _setStorage(data) {
          window.localStorage.setItem('SRA', JSON.stringify(data));
        },
        save() {
          this._setStorage(this.$data);
        },
        isMatch(host) {
          if (host === '' || host === 'any') {
            return true;
          }
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
        },
        count() {
          var matched = this.scripts.filter((script) => {
            return this.isMatch(script.host);
          });
          return matched.length === 0 ? true : false;
        },
        openOption() {
          var fileName = 'options.html'
          var url = chrome.extension.getURL( fileName );
          chrome.tabs.create({
            url: url
          });
        }
      }
    });
  })();
});
