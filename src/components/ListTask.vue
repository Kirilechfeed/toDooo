<script lang="ts" setup>
import { ref, inject, computed } from "vue";
import type { ITask, ISubTask } from "../models/index";
import { ElIcon, ElCheckbox, ElNotification } from "element-plus";
import { useRoute } from "vue-router";
import SettingTask from "../components/SettingTask.vue";
import MenuSetting from "./MenuSetting.vue";
import { MenuAction } from "../enum/index";

const route = useRoute();
const projectId = computed(() => route.params.id as string);
const elementMenuTask = [
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
const props = defineProps<{
  tasks: ITask[] | ISubTask[];
  indexSection?: number;
  view: "default" | "view" | "update";
}>();

const showAddNewTask = ref(false);

const currentTask = ref();
const openTaskModal = inject<
  (projectId: string, indexSection: number, indexTask: number) => void
>("openTaskModal", () => {});

const addTask = () => {
  showAddNewTask.value = true;
};

const addNewTask = (task: ITask) => {
  props.tasks.push(task);
  showAddNewTask.value = false;
};
const getDoneTask =
  inject<
    (
      projectId: string,
      indexSection: number,
      index: number,
      time: string
    ) => void
  >("getDoneTask");
const getNewTime = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};
const doneTask = (index: number) => {
  if (props.view == "default") {
    setTimeout(() => {
      if (getDoneTask) {
        getDoneTask(
          projectId.value,
          props.indexSection ?? -1,
          index,
          getNewTime()
        );
      }
      props.tasks.splice(index, 1);
      props.tasks[index].done = true;
      ElNotification({
        title: "Success",
        message: `This task is done`,
        type: "success",
      });
    }, 500);
  }
  currentTask.value = null;
};

const showSetting = (index: number) => {
  currentTask.value = index;
};

const updateCurrenTask = (task: ITask) => {
  props.tasks.splice(currentTask.value, 1, task);
  currentTask.value = null;
};

const handleAction = (action: MenuAction, index: number) => {
  switch (action) {
    case MenuAction.Delete:
      (props.tasks as ITask[]).splice(index, 1);
      break;
  }
};
</script>

<template>
  <div :class="`container container-${props.view}`">
    <div class="container-task">
      <div v-if="!showAddNewTask" @click="addTask" class="addNewTask">
        <el-icon
          v-if="props.view == 'default'"
          :size="20"
          :color="'rgb(246, 100, 100)'"
          ><Plus
        /></el-icon>
        <el-icon v-else :size="15" :color="'rgb(88, 88, 88)'"><Plus /></el-icon>
        <span v-if="props.view == 'default'">Add new task</span>
        <span v-else>new subtask</span>
      </div>
      <SettingTask
        @close="showAddNewTask = false"
        @addNewTask="addNewTask"
        v-else
        :view="props.view"
      />
    </div>
    <TransitionGroup
      v-if="props.tasks.length"
      name="list"
      class="list-container"
    >
      <div v-for="(task, index) in props.tasks">
        <div class="container-item-list">
          <el-checkbox
            @change="doneTask(index)"
            v-model="task.done"
            size="large"
            style="border-radius: 50%"
          />

          <span
            @click="openTaskModal(projectId, props.indexSection ?? 0, index)"
            class="name-task"
            :class="{ 'name-task-done': task.done }"
            >{{ task.name
            }}<span
              class="count-subtask"
              v-if="props.view == 'default' && (props.tasks as ITask[])[index].subTask?.length"
              ><el-icon size="small"><Right /></el-icon
              >{{
                (props.tasks as ITask[])[index].subTask?.filter(
                  (elem) => elem.done
                ).length
              }}/{{ (props.tasks as ITask[])[index].subTask?.length }}</span
            >
            <span
              class="count-comments"
              v-if="props.view == 'default' && (props.tasks as ITask[])[index].comment?.length"
              ><el-icon size="small"><Comment /></el-icon
              >{{ (props.tasks as ITask[])[index].comment?.length }}</span
            >
          </span>

          <div class="item-list-button">
            <el-icon size="25px" class="icon-button" @click="showSetting(index)"
              ><EditPen
            /></el-icon>
            <el-icon size="25px" class="icon-button"><Memo /></el-icon>
            <el-icon size="25px" class="icon-button"><Comment /></el-icon>
            <MenuSetting
              :listMenu="elementMenuTask"
              @select="(action) => handleAction(action, index)"
              :size="25"
              :name="'task'"
            />
          </div>
        </div>
        <div class="setting-task">
          <SettingTask
            v-if="currentTask == index"
            :task="(tasks[index] as ITask)"
            :view="'update'"
            @addNewTask="updateCurrenTask"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.addNewTask {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: rgb(88, 88, 88);
}

.addNewTask:hover {
  color: rgb(145, 68, 68);
}
.input {
  width: 100%;
  padding: 1px 5px;
  border: none;
  outline: none;
}
.count-subtask {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 5px;
  color: rgb(120, 120, 120);
  font-size: 12px;
}
.count-comments {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 5px;
  color: rgb(120, 120, 120);
  font-size: 12px;
  margin-left: 10px;
}
.container {
  margin-left: 30px;
  max-height: 430px;
  overflow: auto;
}
.container-view {
  margin: 0;
}
.container-item-list {
  border-bottom: 1px solid rgb(227, 227, 227);
  margin-top: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.container-item-list:hover .item-list-button {
  display: flex;
}

.icon-button {
  border: none;
  font-size: 16px;
}
.name-task {
  margin-left: 16px;
  flex: 1;
  display: flex;
  align-items: center;
}
.name-task-done {
  text-decoration: line-through;
}
.item-list-start {
  border: 1px solid red;
  flex: 1;
}
.icon-button {
  padding: 2px;
  transition: all 0.3s ease;
  color: rgb(115, 115, 115);
}
.icon-button:hover {
  background-color: rgb(232, 232, 232);
  color: rgb(59, 59, 59);

  border-radius: 5px;
  cursor: pointer;
}
.item-list-button {
  display: none;
  align-items: center;
  gap: 20px;
}
.list-container {
  position: relative;
  padding: 0;
  list-style-type: none;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
