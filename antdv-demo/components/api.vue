<template>
  <div class="markdown api-container">
    <slot v-if="isZhCN" name="cn" />
    <slot v-else />
  </div>
</template>
<script>
import { isZhCN } from '../utils/util';

const showAd = location.host.indexOf('antdv.com') > -1;
export default {
  name: 'Api',
  components: {},
  inject: {
    demoContext: { default: {} },
  },
  data() {
    return {
      showAd,
      isZhCN: isZhCN(this.demoContext.name),
    };
  },
};
</script>
