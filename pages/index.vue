<template>
  <div>
    <h-header title="资讯" />
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
import { getArticleList } from '@/api/home'
export default {
  components: {
    HHeader,
    HArticle,
    HArticleItem
  },
  data() {
    return {
      articles: {}
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
  },
  async asyncData() {
    const data = await getArticleList()
    return {
      articles: data.data || []
    }
  }
}
</script>

<style lang="less" scoped></style>
