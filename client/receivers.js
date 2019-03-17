export const newComment = () => {
  return {
    name: 'appendComment',
    action: (ctx, data, ...pipelines) => ctx.commit('appendComment', pipelines.reduce((val, pipe) => val = pipe(val), data))
  }
}

