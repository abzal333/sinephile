<template>
  <div class="search container">
    <input type="text" placeholder="Найти фильм, сериал..." v-model="value" class="search-input">
    
    <div class="search-content">
      <div class="contentinfo-card" v-for="(item, ind) in multiData" :key="ind">
        <img :src="imgUrlFull + item.backdrop_path" alt="" class="contentinfo-card__img" v-if="item.backdrop_path != null">
        <img :src="imgUrlFull + item.poster_path" alt="" class="contentinfo-card__img" v-else>
        <RouterLink :to="`/${item.media_type == 'movie' ? 'films' : 'serials'}/` + item.id" class="contentinfo-card__link">
          {{ item.title ? item.title : item.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['imgUrlFull']),
    multiData(){
      return this.$store.state.search.searchData
    }
  },
  watch: {
    value(){
      this.$store.dispatch('search/getMultiSearch', this.value)
    }
  },
}
</script>