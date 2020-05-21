<template>
  <div v-cloak>
    <el-backtop></el-backtop>
    <el-row>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="12">
        <!-- 轮播图 -->
        <el-carousel trigger="click" height="150px">
          <el-carousel-item>
            <img src="../../static/img/in_top_bj.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <a href="https://www.aliyun.com" target="_blank"><img src="../../static/img/aliyun.png"/></a>
          </el-carousel-item>
          <el-carousel-item>
            <a href="https://portal.qiniu.com" target="_blank"><img src="../../static/img/qiniuyun.png"/></a>
          </el-carousel-item>
        </el-carousel>
        <!-- 博客列表 -->
        <ul class="list">
          <li v-for="blog in blogs" :key="blog.id" class="blog-box">{{ blog.name }}</li>
        </ul>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="4" style="padding-left: 35px;"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import { getBlogs, getGoodBlogs, getViewBlogs } from '@/api/blogFront.js';

export default {
  data() {
    return {
      page: 1,
      isLast: false,
      blogs: [],
      goodBlogs: [],
      viewBlogs: [],
      friendHref: [{ name: '杨青', href: 'https://www.yangqq.com/' }]
    };
  },
  mounted() {
    this.init();
    window.addEventListener('scroll', this.menu);
  },
  methods: {
    init() {
      this.getBlogs();
      this.getGoodBlogs();
      this.getViewBlogs();
    },
    // 加载文章
    getBlogs() {
      let param = {
        categary: '',
        page: this.page
      };
      getBlogs(param).then(res => {
        if (res.status) {
          this.blogs = res.data.content;
        }
      });
    },
    // 获取推荐文章
    getGoodBlogs() {
      getGoodBlogs().then(res => {
        if (res.status) {
          this.goodBlogs = res.data;
        }
      });
    },
    // 获取热门点击文章
    getViewBlogs() {
      getViewBlogs().then(res => {
        if (res.status) {
          this.viewBlogs = res.data;
        }
      });
    },
    // 进入文章详情
    goDetail(id) {
      this.$router.push({ name: 'blogDetail', params: { id: id } });
    },
    menu() {
      if (this.$route.path === '/' || this.$route.path.indexof('blogList') !== -1) {
        if (!this.isLast) {
          let scroll = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
          if (scroll > -10) {
            this.page++;
            this.isLast = true;
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            let param = {
              categary: '',
              page: this.page
            };
            getBlogs(param).then(res => {
              if (res.status) {
                this.blogs = this.blogs.concat(res.data.content);
                this.isLast = res.data.last;
              }
              loading.close();
            });
          }
        }
      }
    },
    // 滚动条在Y轴上的滚动距离
    getScrollTop() {
      var documentScrollTop = 0;
      documentScrollTop = document.documentElement.scrollTop;
      return documentScrollTop;
    },
    // 文档的总高度
    getScrollHeight() {
      var documentScrollHeight = 0;
      documentScrollHeight = document.documentElement.scrollHeight;
      return documentScrollHeight;
    },
    // 浏览器视口的高度
    getWindowHeight() {
      var windowHeight = 0;
      windowHeight = document.documentElement.clientHeight;
      return windowHeight;
    }
  }
};
</script>
<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.blog-box {
  width: 100%;
  height: 220px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
</style>
