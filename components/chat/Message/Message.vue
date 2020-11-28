<template>
    <div :class="[getClass, 'd-inline-flex']">
        <Avatar v-if="!isUser && previousId != currentId"
                class="avatar mt-5 ml-4" 
                :substituteChar="'K'" 
                :avatarUrl="'/images/LL1.jpg'"
                :timeOut="12000" 
                :avatarSize="35" 
                :textSize="5" />
        <v-card max-width="350" elevation="3" :class="['card-back', 'text--secondary', 'pa-3', 'card-border', getTriangleClass]">
            <v-card-text :class="getText">
                {{ message }}
            </v-card-text>
            <v-card-actions class="pa-0">
            <v-icon v-if="isUser" color="blue-grey darken-1" class="ml-auto" size="16" style="filter: contrast(20%);">
                {{ getMessgaeStatusicon() }}
            </v-icon>
            </v-card-actions>
        </v-card>
    </div>
</template>


<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        previousId: {
            type: Number,
            required: true
        },
        currentId: {
            type: Number,
            required: true
        },
        isUser: {
            type: Boolean,
            required: true
        },
        isSeen: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            random: false
        }
    },
    computed: {
        getClass() {
            if (this.isUser) {
                return 'ml-auto mr-2'
            } else {
                return 'mr-auto ml-2'
            }
        },
        getText() {
            if (this.isUser) {
                return 'pa-0 mr-8 green--text text--lighten-1'
            } else {
                return 'pa-0 mr-8'
            }
        },
        getTriangleClass() {
            if (this.previousId != this.currentId) {
                if (this.isUser) {
                    return 'right mr-7'
                } else {
                    return 'left ml-3'
                }
            } else {
                if (this.isUser) {
                    return 'mr-7'
                } else {
                    return 'ml-16'
                }
            }
        }
    },
    methods: {
        getMessgaeStatusicon() {
            if (this.isSeen) {
                return 'mdi-email'
            } else {
                return 'mdi-email-open'
            }
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