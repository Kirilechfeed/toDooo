<script lang="ts" setup>
import { computed } from "vue";
import type { IItemMenu } from "../models/index";
import * as Icons from "@element-plus/icons-vue";
import { MenuAction } from "../enum/index";

const props = defineProps<{
  item: IItemMenu;
}>();
const emit = defineEmits<{
  (e: "select", action: MenuAction): void;
}>();
const IconComponent = computed(() => {
  return Icons[props.item.icon as keyof typeof Icons];
});
</script>

<template>
  <div
    v-if="props.item.visible"
    class="popover-item"
    :class="{ 'popover-item--disabled': props.item.disabled }"
    :style="props.item.style"
    @click="!props.item.disabled && emit('select', props.item.action)"
  >
    <el-icon :size="25" class="icon-button"><IconComponent /></el-icon>

    {{ props.item.name }}
  </div>
</template>

<style scoped>
.popover-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 8px 4px 10px;
  border-radius: 5px;
  gap: 10px;
}
.popover-item:hover {
  background: #cfe2ff;
}
.popover-item--disabled {
  color: rgb(224, 224, 224);
}
.popover-item--disabled:hover {
  background: none;
  cursor: auto;
}
</style>
