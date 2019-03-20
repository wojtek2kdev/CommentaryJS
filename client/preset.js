import Vue from 'vue';
import Vuex from 'vuex';

export default class Preset {

  constructor(component, ctx){
   
    this.ctx = ctx;
    this.component = component;

    Vue.use(Vuex);

    this.store = new Vuex.Store({
      state: {
        events: {
          newComment: this.ctx.events.newComment,
        },
        comments: this.ctx.comments,
        user: this.ctx.user,
      },
      mutations: {
        appendComment: (state, comment) => state.comments.push(comment),
        updateComment: (state, comment) => {

        },
      },
      actions: {
        sender: (context, options) => this.ctx.sender(options),
        receiver: (context, which) => this.ctx.receiver(context, which),
      }
    });
    
  }

  render(){
    this.instance = new Vue({
      store: this.store,
      el: this.ctx.objective, 
      render: h => h(this.component),
      created: () => this.ctx.channelConnect()
    });
  }

}
