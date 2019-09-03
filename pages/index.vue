<template>
  <div>
    <h-header title="资讯" />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HHeader from '@/components/header'
import { HArticle, HArticleItem } from '@/components/article'
import { getArticleList, getBannerList, getHours24List } from '@/api/home'
export default {
  components: {
    HHeader,
    HArticle,
    HArticleItem
  },
  data() {
    return {
      articles: {},
      banners: [],
      hours24s: []
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
  },
  async asyncData() {
    const [
      articleListData,
      bannerListData,
      hours24ListData
    ] = await Promise.all([getArticleList(), getBannerList(), getHours24List()])
    return {
      articles: articleListData.data || [],
      banners: bannerListData.data || [],
      hours24s: hours24ListData.data || []
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
  position: relative;
  font-size: 16px;
  color: #303030;
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
</style>
