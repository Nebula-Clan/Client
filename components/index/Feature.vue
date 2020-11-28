<template>
    <carousel class="slider mt-4" :perPageCustom="[[480,3]]">
      <Slide :key="i" v-for="(item, i) in data">
        <v-card class="item">
          <v-card-text>
            {{item}}
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
        `Add hashtags to your posts, search hashtags and let them grow`,
        `Create polls, and see what people are thinking`,
        `Create questions, and choose the best answer`
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  text-align: center;
  width: 60%;
  .item {
    background-color: #3E2723;
    height: 150px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
