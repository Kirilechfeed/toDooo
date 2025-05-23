<script setup lang="ts">
import { inject } from "vue";
import type { ITask } from "@/models/index";
const doneTask = inject<ITask[]>("doneTasks");
console.log(doneTask);
</script>

<template>
  <h2>Done Task</h2>
  <div v-for="n in doneTask" class="done-container">
    <div class="avatar">K</div>
    <div class="done-content">
      <span
        >You completed the task:
        <span class="name-task">{{ n.name }}</span></span
      >
      <span>{{ n.timeDone }}</span>
    </div>
  </div>
  <el-empty
    v-if="!doneTask?.length"
    :image-size="300"
    description="Tasks not completed
."
  />
</template>

<style scoped>
.done-container {
  margin-top: 20px;
  border-bottom: 1px solid rgb(223, 223, 223);
  display: flex;
  padding: 10px 0px;
  gap: 20px;
}
.name-task {
  font-weight: 600;
  text-decoration: underline;
}
.done-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
}
.avatar {
  background-color: #0f574e;
  color: white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 40px;
}
</style>
