<script lang="ts" setup>
import { ref } from "vue";
import type { IItemMenu } from "../models/index";

import { ElIcon, ElPopover } from "element-plus";
import MenuItem from "./MenuItem.vue";
import { MenuAction } from "../enum/index";

const props = defineProps<{
  size: 20 | 25 | 30;
  name: "project" | "section" | "task";
  listMenu: IItemMenu[];
}>();
const emit = defineEmits<{
  (e: "select", action: MenuAction): void;
}>();

const buttonRef = ref();
const popoverRef = ref();

const handleSelect = (action: MenuAction) => {
  emit("select", action);
};
</script>

<template>
  <div class="button-project">
    <div style="display: flex">
      <el-icon
        :size="props.size"
        ref="buttonRef"
        @click.stop=""
        class="icon-button"
        ><MoreFilled
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
          <MenuItem
            v-for="item in props.listMenu"
            :item="item"
            @select="handleSelect"
          />
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style scoped>
.popover {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.icon-button {
  padding: 2px;
  transition: all 0.3s ease;
  color: rgb(115, 115, 115);
}
.icon-button:hover {
  background: #cfe2ff;
  color: rgb(59, 59, 59);
  border-radius: 5px;
  cursor: pointer;
}
</style>
