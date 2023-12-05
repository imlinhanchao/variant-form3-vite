<template>
  <div id="app">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" :custom-widgets="customWidgets">
      <!--
      <template #customToolButtons>
        <el-button type="text" @click="doTest">测试btn</el-button>
      </template>
      -->
      <template #custom-upload-widget="scoped">
        <el-upload
          class="upload-demo"
          v-bind="scoped"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
          :auto-upload="false">
          <el-button>上传</el-button>
        </el-upload>
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

export default {
  name: 'App',
  components: {
    VFormDesigner,
  },
  data () {
    return {
      //全局数据源变量
      globalDsv: {
        testApiHost: 'http://www.test.com/api',
        testPort: 8080,
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
          onConfirm: ['users'],
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
