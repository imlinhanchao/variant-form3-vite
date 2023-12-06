<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      optionModel: any;
    }>(),
    {},
  );
  const emit = defineEmits(['update:optionModel']);

  const options = ref(props.optionModel);

  watch(
    () => props.optionModel,
    (val) => {
      options.value = val;
    },
  );

  watch(
    () => options.value,
    (val) => {
      emit('update:optionModel', val);
    },
  );
</script>

<template>
  <el-form-item label="多用户选择" label-width="150px">
    <el-switch v-model="options.userMultiple" />
  </el-form-item>
</template>
