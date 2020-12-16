<template>
    <v-avatar :eager="true" :size="avatarSize"
    :style="classForImageError" v-bind="avatarProperty">
        <img :src="avatarSrc"  @load="imageLoaded" @error="emitError"
         :alt="substituteChar" />
    </v-avatar>
</template>


<script>

  //  This component is present avatar logics and functionality
  //  read each property for learn about detail
  //  for better understanding i will present example
  //
  //  example:
  //  <Avatar :substituteChar="{ K }"
  //          :avatarProperty={'tile': true}
  //          :avatarUrl="www.site.com/image.jpg"
  //          :substituteColor="#000000"
  //          :timeOut="12000"
  //          :avatarSize="50"
  //          :textSize="2"
  //          :avatarProperty=""/>
  //
  // in this example if avatarUrl is valid url and has image then this Avatar component trying to load image for 12 second
  // after this time if image not loaded or image or url is broken the char 'K' with text size 'text-h2' will show with
  // background #000000 inside avatar with size 50 and avatar will be tile

  export default { //this component is trigger error signal for when image could not load
    props: {
      // this char show when image could not load
      substituteChar: {
        type: String,
        required: true
      },
      // background color for when image could not load
      substituteColor: {
        type: String,
        required: false,
        default: '#0D47A1'
      },
      // image url for loading avatar if this url invalid or could not load after given timeOut then substitute char will show
      avatarUrl: {
        type: String,
        required: true
      },
      // after passed timeout and if image could not load then show substitute char(Note: beware this prop must be passed as millisecond)
      timeOut: {
        type: Number,
        required: false,
        default: 3000
      },
      // v-avatar property for example {'tile': true}
      avatarProperty: {
        type: Object,
        required: false
      },
      // avatar size(Note:if your avatar is so big you should handle avatar size id different breakpoint this component does not handle size)
      avatarSize: {
        type: Number,
        required: true
      },
      // test size when image could not load(Note: this prop is between 1 and 6)
      textSize: {
        type: Number,
        require: false,
        validator: function (value) {
          return (value >= 1) && (value <= 6)
        }
      }
    },
    data() {
      return {
        isCompleted: false,
        hasError: false,
        showImageByName: false,
        errorTime: null
      }
    },
    mounted() {
      this.errorTime = setTimeout(() => {
        this.hasError = true;
        this.showImageByName = true;
        this.emitError();
      }, this.timeOut)
    },
    computed: {
      avatarSrc() {
        return this.avatarUrl
      },
      classForImageError() {
        if (this.showImageByName) {
          return {
            'background-color': `${this.substituteColor}`
          }
        }
        return ''
      },
      classForError() {
        return `text-h${this.textSize}`;
      }
    },
    methods: {
      imageLoaded(event) {
        if (this.errorTime) {
          clearTimeout(this.errorTime);
          this.hasError = false;
          this.errorTime = null;
        }
      },
      emitError() {
        this.$emit('error')
      }
    }
  }
</script>


<style scoped>

</style>
