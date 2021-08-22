<script>
import { isZhCN } from '../utils/util';
import docsearch from 'docsearch.js';
import packageInfo from '../../package.json';
import logo from '../public/logo.svg';
import antDesignVue from '../public/ant-design-vue.svg';

export default {
  inject: {
    demoContext: { default: {} },
  },
  props: {
    name: String,
    searchData: Array,
  },
  data() {
    return {
      visibleAdblockBanner: !!this.demoContext.blocked,
      value: null,
      showTopBanner: !localStorage.getItem('notification-key-2.0'),
    };
  },
  watch: {
    'demoContex.blocked': function blocked(val) {
      this.visibleAdblockBanner = !!val;
    },
  },
  mounted() {
    this.initDocSearch(this.$i18n.locale);
  },
  methods: {
    handleClose(key) {
      localStorage.removeItem(`notification-key-${key}`);
      localStorage.setItem(`notification-key-${key}`, true);
      this.showTopBanner = false;
    },
    initDocSearch(locale) {
      docsearch({
        apiKey: '92003c1d1d07beef165b08446f4224a3',
        indexName: 'antdv',
        inputSelector: '#search-box input',
        algoliaOptions: { facetFilters: [isZhCN(locale) ? 'cn' : 'en'] },
        transformData(hits) {
          hits.forEach(hit => {
            hit.url = hit.url.replace('www.antdv.com', window.location.host);
            hit.url = hit.url.replace('https:', window.location.protocol);
          });
          return hits;
        },
        debug: false, // Set debug to true if you want to inspect the dropdown
      });
    },
    handleClick() {
      const name = this.name;
      const path = this.$route.path;
      const newName = isZhCN(name) ? name.replace(/-cn\/?$/, '') : `${name}-cn`;
      this.$router.push({
        path: path.replace(name, newName),
      });
      this.$i18n.locale = isZhCN(name) ? 'en-US' : 'zh-CN';
    },
    onSelect(val) {
      this.$router.push(val);
      this.value = val;
    },
    closeTopBanner() {},
    changeVersion() {
      location.href = `https://2x.antdv.com${this.$route.fullPath}`;
    },
  },
  render() {
    const name = this.name;
    const visibleAdblockBanner = false; // this.visibleAdblockBanner;
    const isCN = isZhCN(name);
    const path = this.$route.path;

    const selectedKeys = path.startsWith('/ant') ? ['ant'] : ['components'];
    return (
      <header id="header">
        {visibleAdblockBanner && (
          <div class="adblock-banner">
            {isZhCN
              ? '我们检测到你可能使用了 AdBlock 或 Adblock Plus，它会影响到正常功能的使用（如复制、展开代码等）。'
              : 'We have detected that you may use AdBlock or Adblock Plus, which will affect the use of normal functions (such as copying, expanding code, etc.)'}
            <br />
            {isZhCN
              ? '你可以将 Ant Design Vue 加入白名单，以便我们更好地提供服务。'
              : 'You can add Ant Design Vue to the whitelist so that we can provide better services.'}

            <CloseOutlined class="close-icon" onClick={() => (this.visibleAdblockBanner = false)} />
          </div>
        )}

        <a-row>
          <a-col class="header-left" xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
            <router-link to={{ path: '/' }} id="logo">
              <img alt="logo" height="32" src={logo} />
              <img alt="logo" height="16" src={antDesignVue} />
            </router-link>
          </a-col>
          <a-col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
            <div id="search-box">
              <a-icon type="search" />
              <a-input
                placeholder={isCN ? '搜索组件...' : 'input search text'}
                style="width: 200px"
              />
            </div>
            <span id="github-btn" class="github-btn">
              <a class="gh-btn" href="//github.com/vueComponent/ant-design-vue/" target="_blank">
                <span class="gh-ico" aria-hidden="true"></span>
                <span class="gh-text">Star</span>
              </a>
            </span>

            <a-menu selectedKeys={selectedKeys} mode="horizontal" class="menu-site" id="nav">
              <a-menu-item key="components">
                <router-link to="/docs/vue/introduce">{'FtVue2组件'}</router-link>
              </a-menu-item>
              <a-menu-item key="ant">
                <router-link to="/ant/button">{'Ant组件' + packageInfo.version}</router-link>
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </header>
    );
  },
};
</script>

<style scope>
.adblock-banner {
  position: relative;
  z-index: 100;
  min-width: 1000px;
  padding: 16px;
  line-height: 28px;
  color: #8590a6;
  text-align: center;
  background-color: #ebebeb;
}
.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}
.global-notification {
  text-align: center;
  background: #001529;
  padding: 20px 0;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  z-index: 99;
}
.global-notification a {
  color: #177ddc;
}
</style>
