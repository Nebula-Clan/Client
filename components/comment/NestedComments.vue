<template>
  <v-card class="pl-5 py-5">
    <div class="ui comments mx-2">
      <Comment :comment="item.comment" :replies="item.replies" v-for="item in root"/>
    </div>
  </v-card>
</template>

<script>
import Comment from "@/components/comment/Comment";

export default {
  name: "NestedComments",
  components: {Comment},
  data: () => ({}),
  props: ['root']
}
</script>

<style scoped>

.ui.comments {
  margin: 1.5em 0em;
  max-width: 650px;
}

.ui.comments:first-child {
  margin-top: 0em;
}

.ui.comments:last-child {
  margin-bottom: 0em;
}

/*--------------
     Comment
---------------*/
.comment {
  position: relative;
  background: none;
  margin: 0.5em 0em 0em;
  padding: 0.5em 0em 0em;
  border: none;
  border-top: none;
  line-height: 1.2;
}

.comment:first-child {
  margin-top: 0em;
  padding-top: 0em;
}

/*--------------------
    Nested Comments
---------------------*/
.comment .comments {
  margin: 0em 0em 0.5em 1em;
  border-left: white solid 1px;
  padding: 1em 0em 1em 1em;
}

.comment .comments:before {
  position: absolute;
  top: 0px;
  left: 0px;
}

.comment .comments .comment {
  border: none;
  border-top: none;
  background: none;
}

/*--------------
     Avatar
---------------*/
.comment .avatar {
  display: block;
  width: 2.5em;
  height: auto;
  float: left;
  margin: 0.2em 0em 0em;
}

.comment img.avatar,
.comment .avatar img {
  display: block;
  margin: 0em auto;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
}

/*--------------
     Content
---------------*/
.comment > .content {
  display: block;
}

/* If there is an avatar move content over */
.comment > .avatar ~ .content {
  margin-left: 3.5em;
}

/*--------------
     Author
---------------*/
.comment .author {
  font-size: 1em;
  color: white;
  font-weight: bold;
}

.comment a.author {
  cursor: pointer;
}

.comment a.author:hover {
  color: #1e70bf;
}

/*--------------
     Metadata
---------------*/
.comment .metadata {
  display: inline-block;
  margin-left: 0.5em;
  color: red;
  font-size: 0.875em;
}

.comment .metadata > * {
  display: inline-block;
  margin: 0em 0.5em 0em 0em;
}

.comment .metadata > :last-child {
  margin-right: 0em;
}

/*--------------------
     Comment Text
---------------------*/
.comment .text {
  margin: 0.25em 0em 0.5em;
  font-size: 1em;
  word-wrap: break-word;
  color: gray;
  line-height: 1.3;
}

/*--------------------
     User Actions
---------------------*/
.comment .actions {
  font-size: 0.875em;
}

.comment .actions a {
  cursor: pointer;
  display: inline-block;
  margin: 0em 0.75em 0em 0em;
  color: purple;
}

.comment .actions a:last-child {
  margin-right: 0em;
}

.comment .actions a.active,
.comment .actions a:hover {
  color: white;
}

/*--------------------
      Reply Form
---------------------*/
.ui.comments > .reply.form {
  margin-top: 1em;
}

.comment .reply.form {
  width: 100%;
  margin-top: 1em;
}

.reply.form textarea {
  font-size: 1em;
  height: 12em;
}

/*******************************
            State
*******************************/
.ui.collapsed.comments,
.collapsed.comments,
.collapsed.comment {
  display: none;
}

/*******************************
           Variations
*******************************/
/*--------------------
        Threaded
---------------------*/
.ui.threaded.comments .comment .comments {
  margin: -1.5em 0 -1em 1.25em;
  padding: 3em 0em 2em 2.25em;
  box-shadow: -1px 0px 0px rgba(34, 36, 38, 0.15);
}

/*--------------------
        Minimal
---------------------*/
.ui.minimal.comments .comment .actions {
  opacity: 0;
  position: absolute;
  top: 0px;
  right: 0px;
  left: auto;
  transition: opacity 0.2s ease;
  transition-delay: 0.1s;
}

.ui.minimal.comments .comment > .content:hover > .actions {
  opacity: 1;
}

/*-------------------
        Sizes
--------------------*/
.ui.mini.comments {
  font-size: 0.78571429rem;
}

.ui.tiny.comments {
  font-size: 0.85714286rem;
}

.ui.small.comments {
  font-size: 0.92857143rem;
}

.ui.comments {
  font-size: 1rem;
}

.ui.large.comments {
  font-size: 1.14285714rem;
}

.ui.big.comments {
  font-size: 1.28571429rem;
}

.ui.huge.comments {
  font-size: 1.42857143rem;
}

.ui.massive.comments {
  font-size: 1.71428571rem;
}


</style>
