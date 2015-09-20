(function() {
  var DEFAULT_SCRIPT = {
    enable: true,
    name: 'snippet',
    type: 'snippet',
    src: '',
    code: '',
    host: 'any'
  };
  
  var vm = new Vue({
    el: '#app',
    data: {
      scripts: []
    },
    ready() {
      this.scripts = JSON.parse(localStorage.getItem('SRA'));
    }
  });
  console.log(localStorage.getItem('SRA'))
})();
