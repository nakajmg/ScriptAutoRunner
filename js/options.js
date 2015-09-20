(function() {
  var DEFAULT_SCRIPT = {
    id: null,
    enable: true,
    name: 'script',
    type: 'snippet',
    src: '',
    code: '',
    host: 'any'
  };
  
  vm = new Vue({
    el: '#app',
    data: {
      power: true,
      scripts: []
    },
    methods: {
      toggleSwitch() {
        this.power = !this.power;
      },
      addScript(type) {
        var script = _.extend({}, DEFAULT_SCRIPT);
        var id = this._getAvailableId();
        script.id = id;
        script.type = type;
        script.name += id;
        this.scripts.push(script);
      },
      _getAvailableId() {
        if (this.scripts.length === 0) {
          return 0;
        }
        var numbers = _.map(this.scripts, 'id');
        var num = _.max(numbers);
        
        return num + 1;
      },
      removeScript(index) {
        this.scripts.$remove(index);
      },
      moveUp(index) {
        var script, temp;
        if (index - 1 >= 0) {
          script = this.scripts[index];
          temp = this.scripts[index - 1];
          this.scripts.$set(index - 1, script);
          this.scripts.$set(index, temp);
        }
      },
      moveDown(index) {
        var script, temp;
        if (index + 1 < this.scripts.length) {
          script = this.scripts[index];
          temp = this.scripts[index + 1];
          this.scripts.$set(index + 1, script);
          this.scripts.$set(index, temp);
        }
      },
      togglePower(index) {
        var script = this.scripts[index];
        script.enable = !script.enable;
      },
      _save() {
        return _.debounce(function() {
          this._setStorage(this.scripts);
        }.bind(this), 300);
      },
      onKeyup() {
        this.save();
      },
      onBlur() {
        this._setStorage(this.scripts);
      },
      _setStorage(data) {
        window.localStorage.setItem('SRA', JSON.stringify(data));
      },
      _loadScripts() {
        var data =  JSON.parse(window.localStorage.getItem('SRA'));
        this.$set('scripts', data);
      },
      _init() {
        var data = window.localStorage.getItem('SRA');
        if (!data) {
          this._setStorage([DEFAULT_SCRIPT]);
        }
      }
    },
    created() {
      this._init();
      this._loadScripts();
      this.save = this._save();
    },
    ready() {
      this.$watch('scripts', function(val, oldVal) {
        this._setStorage(this.scripts);
      });
    }
  });
  
})();
