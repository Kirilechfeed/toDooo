<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref("");
const message = ref("");
const validate = ref(false);
const sendForm = () => {
  validate.value = true;
  if (inputValue.value.length == 0) {
    message.value = "Имя обязательно";
  } else if (inputValue.value.length < 3) {
    message.value = "Имя должно быть не короче 3 символов";
  } else {
    message.value = `Спасибо, ${inputValue.value}!`;
  }
};
</script>

<template>
  <div class="form">
    <input v-model="inputValue" type="text" placeholder="Type name" />
    <button @click="sendForm">Send</button>
    <span v-if="validate">{{ message }}</span>
  </div>
</template>

<style></style>
