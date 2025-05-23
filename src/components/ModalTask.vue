<script setup lang="ts">
import { ref } from "vue";
import { ElIcon, ElDialog, ElInput, ElButton } from "element-plus";
import {
  StarFilled,
  Lock,
  Paperclip,
  Plus,
  Microphone,
  Eleme,
  Reading,
} from "@element-plus/icons-vue";

import ListTask from "../components/ListTask.vue";
import type { IProject } from "@/models/index";
import ListComments from "../components/ListComments.vue";

const props = defineProps<{
  visible: boolean;
  currentTask: IProject;
  indexSection: number;
  indexTask: number;
}>();

const isComment = ref(false);
const isCommentsList = ref(true);
const isOpenDescription = ref(true);
const comment = ref("");
const task = ref(
  props.currentTask.section[props.indexSection]
    ? props.currentTask.section[props.indexSection].task[props.indexTask]
    : props.currentTask.tasks[props.indexTask]
);
const buttonActive = ref(true);

const isOpenSubtask = ref(false);

const openSubtask = () => {
  isOpenSubtask.value = !isOpenSubtask.value;
};
const openComments = () => {
  isCommentsList.value = !isCommentsList.value;
};
const saveDescription = () => {
  isOpenDescription.value = true;
};
const clearInput = () => {
  comment.value != ""
    ? (buttonActive.value = false)
    : (buttonActive.value = true);
};

const cancel = () => {
  isComment.value = false;
};

const addComment = () => {
  if (!task.value.comment) {
    task.value.comment = [];
  }
  task.value.comment?.push({
    name: "Kirill",
    comment: comment.value,
    data: "To Day, 12:31",
  });
  comment.value = "";
  isComment.value = false;
};
</script>

