<template>
  <el-form-item label-width="0">
    <el-divider class="custom-divider-margin-top">{{i18nt('designer.setting.optionsSetting')}} 
      <el-tooltip effect="light" content="推荐使用导入选项">
          <svg-icon icon-class="el-info" /></el-tooltip>
      </el-divider>
    <option-items-setting :designer="designer" :selected-widget="selectedWidget"></option-items-setting>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import OptionItemsSetting from "@/components/form-designer/setting-panel/option-items-setting"
  import SvgIcon from "@/components/svg-icon/index";

  export default {
    name: "optionItems-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    components: {
      OptionItemsSetting,
      SvgIcon
    }
  }
</script>

<style scoped>

</style>
