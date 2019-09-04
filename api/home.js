/* eslint-disable no-console */
import axios from './request'

/**
 * @description 获取文章列表
 */
export const getArticleList = () => {
  return axios
    .get('/home/article_list')
    .then((res) => res.data)
    .catch((e) => {
      console.error(e)
    })
}

/**
 * @description 获取轮播图列表
 */
export const getBannerList = () => {
  return axios
    .get('/home/banner_list')
    .then((res) => res.data)
    .catch((e) => {
      console.error(e)
    })
}

/**
 * @description 获取24小时列表
 */
export const getHours24List = () => {
  return axios
    .get('/home/hours24_list')
    .then((res) => res.data)
    .catch((e) => {
      console.error(e)
    })
}

/**
 * @description 获取APP推广图片链接
 */
export const getAppLinkImage = () => {
  return axios
    .get('/home/app_link_image')
    .then((res) => res.data)
    .catch((e) => {
      console.error(e)
    })
}
