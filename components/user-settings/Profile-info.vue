<template>
      <v-form @submit.prevent="setProfile">

        <v-row>
          <v-col>
            <section class="images">

              <div class="banner">
                <img alt="banner-img"
                     class="banner rounded"
                     :src="bannerImage">
                <div class="overlay-banner rounded d-flex justify-center align-center">
                  <v-btn
                    @click="changeImage('banner-img')"
                    color="primary"
                    icon>
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </div>
              </div>

              <div class="profile">
                <v-avatar class="ma-2 profile-img"
                          size="150px">
                  <v-img
                    :src="profileImage"
                    alt="profile image">
                  </v-img>
                </v-avatar>
                <div class="overlay-profile d-flex justify-center align-center">
                  <v-btn
                    @click="changeImage('profile-img')"
                    color="primary"
                    icon>
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </section>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input
              id="profile-img"
              v-model="profile.profile_picture"
              accept="image/png, image/jpeg, image/bmp"
              @change="imageChanged('profile', $event)"
              outlined
              style="display: none"
              truncate-length="30">
            </v-file-input>
            <v-file-input
              id="banner-img"
              v-model="profile.banner_picture"
              @change="imageChanged('banner', $event)"
              accept="image/png, image/jpeg, image/bmp"
              outlined
              style="display: none"
              truncate-length="30">
            </v-file-input>
            <v-text-field
              v-model="profile.username"
              @change="detectChanges()"
              counter
              disabled
              label="Username"
              outlined>
            </v-text-field>
            <v-text-field
              v-model="profile.first_name"
              @change="detectChanges()"
              counter
              label="First Name"
              outlined>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="profile.last_name"
              @change="detectChanges()"
              counter
              label="Last Name"
              outlined>
            </v-text-field>
            <v-textarea
              v-model="profile.biology"
              auto-grow
              @change="detectChanges()"
              counter
              rows="1"
              label="Bio"
              outlined>
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              :disabled="!isAnyChanges"
              color="accent"
              outlined>
              Apply changes
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
</template>

<script>
export default {
  name: "ProfileInfo",
  data() {
    return {
      isAnyChanges: false,
      profileImage: null,
      bannerImage: null,
      profile: {
        username: null,
        first_name: null,
        last_name: null,
        biology: null,
        profile_picture: null,
        banner_picture: null,
      },
      copyProfile: {
        username: null,
        first_name: null,
        last_name: null,
        biology: null,
        profile_picture: null,
        banner_picture: null,
      }
    }
  },
  methods: {
    getProfile: function() {
      this.$axios.get('/api/profile/public', {
        params: {
          username: this.$auth.user.username
        }
      }).then(
        response => {
          this.profile = response.data;
          this.copyProfile = Object.assign({}, this.profile);
          this.profileImage = this.$axios.defaults.baseURL + this.profile.profile_picture;
          this.bannerImage = this.$axios.defaults.baseURL + this.profile.banner_picture;
        }
      ).catch();
    },
    setProfile: function() {
      this.$axios.put('api/profile/update_profile', this.profile).then(
        response => console.log(response)
      ).catch();
    },
    detectChanges: function () {
      const originals = JSON.stringify(this.copyProfile);
      const changed = JSON.stringify(this.profile);
      this.isAnyChanges = changed !== originals;
    },
    changeImage: function (field) {
      document.getElementById(field).click();
    },
    imageChanged: function (field, file) {
      if (field === 'banner') {
        this.bannerImage = URL.createObjectURL(file);
      } else if (field === 'profile') {
        this.profileImage = URL.createObjectURL(file);
      }
      this.detectChanges();
    }
  },
  mounted() {
    this.getProfile();
  },
}
</script>

<style lang="scss" scoped>
.images {
  position: relative;
  text-align: center;
  margin-bottom: 100px;
  .banner {
    width: 100%;
    height: 300px;
  }
  .overlay-banner {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: .3s ease;
  }
  .profile {
    position: relative;
    width: 100%;
    .profile-img {
      position: absolute;
      bottom: -75px;
      left: calc(50% - 75px);
    }
    .overlay-profile {
      margin: 8px;
      position: absolute;
      bottom: -75px;
      left: calc(50% - 75px);
      border-radius: 50%;
      width: 150px;
      height: 150px;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: .3s ease;
    }
  }
  .profile:hover .overlay-profile{
    opacity: 1;
  }
}
.banner:hover .overlay-banner{
  opacity: 1;
}
</style>
