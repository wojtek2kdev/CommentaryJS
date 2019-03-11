const Vue = require('vue');
const Vuex = require('vuex');

class Preset {

  constructor(component, ctx){
   
    this.ctx = ctx;
    this.component = component;

    Vue.use(Vuex);

    this.store = new Vuex.Store({
      state: {
        comments: this.ctx.comments,
        user: this.ctx.user,
      },
      actions: {
        receivers: this.ctx.events.receivers,
        senders: this.ctx.events.senders,
      }
    });
    
  }

  render(){
    this.instance = new Vue({
      store: this.store,
      el: this.target,
      render: h => h(this.component)
    });
  }

}
