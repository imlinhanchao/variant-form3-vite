<script setup lang="ts" name="userSelector">
  import ButtonPlus from '@/components/Button';
  import UserDialoger from '@/components/UserDialoger/index.vue';

  const props = withDefaults(
    defineProps<{
      modelValue: string;
      userMultiple?: boolean;
    }>(),
    {
      modelValue: '',
      userMultiple: true,
    },
  );
  const emit = defineEmits(['update:modelValue', 'confirm']);

  const data = ref<
    {
      empNumber: string;
      empName: string;
    }[]
  >([]);

  watch(
    () => props.modelValue,
    (val) => {
      if (!val) return;
      data.value = val.split(',').map((u) => ({
        empName: u.split('(')[0],
        empNumber: u.split('(')[1].replace(')', ''),
      }));
    },
  );

  watch(
    () => data.value,
    (val) => {
      emit('update:modelValue', val.map((u) => `${u.empName}(${u.empNumber})`).join(','));
    },
  );

  const userRef = ref<InstanceType<typeof UserDialoger> | null>();
  function open() {
    userRef.value?.open(data.value || []);
  }
  function addUsers(users) {
    data.value = users.map((u) => ({
      empNumber: u.empNumber,
      empName: u.empName,
    }));
    emit('confirm', users);
  }
</script>

<template>
  <section>
    <ButtonPlus
      title="选择用户"
      type="primary"
      icon="el-icon-circle-plus-filled"
      @click="open"
      circle
      link
    />
    <template v-for="(tag, i) in data" :key="tag.empNumber">
      <el-tag class="mx-1" @close="data.splice(i, 1)" closable>
        <span>{{ tag.empName }} ({{ tag.empNumber }})</span>
      </el-tag>
    </template>
    <UserDialoger ref="userRef" @confirm="addUsers" :multiple="userMultiple" />
  </section>
</template>
