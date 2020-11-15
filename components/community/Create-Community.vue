<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">
        mdi-plus
      </v-icon>
      Create Community
    </v-card-title>
    <v-card-text>
        <v-row>
          <v-form style="width: 100%"
                  v-model="formValid"
                  @submit.prevent="submit">
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="body.name"
                :rules="nameRules"
                counter
                label="Name">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                v-model="body.about"
                counter
                auto-grow
                label="Description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                outlined
                accept="image/png, image/jpeg, image/bmp"
                v-model="body.picture"
                show-size
                prepend-icon="mdi-camera"
                label="Select logo"
                truncate-length="30">
              </v-file-input>
              <v-file-input
                outlined
                accept="image/png, image/jpeg, image/bmp"
                v-model="body.banner_picture"
                show-size
                prepend-icon="mdi-camera"
                label="Select banner"
                truncate-length="30">
              </v-file-input>
            </v-col>
          </v-form>
        </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="error"
        text
        @click="close()">
        Close
      </v-btn>
      <v-btn
        outlined
        color="primary"
        text
        @click="submit"
        type="submit">
        Create
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CreateCommunity",
  data() {
    return {
      formValid: false,
      body: {
        name: '',
        about: '',
        picture: null,
        banner_picture: null
      },
      nameRules: [
        n => !!n || 'This field is required',
        n => n.length >= 4 || 'Name must be at least 4 characters or more'
      ]
    }
  },
  methods: {
    submit() {
      const formData = new FormData()
      formData.append('name', this.body.name);
      formData.append('about', this.body.about);
      formData.append('picture', this.body.picture);
      formData.append('banner_picture', this.body.banner_picture);
      this.$axios.post('api/community/create_community', formData).then(
        () => {
          this.$notifier.showMessage({content: `${this.body.name} Created! Happy writing`, color: 'success'});
          this.$emit('close');
        }
      ).catch(
        e => this.$notifier.showMessage({content: e.message, color: 'error'})
      );
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>
