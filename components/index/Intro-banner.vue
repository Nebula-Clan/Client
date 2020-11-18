<template>
  <div class="banner">
    <div class="overlay">
      <div class="content">
        <h1 class="primary--text">Huddle</h1>
        <h2>You're in the right place</h2>
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
      </div>
    </div>
  </div>
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
</style>
