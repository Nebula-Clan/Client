
<template>
    <v-list-item two-line>
                        <v-list-item-avatar size="50">
                            <v-badge
                                color="teal lighten-2"
                                overlap
                                right
                                bottom
                                dot
                                offset-x="17"
                                offset-y="12"
                            >
                                <v-avatar size="50">
                                    <v-img src="/images/LL1.jpg"></v-img>
                                </v-avatar>
                            </v-badge>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title >Jhon</v-list-item-title>
                            <v-list-item-subtitle class="primary--text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, deserunt!</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon size="14">mdi-pin-outline</v-icon>
                        </v-list-item-action>
                    </v-list-item>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.dot {
  height: 10px;
  width: 10px;
  background-color:#4DB6AC;
  border-radius: 50%;
  display: inline-block;
  margin-left: 32px;
  margin-top: 37px;
  z-index: 10;
}
</style>