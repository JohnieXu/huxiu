<template>
  <div>
    <h-header title="资讯" />
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
    <h-article>
      <h-article-item
        v-for="item in articles"
        :key="item.id"
        :item="item"
      ></h-article-item>
    </h-article>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HHeader from '@/components/header'
import { HArticle, HArticleItem } from '@/components/article'
import { getArticleList, getBannerList } from '@/api/home'
export default {
  components: {
    HHeader,
    HArticle,
    HArticleItem
  },
  data() {
    return {
      articles: {},
      banners: []
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
  },
  async asyncData() {
    const [articleListData, bannerListData] = await Promise.all([
      getArticleList(),
      getBannerList()
    ])
    return {
      articles: articleListData.data || [],
      banners: bannerListData.data || []
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
</style>
