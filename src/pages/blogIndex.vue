<template>
  <div id="app" v-cloak>
    <el-backtop></el-backtop>
    <el-row :gutter="20">
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4"><div style="height:1px"></div></el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-row :gutter="20">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <!-- 轮播图 -->
            <el-carousel trigger="click" height="250px" class="carousel">
              <el-carousel-item>
                <el-image style="width: 100%; height: 100%" src="../../static/img/in_top_bj.jpg" :fit="'fill'"></el-image>
              </el-carousel-item>
              <el-carousel-item>
                <a href="https://www.aliyun.com" target="_blank">
                  <el-image style="width: 100%; height: 100%" src="../../static/img/aliyun.png" :fit="'fill'"></el-image>
                </a>
              </el-carousel-item>
              <el-carousel-item>
                <a href="https://portal.qiniu.com" target="_blank">
                  <el-image style="width: 100%; height: 100%" src="../../static/img/qiniuyun.png" :fit="'fill'"></el-image>
                </a>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="carousel">
            <a href="https://www.aliyun.com" target="_blank">
              <el-image style="width: 100%; height: 120px;border-radius: 6px;" src="../../static/img/aliyun.jpg" :fit="'fill'"></el-image>
            </a>
            <a href="https://portal.qiniu.com" target="_blank">
              <el-image style="width: 100%; height: 120px;border-radius: 6px;" src="../../static/img/qiniuyun.jpg" :fit="'fill'"></el-image>
            </a>
          </el-col>
        </el-row>

        <!-- 博客列表 -->
        <ul class="list">
          <li v-for="blog in blogs" :key="blog.id" class="blog-box">{{ blog.name }}</li>
        </ul>

        <!-- 分页 -->
        <el-pagination style="margin-top:20px" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="10" background layout="prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
      </el-col>
      <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="userCard">
          <h2>刘国强的名片</h2>
          <div style="float: left; width: 65%;">
            <p>职业：JAVA开发</p>
            <p>现居：上海</p>
            <p>工作：用友汽车信息科技</p>
            <p>电话：17601349133</p>
            <p>邮箱：2629080132@qq.com</p>
          </div>
          <div style="float: right; width: 25%; margin: 15px 20px 0px 0px;">
            <el-image style="border-radius: 100px;" src="../../static/img/gaga.jpg" :fit="'fill'"></el-image>
          </div>
        </div>
        <div class="clickRankBox" v-if="viewBlogs && viewBlogs.length > 0">
          <h2 class="htitle">
            热门点击
          </h2>
          <ul style="margin-left: 15px;">
            <li v-for="(blog, index) in viewBlogs" :key="index" @click="goDetail(blog.id)" :title="blog.name">
              <i :style="{ color: +index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? 'blue' : '' }">{{ index < 9 ? '&nbsp;&nbsp;' : '' }}{{ index + 1 }}.</i>
              &nbsp;&nbsp;<span :style="{ color: +index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? 'blue' : '' }">{{ blog.name }}</span>
            </li>
          </ul>
        </div>
        <div class="recommendBox" v-if="goodBlogs && goodBlogs.length > 0">
          <h2 class="htitle">
            推荐博文
          </h2>
          <ul style="margin-left: 15px;">
            <li v-for="(blog, index) in goodBlogs" :key="index" @click="goDetail(blog.id)" :title="blog.name">
              <i :style="{ color: +index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? 'blue' : '' }">{{ index < 9 ? '&nbsp;&nbsp;' : '' }}{{ index + 1 }}.</i>
              &nbsp;&nbsp;<span :style="{ color: +index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? 'blue' : '' }">{{ blog.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4"><div style="height:1px"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import { getBlogs, getGoodBlogs, getViewBlogs } from '@/api/blogFront.js';

export default {
  data() {
    return {
      page: 1, // 当前页
      totalPages: 0, // 总页数
      totalElements: 0, // 总条数
      isLast: false,
      blogs: [],
      goodBlogs: [],
      viewBlogs: [],
      friendHref: [{ name: '杨青', href: 'https://www.yangqq.com/' }]
    };
  },
  mounted() {
    this.init();
    // window.addEventListener('scroll', this.menu);
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
        currentPage: this.page,
        pageSize: 10
      };
      getBlogs(param).then(res => {
        if (res.status) {
          this.blogs = res.data.content;
          this.totalPages = res.data.totalPages;
          this.totalElements = res.data.totalElements;
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
            let param = {
              categary: '',
              page: this.page
            };
            getBlogs(param).then(res => {
              if (res.status) {
                this.blogs = this.blogs.concat(res.data.content);
                this.isLast = res.data.last;
              }
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
    },
    // 分页点击
    handleCurrentChange(val) {
      this.page = val;
      this.getBlogs();
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

.carousel {
  margin-top: 20px;
  border-radius: 6px;
}

.userCard {
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1), inset 0px 1px 1px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  background: url(../../static/img/quote-bg.png) no-repeat top right rgba(42, 42, 42, 1);
  height: 250px;
  overflow: hidden;
  border-radius: 6px;
  margin-top: 20px;
}
.userCard h2 {
  font-size: 22px;
  color: #89919a;
  font-weight: 400;
  padding: 20px 0 30px 30px;
  text-align: left;
}
.userCard p {
  text-align: left;
  font-size: 12px;
  padding: 0 0 0 20px;
  line-height: 28px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  color: #d0d2d4;
  -webkit-animation: animations2 5s ease-in-out 5s;
  animation: animations2 5s ease-in-out 5s;
}

.clickRankBox {
  width: 100%;
  height: 410px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 20px;
}

.recommendBox {
  width: 100%;
  height: 410px;
  background-color: #fff;
  border-radius: 6px;
  margin-top: 20px;
  overflow: hidden;
}
.clickRankBox li,
.recommendBox li {
  text-align: left;
  width: 90%;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.clickRankBox li:hover,
.recommendBox li:hover {
  transform: scale(1.1);
  background: #f6f6f6;
}
.htitle {
  text-align: left;
  font-size: 16px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  color: #484848;
  font-weight: normal;
  position: relative;
  margin: 10px 20px 10px 20px;
}
.htitle::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 2px;
  background: #000;
  left: 0;
  bottom: 0;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
</style>
