<script setup lang="ts">
  import { defineProps, defineEmits, defineExpose, ref, watch, onMounted, computed } from 'vue';
  import CustomComponents from './components';

  const props = withDefaults(
    defineProps<{
      modelValue: any;
    }>(),
    {
      modelValue: () => ({
        widgetList: [],
        formConfig: {
          modelName: 'formData',
          refName: 'vForm',
          rulesName: 'rules',
          labelWidth: 80,
          labelPosition: 'left',
          size: '',
          labelAlign: 'label-left-align',
          cssCode: '',
          customClass: [],
          functions: '',
          layoutType: 'PC',
          jsonVersion: 3,
          onFormCreated: '',
          onFormMounted: '',
          onFormDataChange: '',
        },
      }),
    },
  );

  const formData = ref<any>(props.modelValue); // 表单数据
  watch(
    () => props.modelValue,
    (val) => {
      formData.value = val;
      updateDesigner();
    },
  );

  watch(
    () => formData.value,
    (val) => {
      emit('update:modelValue', val);
    },
  );

  const designerRef = ref(); // 表单设计器
  const emit = defineEmits(['back', 'update:modelValue']);

  onMounted(async () => {
    updateDesigner();
  });

  function updateDesigner() {
    if (!designerRef.value) return;
    designerRef.value.designer.widgetList = formData.value.widgetList;
    designerRef.value.designer.formConfig = formData.value.formConfig || {
      modelName: 'formData',
      refName: 'vForm',
      rulesName: 'rules',
      labelWidth: 80,
      labelPosition: 'left',
      size: '',
      labelAlign: 'label-left-align',
      cssCode: '',
      customClass: [],
      functions: '',
      layoutType: 'PC',
      jsonVersion: 3,
      onFormCreated: '',
      onFormMounted: '',
      onFormDataChange: '',
    };
  }

  const customWidgets = computed(() =>
    Object.values(CustomComponents)
      .map((c: any) => c.config)
      .filter((c) => c),
  );
  const customEvents = computed(() =>
    Object.values(CustomComponents)
      .map((c: any) => c.event)
      .filter((c) => c)
      .reduce((p, c) => ({ ...p, ...c }), {}),
  );
  defineExpose({
    getFormData() {
      return designerRef.value?.getFormJson();
    },
  });

  const i18n = ref('zh-cn');
</script>

<template>
  <el-container>
    <el-main class="nopadding">
      <section>
        <v-form-designer
          ref="designerRef"
          id="form-designer"
          :designer-config="{
            languageMenu: false,
            externalLink: false,
            exportCodeButton: false,
          }"
          :custom-widgets="customWidgets"
          :custom-events="customEvents"
          :i18n="i18n"
        >
          <template v-for="(component, name) in CustomComponents" #[name]="scoped" :key="name">
            <component :is="(component as any).default" v-bind="scoped" />
          </template>
          <template #customToolButtons>
            <el-select v-model="i18n" style="width: 80px">
              <el-option label="中文" value="zh-cn"></el-option>
              <el-option label="English" value="en"></el-option>
            </el-select>
          </template>          
          <template #customPreviewButtons="{ i18n, changeI18n }">
            <el-select :model-value="i18n" @update:model-value="changeI18n" style="width: 100px">
              <el-option label="中文" value="zh-cn"></el-option>
              <el-option label="English" value="en"></el-option>
            </el-select>
          </template>
        </v-form-designer>
      </section>
    </el-main>
  </el-container>
</template>

<style scoped lang="less"></style>
