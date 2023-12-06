const fs = require('fs');
const path = require('path');

function build() {
  fs.copyFileSync(path.resolve(__dirname, '../dist/designer/designer.umd.js'), path.resolve(__dirname, '../dist/designer.umd.js'));
  fs.copyFileSync(path.resolve(__dirname, '../dist/designer/designer.style.css'), path.resolve(__dirname, '../dist/designer.style.css'));
  fs.copyFileSync(path.resolve(__dirname, '../dist/render/render.style.css'), path.resolve(__dirname, '../dist/render.style.css'));
  fs.copyFileSync(path.resolve(__dirname, '../dist/render/render.umd.js'), path.resolve(__dirname, '../dist/render.umd.js'));
  fs.rmSync(path.resolve(__dirname, '../dist/designer'), { recursive: true, force: true });
  fs.rmSync(path.resolve(__dirname, '../dist/render'), { recursive: true, force: true });
}

build();