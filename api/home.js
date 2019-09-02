/* eslint-disable no-console */
import axios from './request'

export const getArticleList = () => {
  return axios
    .get('/home/article_list')
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.error(e)
    })
}
