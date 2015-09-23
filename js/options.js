(function() {
  var DEFAULT_SCRIPT = {
    id: null,
    enable: false,
    name: 'Script',
    type: 'snippet',
    src: '',
    code: '',
    host: ''
  };

  var DEFAULT_OPTIONS = {
    exclude: ''
  };
  
  var storageKey = 'SAR';
  
  var vm = new Vue({
    el: '#app',
    data: {
      power: true,
      scripts: [],
      options: {}
    },
    methods: {
      toggleSwitch() {
        this.power = !this.power;
        this.save();
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
        if (window.confirm('Are you sure you want to delete?')) {
          this.scripts.$remove(index);
        }
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
        this.save();
      },
      _save() {
        return _.debounce(function() {
          this._setStorage(this.$data);
        }.bind(this), 300);
      },
      onKeyup() {
        this.save();
      },
      onBlur() {
        this.save();
      },
      _setStorage(data) {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
      },
      _loadScripts() {
        var data =  JSON.parse(window.localStorage.getItem(storageKey));
        this.$set('power', data.power);
        this.$set('scripts', data.scripts);
        if (!data.options) {
          this.$set('options', DEFAULT_OPTIONS);
        }
        else {
          this.$set('options', data.options);
        }
      },
      _init() {
        var data = window.localStorage.getItem('SRA');
        var newData = window.localStorage.getItem(storageKey);
        
        if (!newData) {
          if (data) {
            this._setStorage(JSON.parse(data));
            window.localStorage.removeItem('SRA');
          }
          else {
            this._setStorage({power: true, scripts: [], options: DEFAULT_OPTIONS});
          }
        }
        else {
          if (data) {
            window.localStorage.removeItem('SRA');
          }
        }
      },
      toggleSetting() {
        if (_.includes(this.$els.setting.classList, 'show')) {
          this.$els.setting.classList.remove('show');
        }
        else {
          this.$els.setting.classList.add('show');
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
        this._setStorage(this.$data);
      });
    }
  });
  
})();
