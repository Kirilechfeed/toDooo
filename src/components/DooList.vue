<script setup lang="ts">
import {
  ElInput,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElNotification,
  ElIcon,
  ElPopover,
} from "element-plus";
import { ref, provide, computed } from "vue";
import ModalProject from "../components/ModalProject.vue";
import ModalTask from "../components/ModalTask.vue";
import Aside from "../components/Aside.vue";
import type { IProject, ITask } from "../models/index";
import router from "../router";
import { MenuAction } from "../enum/index";
import type { DropdownInstance } from "element-plus";

const dropdown1 = ref<DropdownInstance>();
const myProject = ref<IProject[]>([]);
const visible = ref(false);
const indexSection = ref(0);
const indexTask = ref(0);
const dialogVisible = ref(false);
const search = ref("");
const currentTask = ref<IProject>();
const isActiveProject = ref(false);
const pushOrUnshift = ref("push");
const buttonRef = ref();
const openProjectModal = () => {
  dialogVisible.value = true;
};

const openTaskModal = (id: string, indexS: number, indexT: number) => {
  console.log(id);
  if (!visible.value) {
    currentTask.value = myProject.value.find(
      (n) => n.id.toString() == id.toString()
    );
    indexSection.value = indexS;
    indexTask.value = indexT;
  }

  if (indexS != undefined) {
    visible.value = !visible.value;
  }
};
const closeModal = (newProject: IProject) => {
  if (pushOrUnshift.value == "push" && newProject) {
    myProject.value.push(newProject);
  }
  if (pushOrUnshift.value == "unshift" && newProject) {
    myProject.value.unshift(newProject);
  }

  dialogVisible.value = false;
};
const closeModalTask = () => {
  visible.value = false;
};
const deleteItem = (id: number) => {
  myProject.value.splice(
    myProject.value.findIndex((elem) => elem.id == id),
    1
  );
  ElNotification({
    title: "Success",
    message: `Project deleted`,
    type: "success",
    showClose: false,
  });
  router.push({ path: `/myProject` });
};
const archiveItem = (id: number) => {
  const project = myProject.value.find((elem) => elem.id == id);

  if (project) {
    project.archived = true;
  }
  ElNotification({
    title: "Success",
    message: `Project archived`,
    type: "success",
    showClose: false,
  });
  router.push({ path: `/myProject` });
};
const switchActive = (value: boolean) => {
  isActiveProject.value = value;
};

const toggleFavorite = (
  id: number,
  action: MenuAction,
  isFavorite: boolean
) => {
  const project = myProject.value.find((elem) => elem.id === id);
  if (!project) return;

  project.favorite = isFavorite;

  const targetAction = project.menuSetting.find(
    (elem) => elem.action === action
  );
  if (targetAction) {
    targetAction.visible = false;
  }

  const oppositeAction = project.menuSetting.find((elem) =>
    isFavorite
      ? elem.action === MenuAction.RemoveFromFavorites
      : elem.action === MenuAction.AddToFavorites
  );
  if (oppositeAction) {
    oppositeAction.visible = true;
  }
};

const placeForAdd = (value: string) => {
  pushOrUnshift.value = value;
  dialogVisible.value = true;
};
const showOPerationMenu = () => {
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
};
const doneTask = ref<ITask[]>([]);

const getDoneTask = (
  projectID: string,
  indexSection: number,
  index: number,
  time: string
) => {
  const project = myProject.value.find(
    (elem) => elem.id.toString() == projectID
  );
  if (project)
    if (indexSection != -1) {
      project.section[indexSection].task[index].timeDone = time;
      doneTask.value.unshift(project.section[indexSection].task[index]);
    } else {
      project.tasks[index].timeDone = time;
      doneTask.value.unshift(project.tasks[index]);
    }
};
const filteredProjects = computed(() =>
  myProject.value.filter((project) => {
    const matchesArchive = project.archived === isActiveProject.value;

    const matchesSearch =
      !search.value ||
      project.name.toLowerCase().includes(search.value.toLowerCase());

    return matchesArchive && matchesSearch;
  })
);
provide("getDoneTask", getDoneTask);
provide("doneTasks", doneTask);

provide("openProjectModal", openProjectModal);
provide("openTaskModal", openTaskModal);
provide("delete", deleteItem);
provide("archive", archiveItem);
provide("addToFavorites", toggleFavorite);
provide("removeFromFavorites", toggleFavorite);
provide("addAbove", placeForAdd);
provide("addBelow", placeForAdd);
provide("currentProject", filteredProjects);
provide("switchActive", switchActive);

// const getNewData = () => {
//   const today = new Date();

//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const year = today.getFullYear();

//   const formattedDate = `${day}-${month}-${year}`;
//   return formattedDate;
// };

// const getNewTime = () => {
//   const now = new Date();

//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");

//   const formattedTime = `${hours}:${minutes}`;
//   return formattedTime;
// };
</script>

<template>
  <ModalTask
    v-if="visible && currentTask"
    @closeModalTask="closeModalTask"
    :visible="visible"
    :currentTask="currentTask"
    :indexSection="indexSection"
    :indexTask="indexTask"
  />
  <ModalProject @closeModal="closeModal" :dialogVisible="dialogVisible" />
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <div class="header-content">
          <span class="logo">toDooo...</span>
          <div class="search">
            <el-input
              v-model="search"
              size="large"
              placeholder="Type to search project"
            />

            <el-icon
              class="el-dropdown-link icon-button"
              ref="buttonRef"
              @click="showOPerationMenu"
              ><Operation
            /></el-icon>
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
                  @click="router.push({ path: '/doneTask' })"
                >
                  <el-icon style="color: green"><SuccessFilled /></el-icon>
                  Done tasks
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="400px" class="aside-menu"
          ><Aside
            :myProject="filteredProjects"
            @openProjectModal="openProjectModal"
          />
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.icon-button {
  font-size: 30px;
  transition: all 0.3s ease;
  color: rgb(0, 0, 0);
}
.icon-button:hover {
  background: #cfe2ff;
  color: rgb(59, 59, 59);
  border-radius: 5px;
  cursor: pointer;
}
.container {
  height: 100vh;
}
.common-layout {
  min-height: 100vh;
}
.aside-menu {
  background: #feffef;
  padding-top: 40px;
}
.popover-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 4px;
  border-radius: 5px;
  gap: 8px;
}
.popover-item:hover {
  background: #cfe2ff;
}
.header {
  border-bottom: 1px solid rgb(214, 214, 214);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 30px;
  font-weight: 600;
  color: rgb(77, 77, 77);
}

.table {
  border: 1px solid rgb(212, 212, 212);
}
.list {
  margin-top: 30px;
}
.el-card__body {
  flex: 1;
}
.input {
  display: flex;
  margin-bottom: 40px;
}
.main {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 150px;
}
.table-card {
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
}
.search {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
