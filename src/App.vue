<template>
  <div id="app">
    <Designer />
  </div>
</template>

<script>
import Designer from './sample/index.vue'

export default {
  name: 'App',
  components: {
    Designer,
  },
  data () {
    return {
      //全局数据源变量
      globalDsv: {
      },
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
