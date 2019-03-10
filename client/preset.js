const Vue = require('vue');

class Preset {

  constructor(component, ctx, {comments, userInfo, target, events}){
   
    this.ctx = ctx;
    this.component = component;
    this.events = events;
    this.comments = comments;
    this.userInfo = userInfo;
    this.target = target;
    
  }

  render(){
    this.instance = new Vue({
      el: this.target,
      data: {
        comments,
        userInfo,
      },
      methods: events,
      render: h => h(this.component)
    });
  }

}
