<template>
  <el-dialog
    title="国际化配置"
    v-model="visible"
    width="800px"
    destroy-on-close
  >
    <el-container>
      <el-header height="auto">
        <section>
          <el-input style="width: 80px;" v-model="lang" clearable placeholder="语言代码" />
          <el-input style="width: 150px;" v-model="text" clearable placeholder="翻译结果" @keydown.enter="addLang" />
          <el-button type="primary" @click="addLang">添加语言</el-button>
        </section>
        <section>
          <el-button type="primary" @click="save">保存</el-button>
        </section>
      </el-header>
      <el-main>
        <p>中文：{{ zhText }}</p>
        <el-table :data="Object.entries(i18nConfig)" stripe>
          <el-table-column prop="0" label="语言代码" align="center" width="100"></el-table-column>
          <el-table-column prop="1" label="翻译结果" align="center">
            <template #default="{ row }">
              <el-input v-model="i18nConfig[row[0]]" clearable />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="deleteLang(row[0])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { ref, computed, watch } from 'vue'
  const props = withDefaults(defineProps<{
    i18n?: Record<string, string>,
    zh?: string;
  }>(), {
    i18n: () => ({}),
    zh: ''
  })

  const emit = defineEmits(['update:i18n'])

  const visible = ref(false)
  const langs = computed(() => Object.keys(i18nConfig.value));
  const lang = ref('');
  const text = ref('');
  const i18nConfig = ref({ ...props.i18n })
  const zhText = ref(props.zh)

  watch(() => props.zh, (val) => {
    zhText.value = val;
  })
  watch(() => props.i18n, (val) => {
    i18nConfig.value = { ...val }
  })

  function addLang() {
    if (langs.value.includes(lang.value)) {
      ElMessage.error('语言代码已存在');
      return;
    }
    if (lang.value && text.value) {
      i18nConfig.value[lang.value] = text.value;
      lang.value = '';
      text.value = '';
    }
  }

  function deleteLang(lang: string) {
    delete i18nConfig.value[lang];
  }

  function save() {
    emit('update:i18n', i18nConfig.value)
    if (confirmResolve) {
      confirmResolve(i18nConfig.value);
    }
    visible.value = false
  }

  let confirmResolve: (value: any) => void;
  defineExpose({
    open(i18n?: any, zh?: string) {
      visible.value = true
      if (i18n) {
        zhText.value = zh;
        i18nConfig.value = { ...i18n }
        return new Promise((resolve) => {
          confirmResolve = resolve;
        });
      }
    }
  })
</script>
<style lang="css" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
}
.el-main {
  padding: 0;
}
.el-main p {
  text-align: center;
}
</style>