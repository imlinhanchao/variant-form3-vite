<template>
  <div>
    <el-form-item :label="i18nt('designer.setting.htmlContent')">
      <template #label>
      <span>{{i18nt('designer.setting.htmlContent')}}</span>
      <el-button link @click="$refs.i18nRef?.open()"><svg-icon icon-class="byd-international" /></el-button>
    </template>
    </el-form-item>
    <el-form-item label-width="0">
      <el-input type="textarea" v-model="optionModel.htmlContent" :rows="5" class="html-content-editor"></el-input>
    </el-form-item>
    <i18n-dlg ref="i18nRef" v-model:i18n="optionModel.htmlContentI18n" :zh="optionModel.htmlContent"></i18n-dlg>
  </div>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"
  import i18nDlg from "@/components/form-designer/setting-panel/i18nDlg"


  export default {
    name: "htmlContent-editor",
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
  .html-content-editor {
    font-size: 13px;
  }

</style>
