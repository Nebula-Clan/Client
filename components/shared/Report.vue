<template>
    <v-container fluid>
        <v-card min-width="400" max-width="400" elevation="24">
            <v-container class="py-0">
                <v-row justify="end" align="end">
                    <v-icon class="ml-auto" @click="cancel">mdi-close</v-icon>
                </v-row>
            </v-container>
            <v-row justify="center" align="center">
                <v-card-title class="text-center">
                    <div>
                        Report this post for:
                    </div>
                </v-card-title>
            </v-row>
            <v-container>
                <v-checkbox v-model="subjects" label="Sexual Content" color="pink lighten-2" value="sexual content" hide-details></v-checkbox>
                <v-checkbox v-model="subjects" label="Racism" color="red" value="racism" hide-details></v-checkbox>
                <v-checkbox v-model="subjects" label="Insult" color="purple accent-3" value="insult" hide-details></v-checkbox>
                <v-checkbox v-model="subjects" label="Violent" color="red darken-2" value="violent" hide-details></v-checkbox>
                <v-checkbox v-model="subjects" label="Other..." color="blue lighten-1" value="other" hide-details></v-checkbox>
            </v-container>
            <v-container>
                <v-textarea
                outlined
                filled
                v-model="description"
                name="input-7-4"
                label="desciption"
                ></v-textarea>
            </v-container>
            <v-card-actions>

                <v-btn color="red lighten-1 ml-3" @click="cancel" outlined>
                    Cancel
                </v-btn>

                <v-btn class="ml-auto mr-3" @click="report" color="teal accent-3" outlined>
                    Report
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        postID: {
            required: true,
            type: Number
        }
    },
    data() {
        return {
            subjects: [],
            description: ''
        }
    },
    methods: {
        ...mapActions('modules/report/report', ['reportPost']),
        cancel() {
            this.$emit('cancel')
        },
        report() {
            this.reportPost({
                postID: this.postID,
                subjects: this.subjects,
                description: this.description
            }).then((status) => {
                this.cancel()
                this.$notifier.showMessage({content: 'Report submited successfully', color: 'success'})
            }).catch((error) => {
                if (error.response.status == 406) {
                    this.$notifier.showMessage({content: 'You cannot report once more', color: 'error'})
                } else {
                    this.$notifier.showMessage({content: 'Something went wrong pleas try again later', color: 'error'})
                }
            })
        },
    }
}
</script>

<style scoped>

</style>