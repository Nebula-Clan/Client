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
                {{ playedSoFarString }} / {{ audioTimeString }}
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
            intervalForPlaying: null,
            lastTime: null
        }
    },
    computed: {
        valueOfProgressBar() {
            console.log(this.playedSoFar)
            console.log(this.audioTime)
            console.log(parseFloat(this.playedSoFar) / parseFloat(this.audioTime))
            return ((this.playedSoFar / this.audioTime) * 100)
        },
        audioTimeString() {
            if (this.audioTime - Math.floor(this.audioTime) > 0.5) {
                this.audioTime = Math.ceil(this.audioTime)
            } else {
                this.audioTime = Math.floor(this.audioTime)
            }

            return this.secondToString(this.audioTime)
        },
        playedSoFarString() {
            return this.secondToString((this.playedSoFar / 100))
        }
    },
    mounted() {
        this.audio = new Audio(this.audioUrl);
        this.audio.onended = this.clearStatus
        duration(this.audioUrl).then((audioTime) => this.audioTime = audioTime)
    },
    methods: {
        secondToString(time) {
            let minutes = Math.floor(time / 60)
            let seconds = time - minutes * 60

            let minutesPart = ''
            if (minutes < 10) {
                minutesPart = '0' + minutes.toString()
            } else {
                minutesPart = minutes.toString()
            }

            let secondsPart = ''
            if (seconds < 10) {
                secondsPart = '0' + seconds.toString()
            } else {
                secondsPart = seconds.toString()
            }

            return minutesPart + ':' + secondsPart
        },
        playOrStop() {
            if (this.isPlaying) {
                this.audio.pause()
                this.isPlaying = false
                clearInterval(this.intervalForPlaying)
                this.intervalForPlaying = null
            } else {
                this.audio.play()
                this.lastTime = new Date()
                this.isPlaying = true
                this.playedSoFar = 1
                this.intervalForPlaying = setInterval(() => {
                    let nowTime = new Date()
                    this.playedSoFar++
                    this.lastTime = nowTime
                }, 1000)
            }
        },
        clearStatus() {
            if (this.intervalForPlaying !== null) {
                clearInterval(this.intervalForPlaying)
                this.playedSoFar = 0
            }
        }
    }
}
</script>

<style scoped>

</style>