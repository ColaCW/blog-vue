<template>
  <div id="app" v-cloak>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
    <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="16">
      <ul class="shareBox">
        <div style="text-align: left;">
          <b>您现在的位置是:</b>&nbsp;&nbsp;网站首页&nbsp;>&nbsp;资源分享
          <hr style="height: 2px;border: 0;margin: 0;margin-top:10px;background-color:#ddd;" />
        </div>
        <a v-for="share in shareList" :key="share.name" :href="share.href" target="_blank">
          <li>【视频】{{ share.name }} （提取码：{{ share.MA }}）</li>
        </a>
      </ul>
    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
  </div>
</template>
<script>
import {} from '@/api/blogFront.js';

export default {
  data() {
    return {
      shareList: [{ name: '死神', href: 'https://pan.baidu.com/s/1mVf_xqIsN5LUdBBdk4_Qow', MA: '2bq5' }]
    };
  },
  mounted() {
    this.init();
    window.vue = this;
  },
  methods: {
    init() {
      this.getBlog();
    },
    getBlog() {}
  }
};
</script>
<style scoped>
.shareBox {
  min-height: 600px;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
}
.shareBox li {
  cursor: pointer;
  background-color: #f6f6f6;
  text-align: left;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
}
.shareBox li:hover {
  transform: scale(1.01);
}
</style>
