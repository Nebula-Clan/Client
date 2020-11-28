<template>
  <v-container class="row4 pa-0" fluid>
    <v-container class="pa-10 title text-center" cols="12" fluid>
      <h2>Search in different categories, you call it!</h2>
    </v-container>
    <v-row class="pa-4">
      <v-col class="description"
             cols="12"
             md="5">
        <p
          data-aos="fade-up">
          Interested in sports, fashion or maybe food. we have categorized posts for you,
          only click on the desired category and you have a complete list of posts, for example about pizza :D
        </p>
      </v-col>
      <v-col
        class="img"
        cols="12"
        md="7">
        <img :src="require('../../static/landing/category.svg')"
             data-aos="fade-in"
             alt="chat"
             class="friends-img"
             height="400px"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CategoryPresent",
  created() {
  }
}
</script>

<style lang="scss" scoped>
.row4 {
  background-color: #424242;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 100;
  }
  .title {
    background-color: #BF360C;
  }
  .img {
    .friends-img {
      height: 500px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .description {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: x-large;
      font-weight: 100;
      border: 1px solid #636363;
      padding: 20px;
      border-radius: 5px;
      width: 70%;
    }

    .hello {
      animation: fadein 2s;
      -moz-animation: fadein 2s; /* Firefox */
      -webkit-animation: fadein 2s; /* Safari and Chrome */
      -o-animation: fadein 2s; /* Opera */
    }

    @media screen and (max-width: 576px) {
      p {
        width: 100%;
      }
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein { /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein { /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fadein { /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
