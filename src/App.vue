<template>
  <div id="app">
    <VFormDesigner ref="vfDesignerRef" :global-dsv="globalDsv" :custom-widgets="customWidgets"
      :custom-Events="customEvents">
      <template v-for="(component, name) in Widgets" #[name]="scoped" :key="name">
        <component :is="component.default" v-bind="scoped" />
      </template>
    </VFormDesigner>
  </div>
</template>

<script>
import VFormDesigner from './components/form-designer/index.vue'
import CustomComponents from './widgets';

export default {
  name: 'App',
  components: {
    VFormDesigner,
  },
  data () {
    return {
      //全局数据源变量
      globalDsv: {
      },
    }
  },
  computed: {
    customWidgets: () =>
      Object.values(CustomComponents)
        .map((c) => c.config)
        .filter((c) => c),
    customEvents: () =>
      Object.values(CustomComponents)
        .map((c) => c.event)
        .filter((c) => c)
        .reduce((p, c) => ({ ...p, ...c }), {}),
    Widgets: () => CustomComponents
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
