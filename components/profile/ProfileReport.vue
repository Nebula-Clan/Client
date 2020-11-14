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
                        Report Jhon for:
                    </div>
                </v-card-title>
            </v-row>
            <v-container>
                <v-checkbox label="Sexual Content" color="pink lighten-2" hide-details></v-checkbox>
                <v-checkbox label="Racism" color="red" value="red lighten-2" hide-details></v-checkbox>
                <v-checkbox label="Insult" color="purple accent-3" value="red" hide-details></v-checkbox>
                <v-checkbox label="Violent" color="red darken-2" value="red" hide-details></v-checkbox>
                <v-checkbox label="Other..." color="blue lighten-1" value="red" hide-details></v-checkbox>
            </v-container>
            <v-container>
                <v-textarea
                filled
                name="input-7-4"
                label="desciption"
                ></v-textarea>
            </v-container>
            <v-card-actions>

                <v-btn color="red lighten-1 ml-3" @click="cancel">
                    Cancel
                </v-btn>

                <v-btn class="ml-auto mr-3" color="teal accent-3">
                    Report
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    methods: {
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped>

</style>