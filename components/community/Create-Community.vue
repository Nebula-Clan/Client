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
        <v-form v-model="formValid"
                style="width: 100%"
                @submit.prevent="submit">
          <v-col cols="12">
            <v-text-field
              v-model="body.name"
              :rules="nameRules"
              counter
              label="Name"
              outlined>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="body.about"
              auto-grow
              counter
              label="Description"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="body.picture"
              accept="image/png, image/jpeg, image/bmp"
              label="Select logo"
              outlined
              prepend-icon="mdi-camera"
              show-size
              truncate-length="30">
            </v-file-input>
            <v-file-input
              v-model="body.banner_picture"
              accept="image/png, image/jpeg, image/bmp"
              label="Select banner"
              outlined
              prepend-icon="mdi-camera"
              show-size
              truncate-length="30">
            </v-file-input>
          </v-col>
        </v-form>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        outlined
        text
        @click="close()">
        Close
      </v-btn>
      <v-btn
        color="primary"
        outlined
        text
        type="submit"
        @click="submit">
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
          this.$axios.post(`api/community/join_community?name=${this.body.name}`).then(
            () => {
              this.$emit('userState');
              this.loading = !this.loading;
            }).catch(
            error => this.$notifier.showMessage({content: error.response.data.error.message, color: 'error'}))
            .finally(
            () => this.$emit('close'));
        }).catch(
        error => {
          this.$notifier.showMessage({content: error.response.data.error.message, color: 'error'})
          console.log(error.response.data);
        });
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>
