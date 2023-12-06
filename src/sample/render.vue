<script setup lang="ts">
  import { defineProps, defineEmits, defineExpose, ref, watch, onMounted, computed, nextTick } from 'vue';
  import CustomComponents from './components/widgets';
  import { UploadRawFile } from 'element-plus';
  const emit = defineEmits(['update:modelValue']);
  const props = withDefaults(
    defineProps<{
      setting: any;
      modelValue: any;
      disabled?: boolean;
    }>(),
    {
      setting: () => ({
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
      modelValue: () => ({}),
      disabled: false,
    },
  );

  const data = ref();
  const dataId = ref('');

  watch(
    () => props.modelValue,
    (val) => {
      data.value = val;
    },
  );

  watch(
    data,
    (val) => {
      emit('update:modelValue', val);
    },
    { deep: true },
  );

  const vFormRef = ref();
  function validate() {
    return vFormRef.value
      .getFormData()
      .then(() => true)
      .catch(() => false);
  }
  function setData(data: any) {
    vFormRef.value?.setFormData(data);
  }
  function resetForm() {
    vFormRef.value?.resetForm();
  }

  defineExpose({
    validate,
    setData,
    resetForm,
  });

  onMounted(async () => {
    dataId.value = props.modelValue.id;
    data.value = props.modelValue;
    vFormRef.value.setFormJson(props.setting);
    nextTick(() => {
      vFormRef.value.setFormData(data.value);
    });
  });

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
</script>

<template>
  <v-form-render
    class="px-5"
    :form-data="data"
    :form-json="setting"
    ref="vFormRef"
    @form-change="(_, __, ___, val) => (data = val)"
    previewState
    :disabled="disabled"
    :options-data="{}"
    :global-dsv="{
      dataId,
    }"
    :custom-widgets="customWidgets"
    :custom-events="customEvents"
  >
    <template v-for="(component, name) in CustomComponents" #[name]="scoped" :key="name">
      <component :is="(component as any).default" v-bind="scoped" />
    </template>
  </v-form-render>
</template>

<style scoped lang="less"></style>
