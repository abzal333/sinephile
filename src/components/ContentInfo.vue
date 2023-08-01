<template>
  <div class="contentinfo container">
    <h2 class="contentinfo-title">
      {{ content == 'movie' ? 'Все фильмы' : 'Все сериалы' }}
    </h2>
    
    <div class="contentinfo-items">
      <div class="contentinfo-card" v-for="(item, ind) in allContent" :key="ind" :item="item">
        <img :src="imgUrlFull + item.backdrop_path" alt="" class="contentinfo-card__img" v-if="item.backdrop_path != null">
        <img :src="imgUrlFull + item.poster_path" alt="" class="contentinfo-card__img" v-else>
        <RouterLink :to="`/${content == 'movie' ? 'films' : 'serials'}/` + item.id" class="contentinfo-card__link">
          {{ item.title ? item.title : item.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['content'],
  data() {
    return {
      page: 1,
      loading: false,
      allContent: []
    }
  },
  methods: {
    ...mapActions('cinema', ['getCinema']),
    async getContent(){
      if(!this.loading){
        this.loading = true
        await this.getCinema({category: this.content, page: this.page})
        const info = this.content == 'movie' ? 'movies' : 'tvs'
        const stateInfo = this.$store.state.cinema[info]
        this.allContent.push(...stateInfo)
        this.loading = false
        this.page++
      }
    }
  },
  computed: {
    ...mapState(['imgUrlFull'])
  },
  async created() {
    await this.getContent(),
    window.addEventListener('scroll', () => {
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        this.getContent()
      }
    })
  },
}
</script>