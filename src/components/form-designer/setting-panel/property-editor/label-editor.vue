<template>
  <el-form-item :label="i18nt('designer.setting.label')" v-if="!noLabelSetting">
    <el-input type="text" v-model="optionModel.label">
      <template #suffix>
        <el-button link @click="$refs.i18nRef?.open()"><svg-icon icon-class="byd-international" /></el-button>
      </template>
    </el-input>
    <i18n-dlg ref="i18nRef" v-model:i18n="optionModel.labelI18n" :zh="optionModel.label"></i18n-dlg>
  </el-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"
  import i18nDlg from "@/components/form-designer/setting-panel/i18nDlg"

  export default {
    name: "label-editor",
    mixins: [i18n],
    components: {
      i18nDlg,
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      noLabelSetting() {
        return (this.selectedWidget.type === 'static-text') || (this.selectedWidget.type === 'html-text')
        //|| (this.selectedWidget.type === 'divider')
      },

    }
  }
</script>

<style lang="scss" scoped>

</style>
