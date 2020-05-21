<template>
  <div></div>
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
