<template>
    <v-avatar :eager="true" :size="avatarSize"
    :style="classForImageError" v-bind="avatarProperty">
        <v-img v-if="!showImageByName" :src="avatarSrc"
         :eager="true" @load="imageLoaded" @error="emitError">
            <template v-slot:placeholder>
                <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
                >
                <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <p :class="[classForError, 'mt-3']" v-else>
            {{ substituteChar }}
        </p>
    </v-avatar>
</template>


<script>
//this is component is present avatar logics and functionality
//read each property for learn about detail
//for better understanding i will present example
//example:
// <Avatar :substituteChar="{ K }" :avatarProperty={'tile': true} :avatarUrl="www.site.com/image.jpg" :substituteColor="#000000"
//  :timeOut="12000" :avatarSize="50" :textSize="2" :avatarProperty=""/>
//
// in this example if avatarUrl is valid url and has image then this Avatar component trying to load image for 12 second
// after this time if image not loaded or image or url is broken the char 'K' with text size 'text-h2' will show with
// background #000000 inside avatar with size 50 and avatar will be tile

export default { //this component is trigger error signal for when image couldnt load
    props: {
        substituteChar: { //this char show when image couldnt load
            type: String,
            required: true
        },
        substituteColor: { //background color for when image couldnt load
            type: String,
            required: false,
            default: '#0D47A1'
        },
        avatarUrl: { //image url for loading avatar if this url invalid or clouldnt load after given timeOut then substitute char will show
            type: String,
            required: true
        },
        timeOut: { //after passed timeout and if image couldnt load then show substitute char(Note: beware this prop must be passed as milisecond)
            type: Number,
            required: false,
            default: 30000
        },
        avatarProperty: { //v-avatar property for example {'tile': true}
            type: Object,
            required: false
        },
        avatarSize: { //avatar size(Note:if your avatar is so big you should handle avatar size id diffrent breakpoint this component does not handle size)
            type: Number,
            required: true
        },
        textSize: { //test size when image couldnt load(Note: this prop is between 1 and 6)
            type: Number,
            require: false,
            validator: function(value) {
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
            this.hasError = true
            this.showImageByName = true
            this.emitError()
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
            return `text-h${this.textSize}`
        }
    },
    methods: {
        imageLoaded(event) {
            if (this.errorTime) {
                clearTimeout(this.errorTime)
                this.hasError = false
                this.errorTime = null
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