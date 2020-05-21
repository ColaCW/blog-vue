import axios from '@/api/fetch';
import SERVER from '@/api/server';

// 根据id获取博客详情
export const getBlog = id => axios.get(`${SERVER.SERVICE_HOST}/api/blog/getBlog/${id}`);

// 根据id获取博客详情
export const getGoodBlogs = params => axios.get(`${SERVER.SERVICE_HOST}/api/blog/getGoodBlogs`, { params });

// 获取热门点击文章
export const getViewBlogs = params => axios.get(`${SERVER.SERVICE_HOST}/api/blog/getViewBlogs`, { params });

// 获取博客分类
export const getBlogCategorys = params => axios.get(`${SERVER.SERVICE_HOST}/api/blog/getBlogCategorys`, { params });

// 点赞
export const good = id => axios.get(`${SERVER.SERVICE_HOST}/api/blog/good/${id}`, {});

// 分页获取博客
export const getBlogs = params => axios.get(`${SERVER.SERVICE_HOST}/api/blog/getBlogs`, { params });
