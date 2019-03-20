const listener = (name) => (ctx) => (...pipelines) => (callback) => {
    return {
      name,
      action: (data) => callback(pipelines.reduce((val, pipe) => val = pipe(val), data)),
    }
}

export const newComment = (...pipelines) => (ctx) => {
  return listener('comment_sent')(ctx)(...pipelines)(data => {
    ctx.commit('appendComment', data);                                                 
  });
}


