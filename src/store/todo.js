import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useTodoStore = defineStore('todo', () => {

  const todos = ref([]);
  const filter = ref('all');
  const errorMessage = ref('');
  const editingIndex = ref(null);
  const editedText = ref('');
  const todo = ref('');


  const saved = localStorage.getItem('todos');
  if (saved) {
    todos.value = JSON.parse(saved);
  }


  watch(todos, (newList) => {
    localStorage.setItem('todos', JSON.stringify(newList));
  }, { deep: true });


  const filteredTodos = computed(() => {
    if (filter.value === 'completed') {
      return todos.value.filter(todo => todo.done);
    }
    return todos.value;
  });


  const inputText = computed({
    get() {
      return editingIndex.value === null ? todo.value : editedText.value;
    },
    set(value) {
      if (editingIndex.value === null) {
        todo.value = value;
      } else {
        editedText.value = value;
      }
    }
  });


  function addTodo() {
    const trimmed = todo.value.trim();
    if (trimmed === '') {
      errorMessage.value = 'nhập từ khóa rồi submit';
    } else if (todos.value.some(t => t.text === trimmed)) {
      errorMessage.value = 'đã tồn tại';
    } else {
      todos.value.push({ id: Date.now(), text: trimmed, done: false });
      todo.value = '';
      errorMessage.value = '';
    }
  }

  function removeTodo(id) {
    const index = todos.value.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  }


function startEdit(id) {
  const index = todos.value.findIndex(t => t.id === id);
  if (index !== -1) {
    editingIndex.value = index;
    editedText.value = todos.value[index].text;
  }
}



  function confirmEdit() {
    const trimmed = editedText.value.trim();
    if (trimmed !== '') {
      todos.value[editingIndex.value].text = trimmed;
    }
    editingIndex.value = null;
    editedText.value = '';
  }


  function setFilter(newFilter) {
    filter.value = newFilter;
  }


  return {

    todos,
    filter,
    errorMessage,
    editingIndex,
    editedText,
    todo,

    
    filteredTodos,
    inputText,


    addTodo,
    removeTodo,
    startEdit,
    confirmEdit,
    setFilter
  };
});