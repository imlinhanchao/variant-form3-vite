<template>
  <div id="app">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" :custom-widgets="customWidgets" :custom-Events="customEvents">
      <!--
      <template #customToolButtons>
        <el-button type="text" @click="doTest">测试btn</el-button>
      </template>
      -->
      <template #custom-upload-widget="scoped">
        <Custom v-bind="scoped" />
      </template>
      <template #autoUpload-editor="{ optionModel }">
        <el-form-item label="自动上传" label-width="150px">
          <el-switch v-model="optionModel.autoUpload"></el-switch>
        </el-form-item>
      </template>
    </VFormDesigner>
  </div>
</template>

<script>
import VFormDesigner from './components/form-designer/index.vue'
import Custom from './custom.vue'

export default {
  name: 'App',
  components: {
    VFormDesigner,
    Custom,
  },
  data () {
    return {
      //全局数据源变量
      globalDsv: {
        testApiHost: 'http://www.test.com/api',
        testPort: 8080,
      },
      customEvents: {
        onConfirm: ['users'],
      },
      customWidgets: [{
        name: '自定义上传',
        type: 'custom-upload',
        icon: 'custom-upload',
        formItemFlag: true,
        options: {
          name: '',
          label: '',
          labelAlign: '',
          labelWidth: null,
          labelHidden: false,
          columnWidth: '200px',
          disabled: false,
          hidden: false,
          required: false,
          requiredHint: '',
          //-------------------
          uploadTip: '',
          multipleSelect: false,
          showFileList: true,
          limit: 3,
          fileMaxSize: 5, //MB
          fileTypes: ['doc', 'docx', 'xls', 'xlsx'],
          autoUpload: false,
          //headers: [],
          //-------------------
          customClass: '',  //自定义css类名
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          //-------------------
          onCreated: '',
          onMounted: '',
          onBeforeUpload: '',
          onUploadSuccess: '',
          onUploadError: '',
          onFileRemove: '',
          onValidate: '',
          onChange: '',
          onConfirm: '',
        }
      }]
    }
  },
  computed: {
    //
  },
  methods: {
    doTest () {
      let fieldList = this.$refs.vfDesignerRef.getFieldWidgets(null, true)
      console.log('test', fieldList)
    }

  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
