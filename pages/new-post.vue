<template>
  <div class="new-post-page">
    <v-row class="px-10 py-5">
      <v-col cols="2">
        <br>
      </v-col>
      <v-col cols="8">
        <Editor/>
      </v-col>
      <v-col cols="2">
        <br>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Editor from '@/components/post/Editor'

export default {
  name: 'new-post',
  components: { Editor }
}
</script>

<style scoped>
.new-post-page {
  background-color: white;
  height: 100%;
}
</style>
