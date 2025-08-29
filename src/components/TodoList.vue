<template>
  <transition-group name="fade" tag="ul" class="todo-list">
    <li v-for="(todo, index) in items" :key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <div class="action-buttons">
        <button class="edit-btn" @click="$emit('edit', todo.id)">✏️</button>
        <button class="delete-btn" @click="$emit('remove', todo.id)">🗑️</button>
      </div>
    </li>
  </transition-group>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] }
});

defineEmits(['edit', 'remove']);
</script>

<style scoped>
.todo-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}
.todo-list li {
  max-width: 420px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 12px 0;
  padding: 12px;
  word-break: break-word;
  font-size: 20px;
  transition: transform 0.3s ease;
}

.done {
  text-decoration: line-through;
  color: gray;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.delete-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  transition: color 0.2s ease;
}
.action-buttons {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.action-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  transition: color 0.2s ease;
}
</style>