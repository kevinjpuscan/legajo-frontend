<template>
  <div>
    <div class="content">
      <span class="button is-success is-light" @click="handleNew">
        Agregar concepto
      </span>
      <ul>
        <li v-for="(concept, index) in concepts" :key="index">
          {{ concept.concept }} | S./{{ concept.amount }}
          <span
            class="delete"
            aria-label="delete"
            @click="handleDelete(index)"
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    new: {
      type: Function,
      default: () => {},
    },
    concepts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleDelete(index) {
      this.$emit('remove', index)
    },
    handleNew() {
      this.$emit('new')
    },
  },
}
</script>
