<script lang="ts" setup>
import { ref, inject } from "vue";
import { ElEmpty, ElIcon, ElButton, ElPopover } from "element-plus";
import ListProject from "../ListProject.vue";
import type { IProject } from "@/models/index";

const myProject = inject<IProject[]>("currentProject") ?? [];

const buttonRef = ref();
const buttonRef2 = ref();

const openProjectModal = inject<() => void>("openProjectModal", () => {});
const openModal = () => {
  openProjectModal();
};
const name = ref("Active project");
const switchActive = inject<(isActiveProject: boolean) => void>(
  "switchActive",
  () => {}
);

const switchName = (value: boolean) => {
  value ? (name.value = "Archiving projects") : (name.value = "Active project");
};
</script>

<template>
  <h2>Projects</h2>

  <div class="project-nav">
    <div class="dropdown">
      <el-button ref="buttonRef" style="margin-top: 20px"
        ><Plus />{{ name }}
        <el-icon style="margin-left: 10px"><ArrowRightBold /></el-icon
      ></el-button>
      <el-popover
        :virtual-ref="buttonRef"
        ref="popoverRef"
        trigger="click"
        virtual-triggering
        width="300"
        placement="right"
      >
        <div class="popover">
          <div
            class="popover-item"
            @click="switchActive(false), switchName(false)"
          >
            <el-icon :size="20"><Expand /></el-icon>
            Active project
          </div>
          <div
            class="popover-item"
            @click="switchActive(true), switchName(true)"
          >
            <el-icon :size="20"><Document /></el-icon>
            Archiving projects
          </div>
        </div>
      </el-popover>
    </div>
    <div class="addProject">
      <div class="button-project">
        <div style="display: flex">
          <el-icon :size="25" ref="buttonRef2" class="icon-button"
            ><Plus
          /></el-icon>
          <el-popover
            :virtual-ref="buttonRef2"
            ref="popoverRef2"
            trigger="click"
            virtual-triggering
            width="250"
          >
            <div class="popover">
              <div class="popover-item" @click="openModal">
                <el-icon :size="25"><Cpu /></el-icon>
                Add new project
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
  <div class="list-project">
    <ListProject :myProject="myProject" />
    <el-empty
      v-if="!myProject.length"
      :image-size="300"
      description="Add tasks to get started on your project."
    />
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
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
.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-button {
  padding: 3px;
  border-radius: 3px;
}
.icon-button:hover {
  background: #cfe2ff;
  cursor: pointer;
}
</style>
