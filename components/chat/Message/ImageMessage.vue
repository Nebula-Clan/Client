<template>
    <v-container>
        <v-img :eager="true" :max-height="maxHeight" :max-width="maxWidth" :src="imageSrc" :lazy-src="preSrc" contain>
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
    </v-container>
</template>

<script>
import { duration } from './utils/recorder'

export default {
    props: {
        imageSrc: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            audio: null,
            isPlaying: false,
            audioTime: 1,
            playedSoFar: 0,
            preSrc: null,
            maxHeight: 300,
            maxWidth: 300
        }
    },
    created() {
        this.preSrc = this.getEmptyImageUrl()
    },
    computed: {
        valueOfProgressBar() {
            return (this.playedSoFar / this.audioTime)
        }
    },
    methods: {
        getEmptyImageUrl() {
            let canvas = document.createElement("canvas")
            canvas.width = this.maxWidth
            canvas.height = this.maxWidth

            return canvas.toDataURL()
        }
    }
}
</script>

<style scoped>

</style>