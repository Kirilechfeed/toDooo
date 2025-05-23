<script lang="ts" setup>
import { ElIcon, ElPopover } from "element-plus";
import { computed, ref } from "vue";
import ListProject from "../components/ListProject.vue";
import router from "../router";
import type { IProject } from "../models/index";

const props = defineProps<{
  myProject: IProject[];
}>();
const isShowFavoriteProject = ref(false);
const favoriteProject = computed(() =>
  props.myProject.filter((elem) => elem.favorite == true)
);
const itemMenu = ref();
const buttonRef = ref();

const isShowProject = ref(false);

const addNewProject = (event: MouseEvent) => {
  event.stopPropagation();
};

const showProject = (event: MouseEvent) => {
  event.stopPropagation();
  isShowProject.value = !isShowProject.value;
};
const showFavoriteProject = (event: MouseEvent) => {
  event.stopPropagation();
  isShowFavoriteProject.value = !isShowFavoriteProject.value;
};
</script>

<template>
  <div class="menu">
    <div v-if="favoriteProject.length" class="favoriteProject">
      <div class="item-menu">
        <span>Favorite</span>
        <div class="button-project">
          <el-icon
            :style="{ rotate: isShowFavoriteProject ? '90deg' : '0deg' }"
            @click="showFavoriteProject"
            class="icon-button"
            ><ArrowRight
          /></el-icon>
        </div>
      </div>
      <div class="project">
        <transition name="slide-fade">
          <div v-show="isShowFavoriteProject" class="project-list">
            <ListProject :myProject="favoriteProject" />
          </div>
        </transition>
      </div>
    </div>
    <div class="myProject">
      <div
        ref="itemMenu"
        class="item-menu"
        @click="
          router.push({
            name: 'myProject',
          })
        "
      >
        <span>Projects</span>
        <div class="button-project">
          <div style="display: flex">
            <el-icon ref="buttonRef" @click="addNewProject" class="icon-button"
              ><Plus
            /></el-icon>
            <el-popover
              :virtual-ref="buttonRef"
              trigger="click"
              virtual-triggering
              width="250"
            >
              <div class="popover">
                <div class="popover-item" @click="$emit('openProjectModal')">
                  <el-icon :size="25"><Cpu /></el-icon>
                  Add new project
                </div>
              </div>
            </el-popover>
          </div>
          <el-icon
            :style="{ rotate: isShowProject ? '90deg' : '0deg' }"
            @click="showProject"
            class="icon-button"
            ><ArrowRight
          /></el-icon>
        </div>
      </div>
      <div class="project">
        <transition name="slide-fade">
          <div v-show="isShowProject" class="project-list">
            <ListProject :myProject="props.myProject" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  height: 100%;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
}
.popover {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.popover-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 4px;
  border-radius: 5px;
  gap: 5px;
}
.popover-item:hover {
  background: #cfe2ff;
}
.addNewTask {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.addNewTask span {
  font-size: 20px;
  font-weight: 600;
  color: rgb(246, 100, 100);
}
.myProject {
  display: flex;
  flex-direction: column;
}
.item-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 2px;
  margin-top: 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
}
.button-project {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-button {
  padding: 3px;
  border-radius: 3px;
  transition: all 0.3s ease;
}
.icon-button:hover {
  background: #cfe2ff;
  cursor: pointer;
}

.project-list {
  margin-top: 10px;
  transition: all 0.3s ease;
}
.project-list li {
  display: flex;
  align-items: center;
  margin-top: 14px;
  margin-left: 5px;
  gap: 14px;
  cursor: pointer;
}
.project-list li:hover {
  color: rgb(61, 61, 61);
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
