<template>
  <section>
    <b-field :label="label">
      <b-autocomplete
        v-model="name"
        :data="data"
        :placeholder="placeHolder"
        field="title"
        :loading="isLoading"
        icon="magnify"
        @typing="typing"
        @select="(option) => (selected = option)"
      >
        <template slot-scope="props">
          <span>{{ props.option.title }}</span>
        </template>
        <template #empty>No hay resultados para {{ name }}</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    placeHolder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: null,
      name: this.value,
    }
  },
  watch: {
    selected(val) {
      this.$emit('selected', val)
    },
    value(val) {
      this.name = val
    },
  },
  methods: {
    typing(text) {
      this.$emit('typing', text)
    },
  },
}
</script>
