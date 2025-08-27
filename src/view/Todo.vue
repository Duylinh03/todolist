<template>
  <div>
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Tất cả</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Đã hoàn thành</button>
    </div>

    <div class="form-input">
      <TodoInput
        v-model="inputText"
        :placeholder="editingIndex === null ? 'nhập vào ô này' : 'sửa đi chứ...'"
        :isEditing="editingIndex !== null"
        @submit="editingIndex === null ? addTodo() : confirmEdit()"
      />

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <TodoList
        :items="filteredTodos"
        @remove="removeTodo"
        @edit="startEdit"
      />
    </div>
  </div>
</template>

<script>
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'

export default {
  name: 'TodoApp',
  components: { TodoInput, TodoList },
  data() {
    return {
      todo: '',
      todos: [],
      errorMessage: '',
      filter: 'all',
      editingIndex: null,
      editedText: ''
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.done);
      }
      return this.todos;
    },
    inputText: {
      get() {
        return this.editingIndex === null ? this.todo : this.editedText;
      },
      set(value) {
        if (this.editingIndex === null) {
          this.todo = value;
        } else {
          this.editedText = value;
        }
      }
    }
  },
  methods: {
    addTodo() {
      const trimmed = this.todo.trim();
      if (trimmed === '') {
        this.errorMessage = 'nhập từ khóa rồi submit';
      } else if (this.todos.some(todo => todo.text === trimmed)) {
        this.errorMessage = 'đã tồn tại';
      } else {
        this.todos.push({ id: Date.now(), text: trimmed, done: false });
        this.todo = '';
        this.errorMessage = '';
      }
    },
    removeTodo(index) {
      const realIndex = this.todos.findIndex(todo => todo.id === this.filteredTodos[index].id);
      if (realIndex !== -1) {
        this.todos.splice(realIndex, 1);
      }
    },
    startEdit(index) {
      const todo = this.filteredTodos[index];
      this.editingIndex = this.todos.findIndex(t => t.id === todo.id);
      this.editedText = todo.text;
    },
    confirmEdit() {
      const trimmed = this.editedText.trim();
      if (trimmed !== '') {
        this.todos[this.editingIndex].text = trimmed;
      }
      this.editingIndex = null;
      this.editedText = '';
    }
  },
  created() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  },
  watch: {
    todos: {
      handler(newList) {
        localStorage.setItem('todos', JSON.stringify(newList));
      },
      deep: true
    }
  }
}
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
