import Widgets from './index.vue';

export default Widgets;

export const config = {
  name: '用户选择器',
  type: 'userSelector',
  icon: 'byd-user',
  formItemFlag: true,
  dataType: 'string',
  options: {
    name: '',
    label: '',
    labelAlign: '',
    labelWidth: null,
    labelHidden: false,
    columnWidth: '200px',
    disabled: false,
    hidden: false,
    required: false,
    requiredHint: '',
    userMultiple: true,
    //-------------------
    customClass: '', //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    //-------------------
    onCreated: '',
    onMounted: '',
    onConfirm: '',
  },
};

export const event = {
  onConfirm: ['users'],
};
