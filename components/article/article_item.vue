<template>
  <div
    v-if="item"
    :class="`article-item article-item__${type || item.type}`"
    @click="onClick"
  >
    <div class="right">
      <img class="cover-image" :src="item.images[0].url" />
    </div>
    <div class="left">
      <a class="title">
        <h2 class="title-text-wrapper">
          <p class="title-text">
            <span v-if="item.tag" class="tag">{{ item.tag }}</span
            >{{ item.title }}
          </p>
        </h2>
        <div class="title-desc">
          <span>{{ item.user.name }}</span>
          <span>{{ item.meta.created_at | fromNow }}</span>
          <span class="favorite">{{ item.favorite_count }}人收藏</span>
        </div>
      </a>
    </div>
  </div>
  <div v-else>加载失败</div>
</template>

<script>
/* eslint-disable valid-typeof */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default {
  name: 'HArticleItem',
  filters: {
    fromNow(time) {
      if (typeof time === 'undefined') {
        return ''
      }
      if (dayjs(time).isValid()) {
        return dayjs(time).fromNow()
      } else {
        return ''
      }
    }
  },
  props: {
    type: {
      type: String, // normal | picture | video
      default: 'normal'
    },
    item: {
      type: Object,
      requied: true,
      default: () => false
    }
  },
  methods: {
    onClick() {
      // eslint-disable-next-line
      console.log(this.item.id)
    }
  }
}
</script>

<style lang="less" scoped>
@import './article_item.less';
</style>
