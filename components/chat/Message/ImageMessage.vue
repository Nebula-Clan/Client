<template>
    <v-container>
        <v-img max-height="300" max-width="300" :src="imageSrc" contain>
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
        }
    },
    computed: {
        valueOfProgressBar() {
            return (this.playedSoFar / this.audioTime)
        }
    },
    mounted() {

        // duration(this.audioUrl).then((audioTime) => this.audioTime = audioTime)
    },
    methods: {
        playOrStop() {
            console.log(this.audio)
            if (this.isPlaying) {
                this.audio.pause()
                this.isPlaying = false
            } else {
                this.audio.play()
                this.isPlaying = true
            }
        },
        openFile(event) {
            var input = event.target;

            let reader = new FileReader();

            reader.readAsArrayBuffer(input.files[0])
            console.log(input.files[0])

            reader.onload = (e) => {
                let blob = new Blob([new Uint8Array(e.target.result)])
                this.audio = new Audio(URL.createObjectURL(blob))
                console.log(this.audio)
                duration(URL.createObjectURL(blob)).then((audioTime) => this.audioTime = audioTime)
            }
            reader.onerror = function(e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>

</style>