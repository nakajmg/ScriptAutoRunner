(function() {
  var DEFAULT_SCRIPT = {
    enable: true,
    name: 'snippet',
    type: 'snippet',
    src: '',
    code: '',
    host: 'any'
  };
  
  vm = new Vue({
    el: '#app',
    data: {
      scripts: null
    },
    methods: {
      addScript: function() {
        var script = _.extend({}, DEFAULT_SCRIPT);
        this.$data.scripts.push(script);
      },
      removeScript: function(index) {
        this.scripts.$remove(index);
      },
      runScript: function(script) {
        var tag = document.createElement('script');
        
        if (script.type === 'snippet') {
          tag.innerHTML = script.code;
        }
        if (script.type === 'external') {
          tag.src = script.src;
        }
        document.body.appendChild(tag);
      },
      moveUp: function(index) {
        var script, temp;
        if (index - 1 >= 0) {
          script = this.scripts[index];
          temp = this.scripts[index - 1];
          this.scripts.$set(index - 1, script);
          this.scripts.$set(index, temp);
        }
      },
      moveDown: function(index) {
        var script, temp;
        if (index + 1 < this.scripts.length) {
          script = this.scripts[index];
          temp = this.scripts[index + 1];
          this.scripts.$set(index + 1, script);
          this.scripts.$set(index, temp);
        }
      },
      _save: function() {
        return _.debounce(function() {
          this._setStorage(this.scripts);
        }.bind(this), 300);
      },
      _setStorage: function(data) {
        window.localStorage.setItem('SRA', JSON.stringify(data));
      },
      onKeyup: function() {
        this.save();
      },
      onBlur: function() {
        this._setStorage(this.scripts);
      },
      _load: function() {
        var data =  JSON.parse(window.localStorage.getItem('SRA') || '[]');
        this.$set('scripts', data);
      }
    },
    created: function() {
      this._load();
      this.save = this._save();
    },
    ready: function() {
      this.$watch('scripts', function(val, oldVal) {
        this._setStorage(this.scripts);
      });
      
      this.scripts.forEach(function(script) {
        if (script.enable) {
          this.runScript(script);
        }
      }, this);
    }
  });
  
})();
