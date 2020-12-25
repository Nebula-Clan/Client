<template>
    <v-container>
        <v-progress-circular
            :rotate="360"
            :size="50"
            :width="6"
            :value="valueOfProgressBar"
            color="primary"
            >
            <v-icon @click="playOrStop"> mdi-play </v-icon>
        </v-progress-circular>
            <div class="d-inline-flex ml-2">
                {{ playedSoFar }} / {{ audioTime }}
            </div>
    </v-container>
</template>

<script>
import { duration } from './utils/recorder'

export default {
    props: {
        audioUrl: {
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
        this.audio = new Audio(this.audioUrl);
        duration(this.audioUrl).then((audioTime) => this.audioTime = audioTime)
    },
    methods: {
        playOrStop() {
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