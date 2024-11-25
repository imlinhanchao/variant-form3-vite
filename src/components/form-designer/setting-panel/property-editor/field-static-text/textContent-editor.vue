<template>
  <el-form-item :label="i18nt('designer.setting.textContent')">
    <template #label>
      <span>{{i18nt('designer.setting.textContent')}}</span>
      <el-button link @click="$refs.i18nRef?.open()"><svg-icon icon-class="byd-international" /></el-button>
    </template>
    <el-input v-model="optionModel.textContent" type="textarea" :rows="3"></el-input>
    <i18n-dlg ref="i18nRef" v-model:i18n="optionModel.textContentI18n" :zh="optionModel.textContent"></i18n-dlg>
  </el-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"
  import i18nDlg from "@/components/form-designer/setting-panel/i18nDlg"

  export default {
    name: "textContent-editor",
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
