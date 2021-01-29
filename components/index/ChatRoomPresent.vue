<template>
  <v-container class="row4 pa-0 white--text" fluid>
    <v-container class="orange darken-2 pa-10 title text-center" cols="12" fluid>
      <h2>We even have chat rooms, wow!</h2>
    </v-container>
    <v-row class="pa-4">
      <v-col
        class="img"
        cols="12"
        md="7">
        <img :src="require('../../static/landing/chatroom.svg')"
             data-aos="fade-in"
             alt="chat"
             class="friends-img"
             height="400px"/>
      </v-col>
      <v-col class="description"
             cols="12"
             md="5">
        <p
          data-aos="fade-up">
          You know, I think chat rooms are awesome, wanna talk more about something with group of people,
          just create a chat room. talk about the post you all liked, explain more and have fun with people around.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChatRoomPresent",
  created() {
  }
}
</script>

<style lang="scss" scoped>
.row4 {
  background-color: #343434;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 100;
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
      border: 1px solid #444444;
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
