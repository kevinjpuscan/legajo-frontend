<template>
  <ValidationProvider
    v-slot="{ errors, valid, required }"
    ref="provider"
    :name="$attrs.name || 'cargo'"
    :rules="$attrs.rules || {}"
    tag="div"
    class="form-select"
  >
    <FormLabel
      :errors="errors"
      :valid="valid"
      :required="required"
      label="Servidor Público"
    >
      <multiselect
        v-model="optionSelect"
        :class="{ 'is-danger': errors[0], 'is-success': valid }"
        select-label="Select option"
        deselect-label="Deselect option"
        :options="workers"
        group-values="options"
        group-label="label"
        placeholder="Buscar por nombre, apellido o DNI"
        label="title"
        name="worker"
        track-by="title"
        :internal-search="false"
        @search-change="searchWorkers"
        @input="selectOption"
        @close="close"
      >
        <span
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"
        >
        </span>
        <div slot="noResult">
          <span v-if="selectLoading">Cargando...</span>
          <span v-else>Ops! no fueron encontrado elementos</span>
        </div>
      </multiselect>

      <slot v-if="canVisibleSuggest" name="suggest-occupation"></slot>
    </FormLabel>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import FormLabel from '~/components/Form/FormLabel'

export default {
  name: 'SelectOccupation',
  components: {
    FormLabel,
    ValidationProvider,
    Multiselect,
  },
  props: {
    occupation: {
      default: () => {},
      type: Object,
    },
    meta: {
      default: false,
      type: Boolean,
    },
  },
  async fetch() {
    try {
      this.filter = {
        _where: {
          _or: [
            { first_names_contains: this.titleSearch },
            { last_names_contains: this.titleSearch },
            { identification_number_contains: this.titleSearch },
          ],
        },
      }
      const workers = await this.$repository.worker.findAll(this.filter)
      console.log(workers)
      this.workers = workers.map((worker) => ({
        ...worker,
        title: `${worker.first_names} ${worker.last_names} | ${worker.identification_number}`,
      }))
    } catch (e) {
      this.$buefy.notification.open({
        message: 'Ha ocurrido un error inesperado',
        type: 'is-danger',
        autoclose: true,
        duration: 10000,
      })
    }
  },
  data() {
    return {
      selectLoading: false,
      titleSearch: '',
      filter: {},
      optionSelect: null,
      workers: [],
      justClosed: false,
    }
  },
  computed: {
    canVisibleSuggest() {
      return (
        this.workers.length > 0 &&
        this.justClosed &&
        !!this.optionSelect === false
      )
    },
  },
  watch: {
    occupation(val) {
      this.optionSelect = val
    },
  },
  methods: {
    async close() {
      await this.$refs.provider.validate()
      this.justClosed = true
      this.$emit('change', {
        title: this.titleSearch,
        visibleSuggest: this.canVisibleSuggest,
      })
    },
    selectOption(item) {
      this.justClosed = false
      this.optionSelect = item
      this.$emit('select', item)
    },
    async searchWorkers(title) {
      if (title) this.titleSearch = title
      this.$emit('change', {
        title,
        visibleSuggest: this.canVisibleSuggest && !!title,
      })
      this.selectLoading = true
      try {
        await this.$fetch()
      } catch (e) {
        this.$buefy.notification.open({
          message: 'Ha ocurrido un error inesperado',
          type: 'is-danger',
          autoclose: true,
          duration: 10000,
        })
      } finally {
        this.selectLoading = false
      }
    },
  },
}
</script>
