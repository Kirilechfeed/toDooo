<script lang="ts" setup>
import {
  ElIcon,
  ElButton,
  ElPopover,
  ElDatePicker,
  ElSelect,
  ElOption,
} from "element-plus";
import { Flag, More, Cpu } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import type { ITask } from "../models/index";

const emit = defineEmits(["addNewTask", "close"]);
const props = defineProps<{
  task?: ITask;
  view: "default" | "view" | "update";
}>();

let task = reactive(<ITask>{});
const id = ref(props.task?.id ?? Date.now());
const popoverRef = ref();
const buttonRef = ref();
const sabTask = ref(props.task?.subTask ?? []);
const nameTask = ref(props.task?.name ?? "");
const priority = ref(props.task?.priority.value ?? "");
const term = ref(props.task?.term ?? "");
const taskDescription = ref(props.task?.description ?? "");
const buttonActive = ref(false);
const options = [
  {
    value: "priority1",
    label: "Priority1",
    color: "#b31717",
  },
  {
    value: "priority2",
    label: "Priority2",
    color: "#cd6b08",
  },
  {
    value: "priority3",
    label: "Priority3",
    color: "#141d9d",
  },
  {
    value: "priority4",
    label: "Priority4",
    color: "#696969",
  },
];

const clearInput = () => {
  nameTask.value != ""
    ? (buttonActive.value = false)
    : (buttonActive.value = true);
};

const addNewTask = () => {
  task = {
    id: id.value,
    name: nameTask.value,
    time: "dasdasd",
    done: false,
    timeDone: "",
    description: taskDescription.value,
    term: term.value,
    subTask: sabTask.value,
    comment: props.task?.comment,
    priority: {
      value: priority.value,
      color:
        options.find((elem) => elem.value == priority.value)?.color ??
        "#696969",
    },
  };
  emit("addNewTask", task);
};
</script>

<template>
  <div class="add-task-content">
    <input
      v-model="nameTask"
      type="text"
      :class="`input input-task `"
      placeholder="Please input your task"
      @input="clearInput"
    />
    <input
      v-if="props.view != 'view'"
      v-model="taskDescription"
      type="text"
      :class="`input input-description `"
      placeholder="Description"
    />
    <div class="add-task-setting">
      <el-date-picker
        v-if="view != 'view'"
        v-model="term"
        type="date"
        placeholder="Term"
        :size="'small'"
        :style="{ width: '100px', marginRight: '12px' }"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
      <el-select
        v-if="view != 'view'"
        v-model="priority"
        placeholder="Priority"
        size="small"
        style="width: 100px; margin-right: 6px"
        :default-first-option="true"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          style="display: flex; align-items: center"
        >
          <el-icon
            :style="{
              float: 'left',
              fontSize: '20px',
              color: item.color,
            }"
            ><Flag
          /></el-icon>
          <span style="float: left; margin-left: 10px">{{ item.label }}</span>
        </el-option>
      </el-select>
      <el-icon
        v-if="props.view != 'view'"
        :style="{
          fontSize: '20px',
          marginRight: '12px',
          color: options.find((elem) => elem.value == priority)?.color,
        }"
        ><Flag
      /></el-icon>
      <el-button
        v-if="props.view != 'view'"
        :style="{ fontSize: '20px' }"
        :size="'small'"
        :icon="More"
      ></el-button>
    </div>
    <div class="add-task-button">
      <el-button
        v-if="props.view != 'view'"
        ref="buttonRef"
        class="icon-button"
        type="default"
        :icon="Cpu"
        >Search <el-icon :style="{ marginLeft: '5px' }"><ArrowDown /></el-icon
      ></el-button>
      <el-popover
        :virtual-ref="buttonRef"
        ref="popoverRef"
        trigger="click"
        virtual-triggering
        width="250"
      >
        <div class="popover">
          <div class="popover-item" @click="addNewTask">
            <el-icon :size="25"><Cpu /></el-icon>
            Add new project
          </div>
        </div>
      </el-popover>
      <div class="save-task">
        <el-button @click="$emit('close')">Cancel</el-button>
        <el-button :disabled="buttonActive" type="primary" @click="addNewTask"
          >Save</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-task-content {
  border: 1px solid rgb(163, 163, 163);
  border-radius: 10px;
  padding: 16px;
  position: relative;
  margin-top: 10px;
}
.add-task-content::after {
  content: "";
  width: 100%;
  position: absolute;
  bottom: 60px;
  left: 0;
  border-bottom: 1px solid rgb(163, 163, 163);
}
.input {
  width: 100%;
  padding: 1px 5px;
  border: none;
  outline: none;
}

.input-task {
  font-size: 20px;
}
.input-task::placeholder {
  color: rgb(174, 174, 174);
}
.input-description {
  font-size: 16px;
  margin-top: 8px;
}
.input-description::placeholder {
  color: rgb(223, 223, 223);
}
.input-task-small {
  font-size: 16px;
}
.input-description-small {
  font-size: 14px;
  margin-top: 6px;
}
.icon-button {
  padding: 2px;
  transition: all 0.3s ease;
  color: rgb(115, 115, 115);
}
.add-task-setting {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.add-task-button {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
