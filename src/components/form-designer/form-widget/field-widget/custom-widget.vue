<template>
  <form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <section class="custom-section">
      <slot 
        ref="fieldEditor" 
        v-bind="field.options" 
        :size="widgetSize" 
        :model-value="fieldModel"
        @update:modelValue="(val) => fieldModel = val"
        @change="handleOnChange" 
        @click="handleButtonWidgetClick"
        @focus="handleFocusCustomEvent"
        @blur="handleBlurCustomEvent"
        @input="handleInputCustomEvent"
        :on-exceed="handleFileExceed" 
        :before-upload="beforeFileUpload"
        :on-success="handleFileUpload" 
        :on-error="handleUploadError"
      >
      </slot>
    </section>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper'
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n";
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

  export default {
    name: "custom-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
      customEvents: {
        type: Object,
        default: () => ({})
      },

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },

    },
    components: {
      FormItemWrapper,
    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: [],
      }
    },
    computed: {

    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      
      this.initOptionItems()
      this.initFieldModel()
      this.registerToRefList()
      this.initEventHandler()
      this.buildFieldRules()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
      Object.keys(this.field.options).filter(key => key.startsWith('on') && !["onCreated",
        "onMounted",
        "onClick",
        "onInput",
        "onChange",
        "onFocus",
        "onBlur",
        "onRemoteQuery",
        "onBeforeUpload",
        "onUploadSuccess",
        "onUploadError",
        "onFileRemove",
        "onValidate"].includes(key)
      ).forEach(key => {
        if (typeof this.field.options[key] == 'string') {
          const onHandle = new Function(...(this.customEvents[key] || []), this.field.options[key]);
          this.field.options[key] = (...args) => {
            onHandle.call(this, ...args);
          }
        }
      })

    },

    beforeUnmount() {
      this.unregisterFromRefList()
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../styles/global.scss"; //* static-content-wrapper已引入，还需要重复引入吗？ *//

</style>
