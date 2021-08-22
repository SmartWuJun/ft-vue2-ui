<script>
import Basic from './basic';
import ButtonGroup from './button-group';
import Disabled from './disabled';
import Ghost from './ghost';
import Icon from './icon';
import Loading from './loading';
import Multiple from './multiple';
import Size from './size';
import Block from './block';
import CN from '../index.zh-CN.md';

const md = {
  cn: `# Button 按钮
          按钮用于开始一个即时操作。
          ## 何时使用
          标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
          ## 组件注册
          \`\`\`js
          import { Button } from 'ant-design-vue';
          Vue.use(Button);
          \`\`\`
          ## 代码演示`,
};
export default {
  category: 'Components',
  type: 'General',
  zhType: '通用',
  title: 'Button',
  subtitle: '按钮',
  render() {
    return (
      <div>
        <md cn={md.cn} />
        <demo-sort>
          <Basic />
          <ButtonGroup />
          <Disabled />
          <Ghost />
          <Icon />
          <Loading />
          <Multiple />
          <Size />
          <Block />
        </demo-sort>
        <api>
          <CN slot="cn" />
        </api>
      </div>
    );
  },
};
</script>
<style>
[id^='components-button-demo-'] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^='components-button-demo-'] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
