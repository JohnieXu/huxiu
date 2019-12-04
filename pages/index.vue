<template>
  <div>
    <h-header
      title="资讯"
      @on-category-click="handleCategoryClick"
      @on-search-click="handleSearchClick"
    />
    <!-- banner -->
    <van-swipe :autoplay="5000" indicator-color="white" class="banner">
      <template v-if="Array.isArray(banners)">
        <van-swipe-item v-for="item in banners" :key="item.id">
          <div class="banner__mask">
            <p class="banner__title">{{ item.title }}</p>
          </div>
          <div v-lazy:background-image="item.image_url" class="banner__image" />
        </van-swipe-item>
      </template>
    </van-swipe>
    <!-- 文章推荐列表 -->
    <h-article>
      <h-article-item
        v-for="item in articles"
        :key="item.id"
        :item="item"
      ></h-article-item>
    </h-article>
    <!-- 24小时滚动 -->
    <div class="hours24-title">
      <div class="hours24-title__text">24小时</div>
      <span class="hours24-title__bar"></span>
    </div>
    <van-swipe
      class="hours24"
      vertical
      :show-indicators="false"
      :autoplay="5000"
    >
      <template v-if="Array.isArray(hours24s)">
        <van-swipe-item v-for="(item, index) in hours24s" :key="index">
          <div class="hours24-item__container">
            <div class="hours24__avatar">
              <img :src="item.user_avatar" />
            </div>
            <p class="hours24__content">
              <strong>{{ item.user_name }}&nbsp;说：</strong>{{ item.user_name
              }}{{ item.content }}
            </p>
          </div>
        </van-swipe-item>
      </template>
    </van-swipe>
    <!-- APP下载推广 -->
    <div class="app-link-image">
      <a class="app-link-image__link" :href="appLinkImage.link_url">
        <img class="app-link-image__image" :src="appLinkImage.image_url" />
      </a>
    </div>
    <!-- 文章列表 -->
    <h-article>
      <h-article-item
        v-for="(item, index) in articlesRecommend"
        :key="index"
        :item="item"
        :type="item.type"
      ></h-article-item>
    </h-article>
    <loadmore :load-more="getArticleList" @on-success="handleLoadmoreSuccess" />
    <van-popup
      v-model="isShow.category"
      position="botom"
      get-container="body"
      safe-area-inset-bottom
      round
      closable
      :style="{ width: '100%', height: '90%' }"
    >
      <van-tabs>
        <van-tab
          v-for="(item, index) in categories"
          :key="index"
          :title="item.title"
        >
          内容{{ index }}
        </van-tab>
      </van-tabs>
    </van-popup>
    <!-- 搜索 -->
    <div class="search" v-show="isShow.search">
      <van-search
        v-model="searchWord"
        placeholder="请输入关键词搜索"
        shape="round"
        ref="search"
        show-action
        autofous
        @search="handleSearch"
        @cancel="handleSearchCancel"
      ></van-search>
      <h-tag-list
        title="热搜词"
        :list-data="searchHotWords"
        @on-item-click="handleSearchWordItemClick"
      ></h-tag-list>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex'
import HHeader from '@/components/header'
import { HArticle, HArticleItem } from '@/components/article'
import HTagList from '@/components/tag_list'
import Loadmore from '@/components/loadmore'
import {
  getArticleList,
  getBannerList,
  getHours24List,
  getAppLinkImage
} from '@/api/home'
export default {
  components: {
    HHeader,
    HArticle,
    HArticleItem,
    Loadmore,
    HTagList
  },
  data() {
    return {
      articles: [],
      banners: [],
      hours24s: [],
      appLinkImage: {},
      articlesRecommend: [],
      categories: [
        {
          title: '资讯',
          url: ''
        },
        {
          title: '24小时',
          url: ''
        },
        {
          title: '活动',
          url: ''
        }
      ],
      isShow: {
        category: false,
        search: false
      },
      searchHotWords: ['头条', '科技'], // 热搜词
      searchWord: '' // 搜索词
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    }),
    isLoadmore() {
      return true
    }
  },
  async asyncData() {
    const [
      articleListData,
      bannerListData,
      hours24ListData,
      appLinkImageData
    ] = await Promise.all([
      getArticleList(),
      getBannerList(),
      getHours24List(),
      getAppLinkImage()
    ])
    return {
      articles: articleListData.data || [],
      banners: bannerListData.data || [],
      hours24s: hours24ListData.data || [],
      appLinkImage: appLinkImageData.data || {}
    }
  },
  methods: {
    getArticleList,
    handleLoadmoreSuccess(data) {
      if (Array.isArray(data)) {
        // FIXME: 测试picture类型的文章
        if (this.articlesRecommend.length % 3 === 1) {
          data[0] && (data[0].type = 'picture')
        }
        // FIXME: 测试video类型的文章
        this.articlesRecommend = [...this.articlesRecommend, ...data]
      }
    },
    // 头部分类点击
    handleCategoryClick() {
      this.isShow.category = true
    },
    // 头部搜做点击
    handleSearchClick() {
      this.isShow.search = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    // 热搜词点击
    handleSearchWordItemClick(word) {
      this.searchWord = word
    },
    // 点击搜索
    handleSearch(keyword) {
      console.log(keyword)
    },
    // 搜索取消
    handleSearchCancel() {
      this.isShow.search = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/base.less';
.banner {
  .banner__image {
    width: 375px;
    height: 211px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .banner__title {
    position: absolute;
    bottom: 40px;
    margin: 0;
    padding: 0 15px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    .ellipsis(2);
  }
  .banner__mask {
    position: absolute;
    width: 375px;
    height: 211px;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(rgba(48, 48, 48, 0)),
      to(rgba(48, 48, 48, 0.5))
    );
  }
}
.hours24-title {
  font-size: 16px;
  color: #303030;
  background: #fff;
  .hours24-title__text {
    display: inline-block;
    vertical-align: top;
    margin: 0 16px;
    font-weight: 600;
    line-height: 16px;
  }
  .hours24-title__bar {
    display: inline-block;
    vertical-align: top;
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 16px;
    background: @primary-red;
  }
}
.hours24 {
  height: 86px;
  background: #fff;
  .hours24-item__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 0 0;
  }
  .hours24__avatar {
    flex: 0 0 69px;
    text-align: center;
    img {
      width: 35px;
      height: auto;
      border-radius: 50%;
    }
  }
  .hours24__content {
    flex: 1;
    font-size: 15px;
    color: #606060;
    .ellipsis(3);
    strong {
      color: #303030;
      font-weight: 400;
    }
  }
}
.app-link-image {
  .app-link-image__link {
    display: block;
    height: 100%;
  }
  .app-link-image__image {
    width: 100%;
    height: 100%;
  }
}
.search {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 999;
}
</style>
