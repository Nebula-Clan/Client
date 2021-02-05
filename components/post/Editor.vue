<template>
  <section class="container-editor">
    <client-only>
      <quill-editor
        style="min-height: 300px"
        @change="$emit('updateEditorContent',content);"
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>
  </section>
</template>

<script>
export default {
  props: ['draft'],
  data () {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
          ]
        }
      }
    }
  },
  methods: {
    onEditorBlur (editor) {
    },
    onEditorFocus (editor) {
    },
    onEditorReady (editor) {
    },
  },
  mounted() {
    this.content = this.draft;
  },
  watch: {
    draft: function (newVal, oldVal) {
      this.content = this.draft;
    }
  }
}
</script>

<style lang="scss" scoped>
.container-editor {
  color: white;
  margin: 0 auto;

  .quill-editor {
    overflow-y: auto;
  }
}
</style>