<template>
  <el-dialog
    v-model="props.visible"
    width="800px"
    :close-on-click-modal="false"
    :show-close="false"
    class="task-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="path">
          <span :style="`color: ${props.currentTask.color};`"
            ><el-icon><Cpu /></el-icon> {{ props.currentTask.name }}</span
          >
          <span v-if="indexSection">/</span>
          <span v-if="indexSection">
            <el-icon><List /></el-icon
            >{{ props.currentTask.section[props.indexSection].name }}</span
          >
        </div>
        <div class="navigate">
          <el-icon @click="$emit('closeModalTask')" class="close-modal"
            ><Plus
          /></el-icon>
        </div>
      </div>
    </template>

    <div class="dialog-content">
      <div class="left-panel">
        <h2 class="task-title">
          {{ task.name }}
        </h2>
        <div :style="{ marginLeft: '10px' }">
          <div
            v-if="isOpenDescription"
            class="task-description"
            @click="isOpenDescription = false"
          >
            <div
              v-if="!task.description"
              :style="{ display: 'flex', alignItems: 'center', gap: '4px' }"
            >
              <el-icon><ChatLineSquare /></el-icon><span>Description</span>
            </div>
            <div :style="{ maxWidth: '468px', overflowX: 'hidden' }" v-else>
              {{ task.description }}
            </div>
          </div>
          <div v-else>
            <el-input
              v-model="task.description"
              style="width: 100%"
              :rows="2"
              type="textarea"
              placeholder="Description"
            />
            <div class="button-new-description">
              <el-button type="primary" @click="saveDescription"
                >Save</el-button
              >
            </div>
          </div>
          <div @click="openSubtask" class="name-section">
            <el-icon
              :style="{
                rotate: isOpenSubtask ? '90deg' : '0deg',
              }"
              class="show-task"
              ><ArrowRightBold
            /></el-icon>
            <span :style="{ color: 'black' }">Sub task</span>
          </div>
          <transition name="slide-fade">
            <div v-show="isOpenSubtask" class="project-list">
              <ListTask
                :tasks="task.subTask ?? []"
                :indexSection="props.indexSection"
                :view="'view'"
              />
            </div>
          </transition>

          <div
            v-if="task.comment?.length"
            @click="openComments"
            class="name-section list-comments"
          >
            <el-icon
              :style="{
                rotate: isCommentsList ? '90deg' : '0deg',
              }"
              class="show-task"
              ><ArrowRightBold
            /></el-icon>
            <span :style="{ color: 'black' }">Comments</span>
          </div>
          <transition name="slide-comment">
            <div v-if="isCommentsList" class="container-comment">
              <ListComments :comments="task.comment ?? []" />
            </div>
          </transition>
          <div class="comment-block">
            <div v-if="!isComment" class="avatar">К</div>
            <el-input
              @focus="isComment = true"
              v-if="!isComment"
              placeholder="Комментировать"
              class="comment-input"
            >
              <template #append>
                <el-icon><paperclip /></el-icon>
              </template>
            </el-input>
            <div v-else class="add-task-content">
              <input
                v-model="comment"
                type="text"
                class="input input-task"
                placeholder="Comment..."
                @input="clearInput"
              />
              <div class="button-comment">
                <div class="add-comment-setting">
                  <el-icon :style="{ fontSize: '25px' }"><Paperclip /></el-icon>
                  <el-icon :style="{ fontSize: '25px' }"
                    ><Microphone
                  /></el-icon>
                  <el-icon :style="{ fontSize: '25px' }"><Eleme /></el-icon>
                  <el-icon :style="{ fontSize: '25px' }"><Reading /></el-icon>
                </div>
                <div class="save-task">
                  <el-button @click="cancel()">Cancel</el-button>
                  <el-button
                    :disabled="buttonActive"
                    type="primary"
                    @click="addComment"
                    >Save</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая часть -->
      <div class="right-panel">
        <div class="info-row">
          <span class="label">Проект</span>
          <div class="path">
            <span> {{ props.currentTask.name }}</span>
            <span v-if="indexSection">/</span>
            <span v-if="indexSection">
              {{ props.currentTask.section[props.indexSection].name }}</span
            >
          </div>
        </div>

        <div class="info-row">
          <span class="label">Срок</span>
          <span v-if="task.term">{{ task.term }}</span> <span v-else>--</span>
        </div>

        <div class="info-row">
          <span class="label">Приоритет</span>
          <span v-if="task.priority.value" class="value">{{
            task.priority.value
          }}</span
          ><span v-else>--</span>
        </div>

        <div class="info-row">
          <span class="label">Метки</span>
          <el-button type="text" icon="el-icon-plus" />
        </div>

        <div class="info-row">
          <span class="label">Напоминания</span>
          <el-button type="text" icon="el-icon-plus" />
        </div>

        <div class="info-row">
          <span class="label">Местоположение</span>
          <span class="value with-icon">
            <el-icon><star-filled /></el-icon>
            <el-icon><lock /></el-icon>
          </span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.task-dialog {
  --el-dialog-padding-primary: 0px;
}
.add-task-content {
  border: 1px solid rgb(185, 185, 185);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
.button-comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}
.add-comment-setting {
  display: flex;
  align-items: center;
  gap: 10px;
}
.container-comment {
  max-height: 400px;
  overflow: auto;
}
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  color: #777;

  border-bottom: 1px solid #eee;
}
.input {
  width: 100%;
  padding: 1px 5px;
  border: none;
  outline: none;
}

.input-task {
  font-size: 16px;
}
.input-task::placeholder {
  color: rgb(174, 174, 174);
}
.name-section {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.dialog-content {
  display: flex;
  gap: 20px;
  height: 600px;
  overflow: hidden;
}
.path {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.path span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.left-panel {
  flex: 2;
  border-right: 1px solid #eee;
  margin-left: 10px;
  padding-right: 20px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1e1e1e;
}
.list-comments {
  margin-top: 10px;
}
.task-description {
  color: #aaa;
  margin-bottom: 16px;
}

.add-subtask {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-bottom: 16px;
  margin-top: 10px;
  padding: 0;
}

.comment-block {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  margin-top: 20px;
}
.project-list {
  margin-top: 10px;
  margin-left: 10px;
}
.avatar {
  background-color: #0f574e;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.comment-input {
  flex: 1;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #999;
  font-size: 14px;
}

.value {
  font-size: 14px;
  color: #333;
}

.with-icon {
  display: flex;
  align-items: center;
  gap: 6px;
}
.close-modal {
  rotate: 45deg;
  font-size: 30px;
  cursor: pointer;
}
.close-modal:hover {
  color: #1e1e1e;
}
.button-new-description {
  margin-top: 10px;
  display: flex;
  justify-content: end;
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
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
}

.slide-comment-enter-active,
.slide-comment-leave-active {
  transition: all 0.3s ease;
}

.slide-comment-enter-from,
.slide-comment-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-comment-enter-to,
.slide-comment-leave-from {
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
}
</style>
