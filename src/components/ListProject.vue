<script setup lang="ts">
import router from "../router";
import type { IProject } from "../models/index";
import MenuSetting from "./MenuSetting.vue";
import { inject, ref, computed } from "vue";
import { MenuAction } from "../enum/index";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = computed(() => {
  const id = route.params.id;
  return Array.isArray(id) ? Number(id[0]) : Number(id);
});
const props = defineProps<{
  myProject: IProject[];
}>();

const currentProject = ref(-1);
const onDelete = inject<(id: number) => void>(MenuAction.Delete);
const onArchive = inject<(id: number) => void>(MenuAction.Archive);
const onFavorite = inject<
  (id: number, action: MenuAction, isFavorite: boolean) => void
>(MenuAction.AddToFavorites);
const onRemoveFromFavorites = inject<
  (id: number, action: MenuAction, isFavorite: boolean) => void
>(MenuAction.RemoveFromFavorites);
const onAddAbove = inject<(value: string) => void>(MenuAction.AddAbove);
const onAddBelow = inject<(value: string) => void>(MenuAction.AddBelow);

const handleAction = (action: MenuAction, id: number) => {
  switch (action) {
    case MenuAction.Delete:
      onDelete?.(id);
      break;
    case MenuAction.Archive:
      onArchive?.(id);
      break;
    case MenuAction.AddToFavorites:
      onFavorite?.(id, action, true);
      break;
    case MenuAction.RemoveFromFavorites:
      onRemoveFromFavorites?.(id, action, false);
      break;
    case MenuAction.AddAbove:
      onAddAbove?.("unshift");
      break;
    case MenuAction.AddBelow:
      onAddBelow?.("push");
  }
};

const handleClick = (id: number, index: number) => {
  router.push({ path: `/myProject/${id}`, replace: true });
  currentProject.value = index;
};
</script>

<template>
  <li
    v-for="(n, index) in props.myProject"
    :key="n.id"
    @click="handleClick(n.id, index)"
    :class="{ 'active-item': currentProject == index && projectId == n.id }"
  >
    <div class="name-projects">
      <el-icon :size="25"><Cpu /></el-icon> <span>{{ n.name }}</span>
    </div>

    <MenuSetting
      :size="20"
      :name="'project'"
      :listMenu="n.menuSetting"
      class="more"
      @select="(action) => handleAction(action, n.id)"
    />
  </li>
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 4px;
  border-bottom: 1px solid white;
}
li:hover {
  border-bottom: 1px solid rgb(228, 228, 228);
}
li:hover .more {
  opacity: 1;
  transition: all 0.2s ease-in-out;
}
.active-item {
  background: #fdffdb;
}
.name-projects {
  display: flex;
  align-items: center;
  gap: 18px;
}
.more {
  opacity: 0;
  padding: 2px;
  border-radius: 3px;
}
.more-active {
  opacity: 1;
}
.more:hover {
  background: #cfe2ff;
}
</style>
