<template>
  <div>
    <Intro
      @userState="getInfo"
      v-if="introData"
      :data="introData"
      :userJoined="isUserJoined"/>
    <v-row class="pa-5">
      <v-col cols="3">
        <About v-if="introData" :name="introData.name" :about="introData.about"/>
      </v-col>
      <v-col>
        <Write v-if="name" :community="name" @posted="getPosts" />
        <br>
        <PostQuickView v-if="posts" :key="post.id" v-for="post in posts" :post="post"/>
      </v-col>
      <v-col cols="3">
        <People v-if="members" :people="members" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Intro from "@/components/community/Header";
import People from "@/components/community/People";
import PostQuickView from '@/components/homepage/Post-quick-view'
import About from "@/components/community/About";
import Write from "@/components/homepage/Write";
export default {
  name: "communityName",
  components: {
    Write,
    About,
    People,
    Intro,
    PostQuickView
  },
  data() {
    return {
      introData: null,
      isUserJoined: false,
      members: null,
      posts: null,
      name: null
    }
  },
  mounted() {
    this.getInfo();
    this.getPosts();
  },
  methods: {
    getInfo() {
      this.name = this.$route.params.community_name;
      this.$axios.get(`api/community/get_community?name=${this.name}&summery=f`)
      .then(
        response => {
          this.introData = {
            id: response.data.community.id,
            name: response.data.community.name,
            logo: response.data.community.picture,
            banner: response.data.community.banner_picture,
            members: response.data.community.members_number,
            since: response.data.community.date_created,
            about: response.data.community.about
          };
          this.members = response.data.community.members;
          const user = this.members.filter(u => u.username === this.$auth.user.username);
          this.isUserJoined = user.length === 1;
          // this.posts = response.data.community.posts
        }
      ).catch(
        error => console.log(error)
      );
    },
    getPosts() {
      this.$axios.get(`api/community/community_posts?name=${this.name}`).then(
        response => this.posts = response.data.posts
      ).catch(
        error => console.log(error)
      );
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
