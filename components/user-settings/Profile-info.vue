<template>
  <v-form v-model="formValid" @submit.prevent="setProfile">
    <v-row>
      <v-col>
        <section v-if="pageLoaded" class="images">
          <div class="banner">
            <img
              v-if="bannerImage !== null"
              :src="bannerImage"
              alt="banner-img"
              class="banner-img rounded"
            />
            <img
              src="@/static/images/login-background.jpg"
              v-if="bannerImage === null"
              alt="banner-img"
              class="banner-img rounded"
            />
            <div
              class="overlay-banner rounded d-flex justify-center align-center"
            >
              <v-btn color="primary" icon @click="changeImage('banner-img')">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </div>
          </div>

          <div class="profile">
            <v-avatar class="profile-img" size="150">
              <img
                :alt="$auth.user.username"
                v-if="profileImage !== null"
                :src="profileImage"
              />
              <UserAvatar
                size="150px"
                v-if="profileImage === null"
                color="purple"
                :avatar-string="$auth.user.username"
              />
            </v-avatar>
            <div class="overlay-profile d-flex justify-center align-center">
              <v-btn color="primary" icon @click="changeImage('profile-img')">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </div>
          </div>
        </section>
        <ProfileInfoLoader v-if="!pageLoaded" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-file-input
          id="profile-img"
          v-model="profile.profile_picture"
          accept="image/png, image/jpeg, image/bmp"
          outlined
          style="display: none"
          truncate-length="30"
          @change="changed('profile_picture', $event)"
        >
        </v-file-input>
        <v-file-input
          id="banner-img"
          v-model="profile.banner_picture"
          accept="image/png, image/jpeg, image/bmp"
          outlined
          style="display: none"
          truncate-length="30"
          @change="changed('banner_picture', $event)"
        >
        </v-file-input>
        <v-text-field
          v-model="profile.username"
          :rules="rules"
          counter
          label="Username"
          outlined
          @keydown="changed('username')"
        >
        </v-text-field>
        <v-text-field
          v-model="profile.first_name"
          :rules="rules"
          counter
          label="First Name"
          outlined
          @keydown="changed('first_name')"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="profile.last_name"
          :rules="rules"
          counter
          label="Last Name"
          outlined
          @keydown="changed('last_name')"
        >
        </v-text-field>
        <v-textarea
          v-model="profile.biology"
          auto-grow
          counter
          label="Bio"
          outlined
          rows="1"
          @keydown="changed('bio')"
        >
        </v-textarea>
      </v-col>
      <v-col class="text-right" cols="12">
        <v-btn
          :disabled="changedFields.length === 0 || !formValid"
          :loading="loading"
          color="accent"
          outlined
          type="submit"
        >
          Apply changes
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import UserAvatar from "~/components/shared/UserAvatar";
import ProfileInfoLoader from "~/components/user-settings/Profile-Info-Loader";

export default {
  name: "ProfileInfo",
  components: { ProfileInfoLoader, UserAvatar },
  data() {
    return {
      pageLoaded: false,
      formValid: false,
      loading: false,
      changedFields: [],
      profileImage: null,
      bannerImage: null,
      profile: {
        username: "",
        first_name: "",
        last_name: "",
        biology: "",
        profile_picture: "",
        banner_picture: "",
      },
      rules: [
        (t) => !!t || "This field cannot be empty",
        (t) =>
          t.length >= 4 || "This field must be at least 4 characters or more",
      ],
    };
  },
  methods: {
    getProfile: function () {
      this.pageLoaded = false;
      this.$axios
        .get("/api/profile/public", {
          params: {
            username: this.$auth.user.username,
          },
        })
        .then((response) => {
          this.profile = response.data;
          if (response.data["profile_picture"]) {
            this.profileImage =
              this.$axios.defaults.baseURL + response.data["profile_picture"];
          }
          if (response.data["banner_picture"]) {
            this.bannerImage =
              this.$axios.defaults.baseURL + response.data["banner_picture"];
          }
          this.changedFields = [];
          this.pageLoaded = true;
        })
        .catch();
    },
    setProfile: function () {
      this.loading = true;
      const formData = new FormData();
      if (this.changedFields.includes("username")) {
        formData.append("username", this.profile.username);
      }
      if (this.changedFields.includes("first_name")) {
        formData.append("first_name", this.profile.first_name);
      }
      if (this.changedFields.includes("last_name")) {
        formData.append("last_name", this.profile.last_name);
      }
      if (this.changedFields.includes("bio")) {
        formData.append("biology", this.profile.biology);
      }
      if (this.changedFields.includes("profile_picture")) {
        formData.append("profile_picture", this.profile.profile_picture);
      }
      if (this.changedFields.includes("banner_picture")) {
        formData.append("banner_picture", this.profile.banner_picture);
      }
      this.$axios
        .put("api/profile/update_profile", formData)
        .then(() =>
          this["$notifier"].showMessage({
            content: "Profile updated successfully",
            color: "success",
          })
        )
        .catch((error) =>
          this["$notifier"].showMessage({
            content: error.response.data["error"]["message"],
            color: "error",
          })
        )
        .finally(() => {
          this.loading = false;
          this.$auth.fetchUser();
        });
    },
    changed: function (field, file = null) {
      this.changedFields.push(field);
      if (field === "banner_picture") {
        this.bannerImage = URL.createObjectURL(file);
      } else if (field === "profile_picture") {
        this.profileImage = URL.createObjectURL(file);
      }
    },
    changeImage: function (field) {
      document.getElementById(field).click();
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>

<style lang="scss" scoped>
.images {
  position: relative;
  text-align: center;
  margin-bottom: 100px;

  .banner {
    width: 100%;
    height: 300px;

    .banner-img {
      width: 100%;
      height: 300px;
      border: 0.5px solid #4b4b4b;
    }
  }

  .overlay-banner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.3s ease;
  }

  .profile {
    position: relative;
    width: 100%;

    .profile-img {
      position: absolute;
      bottom: -75px;
      left: calc(50% - 75px);
      border: 0.5px solid #4b4b4b;
    }

    .overlay-profile {
      //margin: 8px;
      position: absolute;
      bottom: -75px;
      left: calc(50% - 75px);
      border-radius: 50%;
      width: 150px;
      height: 150px;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: 0.3s ease;
    }
  }

  .profile:hover .overlay-profile {
    opacity: 1;
  }
}

.banner:hover .overlay-banner {
  opacity: 1;
}
</style>
