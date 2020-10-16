<template>
  <v-row>
    <v-card>
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover>
        <v-carousel-item
          v-for="(image, i) in images"
          :key="i">
          <img width="100%" :src="image" alt="">
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    images: [
      '/b1.jpg',
      '/b2.jpg',
      '/b3.jpg'
    ]
  })
}
</script>

<style scoped>
</style>
