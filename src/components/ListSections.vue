<script lang="ts" setup>
import { ref } from "vue";
import type { ISection } from "../models/index";
import { ElInput, ElIcon, ElButton } from "element-plus";
import ListTask from "./ListTask.vue";
import MenuSetting from "./MenuSetting.vue";
import { MenuAction } from "../enum/index";

const props = defineProps<{
  listSection: ISection[];
}>();
const currentSection = ref(-1);
const currentSectionForTasks = ref(-1);
const buttonActive = ref(false);
const newName = ref("");
const elementMenuSection = [
  {
    name: "Add archive",
    icon: "DataLine",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.Archive,
  },
  {
    name: "Delete",
    icon: "Delete",
    style: "",
    disabled: false,
    visible: true,
    action: MenuAction.Delete,
  },
];
const renameSection = (index: number) => {
  currentSection.value = index;
  newName.value = props.listSection[index].name;
};
const clearInput = () => {
  newName.value != ""
    ? (buttonActive.value = false)
    : (buttonActive.value = true);
};
const cancel = () => {
  currentSection.value = -1;
};

const addNewName = (index: number) => {
  props.listSection[index].name = newName.value;
  newName.value = "";
  currentSection.value = -1;
};

const ShowTasks = (index: number) => {
  if (currentSectionForTasks.value != index) {
    currentSectionForTasks.value = index;
  } else {
    currentSectionForTasks.value = -1;
  }
};
const handleAction = (action: MenuAction, index: number) => {
  switch (action) {
    case MenuAction.Delete:
      props.listSection.splice(index, 1);
      break;
  }
};
</script>

<template>
  <div v-for="(n, index) in props.listSection" class="container">
    <div v-if="currentSection !== index" class="item-section">
      <div class="name-section">
        <el-icon
          :style="{
            rotate: currentSectionForTasks == index ? '90deg' : '0deg',
          }"
          class="show-task"
          @click="ShowTasks(index)"
          ><ArrowRightBold
        /></el-icon>
        <span @click="renameSection(index)">{{ n.name }}</span>
      </div>
      <MenuSetting
        :listMenu="elementMenuSection"
        @select="(action) => handleAction(action, index)"
        :size="20"
        :name="'section'"
      />
    </div>
    <div v-else class="add-new-section">
      <el-input
        v-model="newName"
        style="width: 100%"
        placeholder="Please input"
        @input="clearInput"
      />
      <div class="button-new-section">
        <el-button
          :disabled="buttonActive"
          type="primary"
          @click="addNewName(index)"
          >Save</el-button
        >
        <el-button @click="cancel()">Cancel</el-button>
      </div>
    </div>
    <div class="container-tasks">
      <transition name="slide-fade">
        <div v-show="currentSectionForTasks == index" class="project-list">
          <ListTask :tasks="n.task" :indexSection="index" :view="'default'" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 30px;
}
.item-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(176, 176, 176);
}
.name-section {
  display: flex;
  align-items: center;
  gap: 10px;
}
.show-task {
  padding: 2px;
  transition: all 0.3s ease;
}
.button-new-section {
  margin-top: 20px;
}
.show-task:hover {
  background-color: rgb(232, 232, 232);
  border-radius: 5px;
  cursor: pointer;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>
