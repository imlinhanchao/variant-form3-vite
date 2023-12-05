<template>
  <el-form-item label="onBlur" label-width="150px">
    <el-button type="info" icon="el-icon-edit" plain round @click="editEventHandler(type, eventParams)">
      {{type}}
    </el-button>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "onCustom-editor",
    mixins: [i18n, eventMixin],
    props: {
      type: String,
      params: Array,
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        eventParams: this.params || [],
      }
    }
  }
</script>

<style scoped>

</style>
