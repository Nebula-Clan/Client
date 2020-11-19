<template>
    <carousel class="slider" :perPageCustom="[[480,4]]">
      <Slide class="pa-2" :key="i" v-for="i in [1,2,3,4,5,6,7]">
        <v-card
          class="secondary"
          style="height: 200px;">
          <v-card-text>
            {{data[0]}}
          </v-card-text>
        </v-card>
      </Slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: "Feature",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      data: [
        'By this feature you can connect with your friends and do a lot of fun.'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  width: 70%;
}
</style>
