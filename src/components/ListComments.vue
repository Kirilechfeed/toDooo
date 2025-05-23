<script lang="ts" setup>
import { ref } from "vue";
import type { IComment } from "../models/index";
import { ElInput, ElIcon, ElButton } from "element-plus";
import ListTask from "./ListTask.vue";

const props = defineProps<{
  comments: IComment[];
}>();
</script>

<template>
  <div v-for="(n, index) in props.comments" class="container">
    <div class="avatar">К</div>
    <div class="content">
      <span class="comment-name">{{ n.name }}</span>
      <span class="comment-data">{{ n.data }}</span>
      <div class="comment">{{ n.comment }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}
.avatar {
  background-color: #0f574e;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.comment-name {
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
}
.comment-data {
  color: rgb(144, 144, 144);
  font-size: 14px;
}
.comment {
  margin-top: 5px;
  color: black;
}
</style>
