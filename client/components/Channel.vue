<template>
  <ul>
    <li v-for="comments of comments">
      <p>{{ comments.content }}</p>
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
    },
    created(){

      this.comments = this.$store.state.comments;

      const {
        newComment,
      } = this.$store.state.events;

      this.$store.dispatch('receiver', newComment());

    },
    methods: {
    }
  }
</script>
<style>

</style>
