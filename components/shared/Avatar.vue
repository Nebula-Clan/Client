<template>
    <v-avatar :eager="true" :size="avatarSize"
    :style="classForImageError">
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
export default {
    props: {
        substituteChar: {
            type: String,
            required: true
        },
        substituteColor: {
            type: String,
            required: false,
            default: '#0D47A1'
        },
        avatarUrl: {
            type: String,
            required: true
        },
        timeOut: {
            type: Number,
            required: false,
            default: 30000
        },
        avatarProperty: {
            type: Object,
            required: false
        },
        avatarSize: {
            type: Number,
            required: true
        },
        textSize: {
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