export const newComment = () => {
  return {
    name: 'appendComment',
    action: (ctx, data) => ctx.commit('appendComment', data)
  }
}

