<template>
  <div id="app" v-cloak>
    <el-row>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="12">
        <div class="blogDetailBox" v-if="previewBlog">
          <div style="text-align: left;">
            <b>您现在的位置是:</b>&nbsp;&nbsp;网站首页&nbsp;>&nbsp;网站介绍
            <hr style="height: 2px;border: 0;margin: 0;margin-top:10px;background-color:#ddd;" />
          </div>
          <div class="blogName">{{ previewBlog.name }}</div>
          <ul style="text-align: left;">
            <li style="display: inline-block;margin-left: 15px;">
              <img src="../../static/img/分类.png" style="width: 25px;float: left;" />
              <span style="margin-left:5px;cursor: pointer;" @click="goBlogList(previewBlog.blogCategoryObj.name)">{{ previewBlog.blogCategoryObj.name }}</span>
            </li>
            <li style="display: inline-block;margin-left: 15px;">
              <img src="../../static/img/浏览.png" style="width: 25px;float: left;" />
              <span style="margin-left:5px;">{{ previewBlog.viewNum }}</span>
            </li>
            <li style="display: inline-block;margin-left: 15px;">
              <img src="../../static/img/日期.png" style="width: 25px;float: left;" />
              <span style="margin-left:5px;">{{ previewBlog.createAt.substring(0, 10) }}</span>
            </li>
            <li style="display: inline-block;margin-left: 15px;">
              <span v-for="tag in previewBlog.tags.split(',')" :key="tag" style="background-color: #e6e6e6;border-radius: 6px;padding: 5px 12px;margin-left: 5px">{{ tag }}</span>
            </li>
          </ul>

          <div class="blogContent" v-html="content"></div>
          <div>
            <img src="../../static/img/点赞.png" @click="good()" v-show="!isGood" style="cursor: pointer;" />
            <img src="../../static/img/点赞1.png" v-show="isGood" />
            <p>（{{ previewBlog.likeNum }}）</p>
            <p>点个赞吧</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="4" style="padding-left: 35px;">
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
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div style="height:1px"></div></el-col>
    </el-row>
  </div>
</template>
<script>
import { getBlog, good, getViewBlogs, getGoodBlogs } from '@/api/blogFront.js';
import showdown from 'showdown';

export default {
  data() {
    return {
      id: 1,
      isGood: false,
      previewBlog: null,
      blogs: [],
      goodBlogs: [],
      viewBlogs: [],
      blogTags: [],
      content: ''
    };
  },
  mounted() {
    this.init();
    window.vue = this;
  },
  methods: {
    init() {
      this.getBlog();
      this.getViewBlogs();
      this.getGoodBlogs();
    },
    getBlog() {
      getBlog(this.id).then(res => {
        if (res.status) {
          this.previewBlog = res.data;
          var converter = new showdown.Converter();
          this.content = converter.makeHtml(this.previewBlog.blogDetailObj.content);
        }
      });
    },
    // 点赞
    good() {
      good(this.id).then(res => {
        if (res.status === 200) {
          this.previewBlog.likeNum = res.data;
          this.isGood = true;
        }
      });
    },
    // 进入文章详情
    goDetail(id) {
      this.$router.push({ name: 'blogDetail', params: { id: id } });
    },
    // 点击文章类型进入列表页
    goBlogList(categary) {
      this.$router.push({ name: 'blogList', params: { categary: categary } });
    },
    // 获取推荐文章
    getGoodBlogs() {
      getGoodBlogs().then(res => {
        if (res.status === 200) {
          this.goodBlogs = res.data;
        }
      });
    },
    // 获取热门点击文章
    getViewBlogs() {
      getViewBlogs().then(res => {
        if (res.status === 200) {
          this.viewBlogs = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.blogDetailBox {
  min-height: 800px;
  background-color: #fff;
  overflow: hidden;
  padding: 20px;
  margin-top: 20px;
}
.blogDetailBox .blogName {
  font-size: 20px;
  margin: 20px 0 40px;
  text-align: center;
}
.blogDetailBox .blogContent {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
  min-height: 550px;
  font-size: 15px;
  line-height: 30px;
}
.clickRankBox {
  width: 100%;
  height: 410px;
  background-color: #fff;
  border-radius: 6px;
  margin-top: 0;
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

@media screen and (max-width: 750px) {
  .rightBox {
    padding-left: 0 !important;
  }
}
</style>
