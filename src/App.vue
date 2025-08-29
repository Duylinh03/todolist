<template>
  <div>
    <div class="filters">
      <button 
        @click="todoStore.setFilter('all')" 
        :class="{ active: todoStore.filter === 'all' }"
      >
        Tất cả
      </button>
      <button 
        @click="todoStore.setFilter('completed')" 
        :class="{ active: todoStore.filter === 'completed' }"
      >
        Đã hoàn thành
      </button>
    </div>
    <div class="form-input">
      <TodoInput
        v-model="todoStore.inputText"
        :placeholder="todoStore.editingIndex === null ? 'nhập vào ô này' : 'sửa đi chứ...'"
        :isEditing="todoStore.editingIndex !== null"
        @submit="todoStore.editingIndex === null ? todoStore.addTodo() : todoStore.confirmEdit()"
      />
      <p v-if="todoStore.errorMessage" class="error">{{ todoStore.errorMessage }}</p>
      <TodoList
        :items="todoStore.filteredTodos"
        @remove="todoStore.removeTodo"
        @edit="todoStore.startEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/store/todo';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

const todoStore = useTodoStore();
</script>

<style scoped>
.form-input {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
  text-align: left;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
  text-align: center;
}
.filters {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}
.filters button {
  padding: 10px 18px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
}
.filters button:hover {
  background-color: #42b983;
  color: white;
  transform: scale(1.05);
}
.filters button.active {
  background-color: #42b983;
  color: white;
}
</style>