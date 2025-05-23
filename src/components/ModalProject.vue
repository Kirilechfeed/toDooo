<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  ElOption,
  ElDialog,
  ElInput,
  ElSelect,
  ElSwitch,
  ElButton,
} from "element-plus";
import { MenuAction } from "../enum/index";

const props = defineProps<{
  dialogVisible: boolean;
}>();
const nameProject = ref("");
const selectedColor = ref("");
const isFavorites = ref(false);
const isDisabled = ref(true);
const colors = [
  { label: "Красный", value: "#FF0000" },
  { label: "Зелёный", value: "#00FF00" },
  { label: "Синий", value: "#0000FF" },
  { label: "Жёлтый", value: "#FFFF00" },
  { label: "Оранжевый", value: "#FFA500" },
  { label: "Фиолетовый", value: "#800080" },
  { label: "Голубой", value: "#00CED1" },
  { label: "Розовый", value: "#FFC0CB" },
  { label: "Коричневый", value: "#8B4513" },
  { label: "Серый", value: "#808080" },
  { label: "Чёрный", value: "#000000" },
  { label: "Белый", value: "#FFFFFF" },
  { label: "Бордовый", value: "#800000" },
  { label: "Салатовый", value: "#7FFF00" },
  { label: "Небесный", value: "#87CEEB" },
  { label: "Бирюзовый", value: "#40E0D0" },
  { label: "Лаймовый", value: "#32CD32" },
  { label: "Сливовый", value: "#DDA0DD" },
  { label: "Хаки", value: "#F0E68C" },
  { label: "Индиго", value: "#4B0082" },
];

const elementMenuProject = [
  {
    name: "Add project above",
    icon: "CaretTop",
    style: "",
    disabled: false,
    action: MenuAction.AddAbove,
    visible: true,
  },
  {
    name: "Add project below",
    icon: "CaretBottom",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: false,
    visible: true,
    action: MenuAction.AddBelow,
  },
  {
    name: "Change",
    icon: "EditPen",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.Edit,
  },
  {
    name: "Add to favorites",
    icon: "Star",
    style: "",
    disabled: false,
    visible: true,
    action: MenuAction.AddToFavorites,
  },
  {
    name: "Remove from favorites",
    icon: "Star",
    style: "",
    disabled: false,
    visible: false,
    action: MenuAction.RemoveFromFavorites,
  },
  {
    name: "Duplicate",
    icon: "DocumentCopy",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.Duplicate,
  },
  {
    name: "General access",
    icon: "Avatar",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.GeneralAccess,
  },
  {
    name: "Copy project link",
    icon: "Link",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.CopyLink,
  },
  {
    name: "Save as template",
    icon: "Reading",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.SaveAsTemplate,
  },
  {
    name: "View template",
    icon: "Monitor",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.ViewTemplate,
  },
  {
    name: "Import from CSV",
    icon: "Download",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.ImportCSV,
  },
  {
    name: "Export CSV",
    icon: "Upload",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.ExportCSV,
  },
  {
    name: "Add tasks by email",
    icon: "Message",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.AddByEmail,
  },
  {
    name: "Project calendar feed",
    icon: "List",
    style: "",
    disabled: true,
    visible: true,
    action: MenuAction.CalendarFeed,
  },
  {
    name: "Action log",
    icon: "Notebook",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.ActionLog,
  },
  {
    name: "Add extension",
    icon: "Expand",
    style: "border-bottom: 1px solid rgb(228, 228, 228)",
    disabled: true,
    visible: true,
    action: MenuAction.AddExtension,
  },
  {
    name: "Add archive",
    icon: "DataLine",
    style: "",
    disabled: false,
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
const clearInput = () => {
  nameProject.value != ""
    ? (isDisabled.value = false)
    : (isDisabled.value = true);
};
onMounted(() => {
  if (colors.length > 0) {
    selectedColor.value = colors[0].value;
  }
});
</script>

<template>
  <el-dialog
    :width="600"
    v-model="props.dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    :align-center="true"
    :header-class="'modal-header'"
    :body-class="'modal-body'"
    :footer-class="'modal-footer'"
  >
    <template #header>
      <span class="modal-title">Add project</span>
    </template>
    <template #default>
      <div class="name-project">
        <label for=""> Name</label>
        <el-input
          v-model="nameProject"
          style="width: 100%"
          maxlength="20"
          placeholder="Please input"
          show-word-limit
          type="text"
          :input="clearInput()"
        />
      </div>

      <div class="color-project">
        <label for=""> Color</label>
        <div class="color-input">
          <div
            class="selected-color"
            :style="{ background: selectedColor }"
          ></div>
          <el-select
            v-model="selectedColor"
            placeholder="Select"
            style="width: 100%"
            autocomplete="dawdawd"
          >
            <el-option
              v-for="item in colors"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style="display: flex; align-items: center"
            >
              <span
                :style="{
                  float: 'left',
                  fontSize: '13px',
                  height: '15px',
                  width: '15px',
                  borderRadius: '50%',
                  background: item.value,
                }"
              >
              </span>
              <span style="float: left; margin-left: 40px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="favorites-project">
        <el-switch v-model="isFavorites" />
        <label for="">Add to favorites</label>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('closeModal')">Cancel</el-button>
        <el-button
          :disabled="isDisabled"
          type="primary"
          @click="
            $emit(
              'closeModal',
              {
                id: Date.now(),
                name: nameProject,
                color: selectedColor,
                favorite: isFavorites,
                archived: false,
                tasks: [],
                section: [],
                menuSetting: JSON.parse(JSON.stringify(elementMenuProject)),
              },
              ((nameProject = ''), (isFavorites = false))
            )
          "
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.modal-title {
  font-size: 20px;
  color: black;
  font-weight: 500;
}
.modal-header {
  border-bottom: 1px solid rgb(222, 222, 222);
}
.modal-body {
  height: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-footer {
  border-top: 1px solid rgb(222, 222, 222);
}
.items-modal {
  flex: 1;
  overflow: auto;
}
.name-project {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.name-project label {
  font-size: 18px;
  font-weight: 500;
  color: black;
}

.color-project {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.color-input {
  display: flex;
  gap: 5px;
}
.color-project label {
  font-size: 18px;
  font-weight: 500;
  color: black;
}
.selected-color {
  width: 30px;
  border-radius: 6px;
}
.favorites-project {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.add-item {
}
.input {
  display: flex;
}
</style>
