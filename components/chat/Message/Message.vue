<template>
    <div :class="[getClass, 'd-inline-flex']">
        <Avatar v-if="!message.isSender && previousId != currentId"
                class="avatar mt-5 ml-4" 
                :substituteChar="'K'" 
                :avatarUrl="getProfieImageUrl"
                :timeOut="12000" 
                :avatarSize="35" 
                :textSize="5" />
        <v-card max-width="350" elevation="3" :class="['card-back', 'text--secondary', 'pa-3', 'card-border', getTriangleClass]">
            <v-card-text :class="getText" v-html="getMessage">
            </v-card-text>
            <v-card-actions class="pa-0">
                <div class="mb-0 ml-auto" style="font-size:13px">
                    {{ date() }}
                    <v-icon v-if="message.isSender" color="blue-grey darken-1" class="ml-auto" size="16" style="filter: contrast(20%);">
                        {{ getMessgaeStatusIcon() }}
                    </v-icon>
                </div>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
export default {
    props: {
        profile: {
            type: Object,
            required: false
        },
        message: {
            type: Object,
            required: true
        },
        previousId: {
            type: Number,
            required: false,
            default: 1
        },
        currentId: {
            type: Number,
            required: false,
            default: 1
        }
    },
    data() {
        return {
            random: false
        }
    },
    mounted() {

    },
    computed: {
        getClass() {
            if (this.message.isSender) {
                return 'ml-auto mr-2'
            } else {
                return 'mr-auto ml-2'
            }
        },
        getText() {
            if (this.message.isSender) {
                return 'pa-0 mr-8 green--text text--lighten-1'
            } else {
                return 'pa-0 mr-8'
            }
        },
        getTriangleClass() {
            if (this.previousId != this.currentId) {
                if (this.message.isSender) {
                    return 'right mr-7'
                } else {
                    return 'left ml-3'
                }
            } else {
                if (this.message.isSender) {
                    return 'mr-7'
                } else {
                    return 'ml-16'
                }
            }
        },
        getMessage() {
            let newMessage = this.message.messageBody.replace(/(?:\r\n|\r|\n)/g, '<br>');
            return newMessage
        },
        getProfieImageUrl() {
            if (this.profile != undefined) {
                return this.profile.profileImageUrl
            }

            return '' 
        }
    },
    methods: {
        getMessgaeStatusIcon() {
            if (this.message.isSeen) {
                return 'mdi-email-open'
            } else {
                return 'mdi-email'
            }
        },
        date() {
            let date = new Date(this.message.messageDate)
            return date.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit',
                hour12: false
            });
        }
    }
}
</script>


<style scoped>

.avatar {
    border-radius: 5px;
}

.card-back {
    background-color: #35363a;
}

.unseen-icon {
    filter: contrast(50%);
    position: absolute;
    right:0px;
    bottom: 0px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 5px;
}

.card-border {
    border-radius: 11px;
}

.right {
  
}

.right::after {
  content: '';
  position: absolute;
  visibility: visible;
  top: 37px;
  right: -8px;
  margin-right: -10px;
  border: 10px solid transparent;
  border-left: 10px solid #35363a;
  clear: both;
  /* 35363a */
}

.left {
  
}

.left::after {
  content: '';
  position: absolute;
  visibility: visible;
  top: 30px;
  left: -8px;
  margin-left: -10px;
  border: 10px solid transparent;
  border-right: 10px solid #35363a;
  clear: both;
  /* 35363a */
}
</style>