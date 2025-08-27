<template>
  <div>
    <div class="input-container">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="handleSubmit"
        :placeholder="placeholder"
      />
      <button class="button" @click="handleSubmit">
        {{ isEditing ? 'Lưu' : 'Submit' }}
      </button>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  props: {
    value: String,
    placeholder: String,
    isEditing: Boolean
  },
  data() {
    return {
      errorMessage: '',
      forbiddenWords: ['fuck']
    }
  },
  watch: {
    value(newValue) {
      this.checkForbiddenWords(newValue);
    }
  },
  methods: {
    checkForbiddenWords(input) {
      for (let word of this.forbiddenWords) {
        if (input.toLowerCase().includes(word)) {
          this.errorMessage = 'từ này bị cấm';
          return;
        }
      }
      this.errorMessage = '';
    },
    handleSubmit() {
      if (this.errorMessage) return;
      this.$emit('submit');
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #42b983;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.3);
}

.button {
  background-color: #42b983;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  color: white;
  font-weight: bold;
}

.button:hover {
  background-color: #36966e;
  transform: scale(1.05);
}

.error {
  color: red;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
}
</style>
