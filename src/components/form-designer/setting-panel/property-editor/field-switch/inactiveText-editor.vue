<template>
  <el-form-item :label="i18nt('designer.setting.inactiveText')">
    <el-input v-model="optionModel.inactiveText">
      <template #suffix>
        <el-button link @click="$refs.i18nRef?.open()"><svg-icon icon-class="byd-international" /></el-button>
      </template>
    </el-input>
    <i18n-dlg ref="i18nRef" v-model:i18n="optionModel.inactiveI18n" :zh="optionModel.inactiveText"></i18n-dlg>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import SvgIcon from '@/components/svg-icon'
  import i18nDlg from "@/components/form-designer/setting-panel/i18nDlg"

  export default {
    name: "inactiveText-editor",
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
  }
</script>

<style scoped>

</style>
