<template>
  <v-form v-model="isFormValid">
    <v-textarea
      :rules="commentRules"
      outlined
      auto-grow
      counter="500"
      v-model="replayText"
      :label="`Reply the post`"/>
    <div class="pb-2 d-flex flex-row-reverse">
      <v-btn
        outlined
        @click="submitComment({replayText})"
        depressed
        class="mt-2"
        color="primary"
        :loading="isLoadingToSend"
        :disabled="!isFormValid"
        elevation="2">
        Send
      </v-btn>
    </div>
  </v-form>
</template>

<script>
  export default {
    name: "NewComment",
    data: () => ({
      replayText: "",

      isFormValid: false,

      commentRules: [
        p => !!p || 'Type Something',
        p => p.length >= 3 || 'Must be at least 3 characters',
        p => p.length <= 500 || 'Must be lower than 100 characters',
      ],
    }),
    props: ['isLoadingToSend', 'submitComment']
  }
</script>

<style scoped>

</style>
