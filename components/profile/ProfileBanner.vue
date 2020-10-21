<template>
    <v-container fluid>
        <v-row>
            <v-img src="/images/Back.jpg" max-height="450">

            </v-img> 
        </v-row>
        <v-row class="ml-15" style="position:absolute;z-index:3;margin-top:-100px;">
            <v-avatar size="180">
                <v-img src="/images/LL.jpg" alt="John">
                </v-img>
            </v-avatar>
        </v-row>
        <v-row>
            <v-container fluid class="pa-0">
                <div style="background-color:#12232E">
                    <v-container class="pa-0">
                        <v-row justify="center" align="center">
                            <v-col md="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Posts
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    10k
                                </p>
                            </v-col>
                            <v-col md="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Following
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    10k
                                </p>
                            </v-col>
                            <v-col md="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Followers
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    10k
                                </p>
                            </v-col>
                            <v-col md="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Likes
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    10k
                                </p>
                            </v-col>
                            <v-col md="2" class="pa-2">
                                <p class="text-center mb-0 text--secondary">
                                    Comments
                                </p>
                                <p class="text-center mb-0 text--secondary">
                                    10k
                                </p>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.avatar {
    position:absolute;
    z-index:3;
    margin-top:340px;
}
</style>