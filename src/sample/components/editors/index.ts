const modules = import.meta.glob('./*/index.ts', { eager: true });
const components = {};
for (const path in modules) {
  const p = path.split('/')[1];
  components[p + '-editor'] = modules[path];
}

export default components;
