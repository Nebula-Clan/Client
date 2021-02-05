<template>
  <v-container fluid class="index-page ma-0 pa-0">
    <v-container  fluid>
      <IntroBanner />
    </v-container>
    <v-container  fluid>
      <Row2 />
    </v-container>
    <v-container  fluid>
      <CommunityPresent />
    </v-container>
    <v-container  fluid>
      <DirectChatPresent />
    </v-container>
    <v-container  fluid>
      <ChatRoomPresent />
    </v-container>
    <v-container  fluid>
      <CategoryPresent />
    </v-container>
    <v-container  fluid>
      <Row5 />
    </v-container>
    <v-container  fluid>
      <SignUpRow />
    </v-container>
  </v-container>
</template>

<script>
import IntroBanner from "@/components/index/Intro-banner"
import Row2 from "@/components/index/Row-2"
import CommunityPresent from "@/components/index/CommunityPresent"
import DirectChatPresent from "@/components/index/DirectChatPresent"
import Row5 from "@/components/index/Row-5"
import Feature from "@/components/index/Feature";
import SignUpRow from "@/components/index/SignUpRow";
import ChatRoomPresent from "@/components/index/ChatRoomPresent";
import CategoryPresent from "@/components/index/CategoryPresent";
export default {
  name: "index",
  components: {
    IntroBanner,
    Row2,
    CommunityPresent,
    DirectChatPresent,
    Row5,
    Feature,
    SignUpRow,
    ChatRoomPresent,
    CategoryPresent
  },
  auth: false
}
</script>

<style lang="scss" scoped>
  .index-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    .container {
      padding: 0;
      margin: 0;
    }
  }
</style>
