<template>
  <ul>
    <li v-for="comment of comments" :key="comment">
      <p>{{ comment.content }}</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'comments',
    data: {
      comments: ['comment1', 'Comment2'],
    }
  }
</script>
<style>

</style>
