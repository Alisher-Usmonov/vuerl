<template>
  <div class="p-3 bg-white/50 shadow-md rounded-md w-full">
    <button
      :class="`flexbox bg-red-500 p-2 rounded-md text-white outline-none ${
        selectedItems.length ? '' : 'opacity-50'
      }`"
      :disabled="selectedItems.length === 0"
      @click="deleteItems"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionsBar",
  props: {
    selectedItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    deleteItems() {
      this.$emit("delete-items");
    },
  },
};
</script>
