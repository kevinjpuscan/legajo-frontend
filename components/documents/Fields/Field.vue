<template>
  <div class="field-element">
    <field-text
      v-if="
        [FIELD_TYPES.TEXT, FIELD_TYPES.ENUM, FIELD_TYPES.NUMBER].includes(type)
      "
      :label="label"
      :value="value"
    />
    <field-date
      v-if="type === FIELD_TYPES.DATE"
      :label="label"
      :value="value"
    />
    <field-list
      v-if="type === FIELD_TYPES.LIST"
      :label="label"
      :values="value"
    />
    <div v-if="!FIELD_TYPES[type]">
      {{ `El tipo de dato del campo ${label}  no es gestionado` }}
    </div>
  </div>
</template>

<script>
import FieldList from './FieldList.vue'
import FIELD_TYPES from '~/constants/fieldTypes'
import FieldText from '~/components/documents/Fields/FieldText.vue'
import FieldDate from '~/components/documents/Fields/FieldDate.vue'
export default {
  components: {
    FieldText,
    FieldDate,
    FieldList,
  },
  props: {
    type: {
      type: String,
      default: () => FIELD_TYPES.TEXT,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Object, Array],
      default: () => '',
    },
  },
  data: () => ({
    FIELD_TYPES,
  }),
}
</script>
