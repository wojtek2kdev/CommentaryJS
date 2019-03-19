<template>
  <ul>
    <li v-for="comment of comments" :key="comment">
      <p>{{ comment }}</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'comments',
    data(){
      return {
        comments: [],
      }
    }
  }
</script>
<style>

</style>
