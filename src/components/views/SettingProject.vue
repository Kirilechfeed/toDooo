<script setup lang="ts">
import { computed, inject, ref } from "vue";
import type { IProject, ITask } from "@/models/index";
import { ElButton, ElInput, ElEmpty } from "element-plus";
import ListSections from "../ListSections.vue";
import ListTask from "../ListTask.vue";
import SettingTask from "../SettingTask.vue";

import { useRoute } from "vue-router";
defineProps({
  id: String,
});
const newSection = ref("");
const route = useRoute();
const myProject = ref<IProject[]>(inject<IProject[]>("currentProject") ?? []);
const showAddSection = ref(false);
const id = computed(() => Number(route.params.id));
const isAddTask = ref(false);
const currentProject = computed(() =>
  myProject.value.find((elem) => elem.id == id.value)
);
if (!currentProject.value) {
  throw new Error(`Проект с id ${id} не найден`);
}
const buttonActive = ref(true);

const clearInput = () => {
  newSection.value != ""
    ? (buttonActive.value = false)
    : (buttonActive.value = true);
};
const addSection = () => {
  currentProject.value?.section.push({
    name: newSection.value,
    task: [],
    archived: false,
  });
  showAddSection.value = false;
  newSection.value = "";
};
const cancel = () => {
  showAddSection.value = false;
  newSection.value = "";
};
const addNewTask = (task: ITask) => {
  currentProject.value?.tasks.push(task);
};
</script>

<template>
  <h2 v-if="currentProject">{{ currentProject.name }}</h2>
  <div class="main-project">
    <ListTask
      v-if="currentProject?.tasks"
      :tasks="currentProject.tasks"
      :view="'default'"
    />
    <SettingTask
      @add-new-task="addNewTask"
      v-if="isAddTask"
      :view="'default'"
    />

    <div
      v-if="!showAddSection"
      @click="showAddSection = true"
      class="new-section"
    >
      <span>Add new section</span>
    </div>
    <div v-if="showAddSection" class="add-new-section">
      <el-input
        v-model="newSection"
        style="width: 100%"
        placeholder="Please input"
        @input="clearInput"
      />
      <div class="button-new-section">
        <el-button :disabled="buttonActive" type="primary" @click="addSection"
          >Add section</el-button
        >
        <el-button @click="cancel">Cancel</el-button>
      </div>
    </div>
    <div class="list-section">
      <ListSections :listSection="currentProject?.section ?? []" />
    </div>
  </div>
  <el-empty
    v-if="!(currentProject?.tasks.length || currentProject?.section.length)"
    :image-size="300"
    description="Add tasks to get started on your project."
  />
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.addNewTask {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.addNewTask:hover {
  color: rgb(145, 68, 68);
}
.new-section {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
  opacity: 0;
  transition: 0.3s ease-in;
}
.new-section:hover {
  cursor: pointer;
  opacity: 1;
}
.new-section span {
  font-size: 20px;
}
.new-section span::after {
  content: "";
  position: absolute;
  border-bottom: 0.2px solid red;
  width: 40%;
  right: 0;
  top: 14px;
}
.new-section span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 14px;
  border-bottom: 0.2px solid red;
  width: 40%;
}
.add-new-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.button-new-section {
  display: flex;
  gap: 6px;
}
</style>
