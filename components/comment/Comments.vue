<template>
  <div class="comments">
    <Comment :comment="c.comment" :replies="c.replies" v-for="c in root"/>
  </div>
</template>

<script>

export default {
  name: "Comments",
  components: {Comment: () => import('@/components/comment/Comment')},
  props: ['root']
}
</script>

<style scoped lang="scss">

.comments {
  margin: 0em 0em 0.5em 1em;
  border-left: $color-comment-reply-line solid 0.1em;
  padding: 1em 0em 1em 1em;
}

.comments:before {
  position: absolute;
  top: 0px;
  left: 0px;
}

</style>
