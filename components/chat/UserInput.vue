<template>
  <v-row no-gutters class="back">
    <v-col cols="12" class="px-0">
      <v-textarea class="mx-0" style="border-top: 1px solid gray;border-radius:0px" auto-grow rows="1"
       hide-details flat solo placeholder="Send message ...">
      </v-textarea>
    </v-col>
    <v-col cols="12" class="px-3 d-flex mb-2">
      <v-icon slot="prepend-inner" class="mr-auto" style="filter: contrast(50%);">
        mdi-attachment
      </v-icon>
      <EmojiIcon slot="append" class="ml-auto" />
      <v-icon slot="append" class="ml-3" color="green darken-2">
        mdi-send-outline
      </v-icon>
    </v-col>
  </v-row>
</template>

// <v-col cols="12" class="px-0">
//       <v-textarea class="mx-1" auto-grow rows="1" hide-details>

//       </v-textarea>
//     </v-col>
//     <v-col cols="12">
      // <v-icon slot="prepend-inner" class="mr-auto">
      //     mdi-attachment
      // </v-icon>
      // <EmojiIcon slot="append" class="ml-auto" />
      // <v-icon slot="append" class="ml-6">
      //   mdi-send-outline
      // </v-icon>
//     </v-col>
<script>
import EmojiIcon from './icons-utils/EmojiIcon'
import FileIcons from './icons-utils/FileIcons'
import UserInputButton from './UserInputButton.vue'
import Suggestions from './Suggestions.vue'
import FileIcon from './assets/file.svg'
import CloseIconSvg from './assets/close.svg'
import IconCross from './icons-utils/icons/IconCross'
import IconOk from './icons-utils/icons/IconOk.vue'
import IconSend from './icons-utils/icons/IconSend.vue'
import store from './store/'

export default {
  components: {
    EmojiIcon,
    FileIcons,
    UserInputButton,
    Suggestions,
    IconCross,
    IconOk,
    IconSend
  },
  data() {
    return {
      file: null,
      inputActive: false,
      showEmoji: false,
      showFile: true
    }
  },
  computed: {
    editMessageId() {
      return this.isEditing && store.state.editMessage.id
    },
    isEditing() {
      return false
    }
  },
  watch: {
    editMessageId(m) {
      if (store.state.editMessage != null && store.state.editMessage != undefined) {
        this.$refs.userInput.focus()
        this.$refs.userInput.textContent = store.state.editMessage.data.text
      } else {
        this.$refs.userInput.textContent = ''
      }
    }
  },
  mounted() {
    this.$root.$on('focusUserInput', () => {
      if (this.$refs.userInput) {
        this.focusUserInput()
      }
    })
  },
  methods: {
    cancelFile() {
      this.file = null
    },
    setInputActive(onoff) {
      this.inputActive = onoff
    },
    handleKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        if (!this.isEditing) {
          this._submitText(event)
        } else {
          this._editText(event)
        }
        this._editFinish()
        event.preventDefault()
      } else if (event.keyCode === 27) {
        this._editFinish()
        event.preventDefault()
      }

      this.$emit('onType')
    },
    focusUserInput() {
      this.$nextTick(() => {
        this.$refs.userInput.focus()
      })
    },
    _submitSuggestion(suggestion) {
      this.onSubmit({author: 'me', type: 'text', data: {text: suggestion}})
    },
    _checkSubmitSuccess(success) {
      if (Promise !== undefined) {
        Promise.resolve(success).then(
          function (wasSuccessful) {
            if (wasSuccessful === undefined || wasSuccessful) {
              this.file = null
              this.$refs.userInput.innerHTML = ''
            }
          }.bind(this)
        )
      } else {
        this.file = null
        this.$refs.userInput.innerHTML = ''
      }
    },
    _submitText(event) {
      const text = this.$refs.userInput.textContent
      const file = this.file
      if (file) {
        this._submitTextWhenFile(event, text, file)
      } else {
        if (text && text.length > 0) {
          this._checkSubmitSuccess(
            this.onSubmit({
              author: 'me',
              type: 'text',
              data: {text}
            })
          )
        }
      }
    },
    _submitTextWhenFile(event, text, file) {
      if (text && text.length > 0) {
        this._checkSubmitSuccess(
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: {text, file}
          })
        )
      } else {
        this._checkSubmitSuccess(
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: {file}
          })
        )
      }
    },
    _editText(event) {
      const text = this.$refs.userInput.textContent
      if (text && text.length) {
        this.$emit('edit', {
          author: 'me',
          type: 'text',
          id: store.state.editMessage.id,
          data: {text}
        })
        this._editFinish()
      }
    },
    _handleEmojiPicked(emoji) {
      this._checkSubmitSuccess(
        this.onSubmit({
          author: 'me',
          type: 'emoji',
          data: {emoji}
        })
      )
    },
    _handleFileSubmit(file) {
      this.file = file
    },
    _editFinish() {
      store.setState('editMessage', null)
    }
  }
}
</script>

<style scoped>

.back {
  background-color: #1E1E1E;
}

.sc-user-input {
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.sc-user-input--text {
  width: 300px;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 200px;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  /* color: rgba(86, 88, 103, 0.3); */
  filter: contrast(15%);
  outline: none;
  cursor: text;
}

.sc-user-input--buttons {
  width: 100px;
  position: absolute;
  right: 30px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

.sc-user-input--button:first-of-type {
  width: 40px;
}

.sc-user-input--button {
  width: 30px;
  height: 55px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-input--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-user-input--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--button input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
}

.delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
}
</style>
