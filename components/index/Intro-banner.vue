<template>
  <v-container class="banner pa-0 white--text" fluid>
    <v-container class="overlay pa-0" fluid>
      <v-container class="content" fluid>
        <h1
          data-aos="zoom-in"
          class="primary--text">Huddle</h1>
        <h2
          data-aos="zoom-in">
          You're in the right place</h2>
        <div class="actions mt-10">
          <v-btn outlined
                 to="/signup"
                 x-large
                 class="mr-4"
                 color="accent">
            Sign up
          </v-btn>
          <v-btn outlined
                 to="/login"
                 x-large
                 color="primary">
            Sign in
          </v-btn>
        </div>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "IntroBanner"
}
</script>

<style lang="scss" scoped>
  .banner {
    background-image: url("../../static/landing/row-1.jpg");
    background-size: cover;
    height: calc(100vh - 64px);
    width: 100%;
    .overlay {
      background-color: rgba(0, 0, 0, .5);
      width: 100%;
      height: 100%;
      .content {
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
          font-size: 60px;
          font-weight: 200;
          letter-spacing: 4px;
        }
        h2 {
          letter-spacing: 4px;
          font-size: 60px;
          font-weight: 100;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    .banner {
      .overlay {
        .content {
          h1 {
            font-size: xx-large;
          }
          h2 {
            font-size: x-large;
          }
        }
      }
    }
  }
</style>
