<template>
  <v-app>
    <v-content class="adv">
      <v-row>
        <v-card>
          <v-carousel v-model="model">
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
            >
              <img :src="image" height="600" width="480">
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'login-layout',
  data: () => {
    return {
      model: 0,
      images: [
        '/b1.jpg',
        '/b2.jpg',
        '/b3.jpg'
      ]
    }
  }
}
</script>

<style scoped>
  .adv {
    height: 600px;
  }
</style>
