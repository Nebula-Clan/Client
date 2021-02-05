<template>
  <v-container
    class="user-list-color ml-0 overflow-y-auto fill-height d-block"
    :style="userListHeight"
  >
    <v-row dense>
      <v-col cols="12">
        <v-container class="py-0 d-inline-flex">
          <p class="text-h4 pl-1 mb-0 text--secondary">Chats</p>
          <v-spacer />
          <nuxt-link class="text-decoration-none" to="/feed">
            <v-btn icon>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </nuxt-link>
        </v-container>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-container class="pb-0">
          <v-text-field
            v-model="searchText"
            hide-details
            prepend-inner-icon="mdi-account-search"
            label="Search pepole"
            single-line
            solo
            dense
            class="search-field"
          />
        </v-container>
      </v-col>
    </v-row>
    <v-row class="top-row flex-grow-1 flex-shrink-1">
      <v-col cols="12" class="pb-0">
        <v-container>
          <template v-for="(profile, index) in getChatList" class="pl-0">
            <component
              :is="getComponent"
              :key="(index + 1) * 23"
              class="pl-0"
              :profile="profile"
              :searchedText="searchText"
              @click.native="loadProfileChat(profile.username)">
            </component>
            <v-divider :key="(index + 1) * 27" class="ml-14 mr-3"></v-divider>
          </template>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Profile from "~/components/chat/Profile";
import SearchResultProfile from "~/components/chat/SearchResultProfile";

import { AuthenticationRequestJson } from "~/store/modules/chat/helper-classes/requestJson/authenticationrequestjson";
import { GetChatUsersRequestJson } from "~/store/modules/chat/helper-classes/requestJson/getchatusersrequestjson";
import { GetUserMessagesRequestJson } from "~/store/modules/chat/helper-classes/requestJson/getusermessagesrequestjson";
import { SendMessageRequestJson } from "~/store/modules/chat/helper-classes/requestJson/sendmessagerequestjson";

import { BaseHandler } from "~/store/modules/chat/helper-classes/handlers/basehandler";
import { AuthenticationResponseHandler } from "~/store/modules/chat/helper-classes/handlers/authenticationhandler";
import { GetUserChatResponseHandler } from "~/store/modules/chat/helper-classes/handlers/getuserchathandler";
import { GetUserMessageResponseHandler } from "~/store/modules/chat/helper-classes/handlers/getusermessageshandler";
import { RecieveMessageHandler } from "~/store/modules/chat/helper-classes/handlers/recievechathandler";

export default {
  data() {
    return {
      n: 10,
      window: {
        width: 0,
        height: 0
      },
      readyState: -1,
      searchText: '',
      switchToSearchMode: false,
      searchReqTimeOut: null,
      timeoutForSearchReq: 2000,
      maxResults: 10
    };
  },
  watch: {
    getProfileList: {
      handler(val, oldval) {
        console.log(val)
      }
    }
  },
  computed: {
    ...mapGetters("modules/chat/chatManager", [
      "getWebSocket",
      "getProfileList"
    ]),
    ...mapGetters("modules/chat/search", [
      "getResults"
    ]),
    userListHeight() {
      return {
        "max-height": this.window.height + "px"
      };
    },
    getChatList() {
      if (this.switchToSearchMode) {
        return this.getResults.slice(0, this.maxResults);
      }
      return this.getProfileList;
    },
    getComponent() {
      if (this.switchToSearchMode) {
        return SearchResultProfile
      }
      return Profile
    }
  },
  watch: {
    getChatList: {
      handler: function(val, oldVal) {
         this.$forceUpdate() 
      },
      deep: true
    },
    searchText: {
      handler: function(val, oldVal) {
        if (val.length > 0) {
          this.setSearthTimeout()
          this.switchToSearchMode = true
        } else {
          this.switchToSearchMode = false
          this.clearSearchTimeout()
        }
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted() {
    this.getWebSocket.AddOnOpenHandler(new BaseHandler(this.onOpenHandler));
    this.getWebSocket.AddOnMessageHandler(
      new GetUserChatResponseHandler(this.onMessageHandler)
    );
    this.getWebSocket.AddOnErrorHandler(new BaseHandler(this.onError));

    console.log(this.getWebSocket);
    this.reqChats();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions("modules/chat/chatManager", ["addProfileToUserList"]),
    ...mapActions("modules/chat/search", ["serachWithUsername"]),
    onError({ data }) {
      console.log(data);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    loadProfileChat(profileUsername) {
      this.$nuxt.$emit("loadProfileChats", profileUsername);
    },
    onOpenHandler(event) {
      this.reqChats();
    },
    onMessageHandler({ data }) {
      data = JSON.parse(data);

      console.log(data);
      data.data.forEach((item, index) => {
        this.addProfileToUserList(item);
      });
    },
    reqChats() {
      if (this.getWebSocket.readyState == 1) {
        let getUserReq = new GetChatUsersRequestJson();
        this.getWebSocket.SendRequest(getUserReq);
      }
    },
    clearSearchTimeout() {
      if (this.searchReqTimeOut !== null) {
        clearTimeout(this.searchReqTimeOut)
        this.searchReqTimeOut = null
      }
    },
    setSearthTimeout() {
      this.clearSearchTimeout()
      this.searchReqTimeOut = setTimeout(() => {
        this.reqForSearch()
      }, this.timeoutForSearchReq)
    },
    reqForSearch() {
      this.serachWithUsername(
        {
          searchText: this.searchText,
          exceptusername: this.$auth.user.username
        })
    }
  }
};
</script>

<style scoped>
.user-list-color {
  /* background-color: #2f3136;
   */
   border-right: 1px solid #797979;
}

.scroll {
  overflow: hidden;
}

.top-row {
  min-height: 0;
}

.search-field {
  background-color: #202023;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #c2c9d2;
}
</style>
