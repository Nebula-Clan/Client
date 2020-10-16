<template>
  <v-row >
    <v-card width="100%">
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover>
        <v-carousel-item
          v-for="(image, i) in colors"
          :key="i">
          <v-sheet
            :color="colors[i]"
            height="100%">
            <v-row
              class="fill-height"
              align="center"
              justify="center">
              <div class="display-3">
                Slide {{ i + 1 }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
  })
}
</script>

<style scoped>
</style>
