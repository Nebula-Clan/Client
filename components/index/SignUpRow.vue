<template>
  <v-container fluid class="ma-0 pa-0 layout">
    <div class="overlay">
      <div class="data">
        <h1
          data-aos="fade-in"
          class="primary--text">So, what are you waiting for ?</h1>
        <v-btn x-large
               data-aos="fade-up"
               color="accent"
               outlined
               to="/signup">
          Sign up
        </v-btn>
      </div>
      <span class="cpr">Copyrights reserved by Huddle</span>
    </div>
  </v-container>
</template>

<script>
export default {
name: "SignUpRow"
}
</script>

<style lang="scss" scoped>
.layout {
  background-image: url("../../static/landing/signup-row.jpg");
  background-size: cover;
  height: calc(100vh - 64px);
  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .data {
      text-align: center;
      h1 {
        font-size: 60px;
        margin-bottom: 2rem;
        font-weight: 100;
      }
    }
    .cpr {
      position: absolute;
      bottom: 1rem;
    }
  }
}
</style>
