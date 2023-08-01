<template>
  <div class="cardinfo" v-if="getCardInfo">
    <div class="cardinfo-item">
      <img :src="imgUrlFull + getCardInfo.backdrop_path" alt="" class="cardinfo-item__bg">
      <div class="cardinfo-item__content">
        <div class="cardinfo-item__content--text">
          <h1>{{ getCardInfo.title }}</h1>
          <p>{{ getCardInfo.overview }}</p>
          <ul class="cardinfo-item__content--tag">
            <li>{{ new Date(getCardInfo.release_date).getFullYear() }}</li>
            <li v-for="(li, i) in getCardInfo.genres" :key="i">
              {{ li.name }}
            </li>
          </ul>
          <button type="button" class="cardinfo-item__btn" @click="getVideo(category, getCardInfo.id)">
            <fa icon="fa-solid fa-play" />
            Смотерть трейлер
          </button>
        </div>
        <img :src="imgUrlFull + getCardInfo.poster_path" alt="" class="cardinfo-item__content--img">
        <div class="cardinfo-item__content--actors">
          <h3 class="cardinfo-item__content--title">В главных ролях</h3>
          <Actors :type="category" :id="id" count="6"/>
        </div>
      </div>
    </div>
    <div class="cardinfo-budget container">
      <div class="cardinfo-budget__item">
        <h5>Бюджет</h5>
        <p>${{ getCardInfo.budget }}</p>
      </div>
      <div class="cardinfo-budget__item">
        <h5>Сборы</h5>
        <p>${{ getCardInfo.revenue}}</p>
      </div>
      <div class="cardinfo-budget__item">
        <h5>Статус</h5>
        <p>{{ getCardInfo.status}}</p>
      </div>
      <div class="cardinfo-budget__item">
        <h5>Исходное название</h5>
        <p>{{ getCardInfo.original_title}}</p>
      </div>
    </div>
    <div class="cardinfo-trailer">
      <Trailer 
        :category="category" 
        :id="selectedId" 
        :selectedItem="selectedItem" 
        @close="selectedId = null"/>
    </div>
    <div class="cardinfo-rec container" v-if="getRecItems">
      <h4 class="cardinfo-rec__title">Рекомендации</h4>
      <div class="cardinfo-rec__items">
        <div class="contentinfo-card" v-for="(item, ind) in getRecItems" :key="ind">
          <img :src="imgUrlFull + item.backdrop_path" alt="" class="contentinfo-card__img" v-if="item.backdrop_path != null">
          <img :src="imgUrlFull + item.poster_path" alt="" class="contentinfo-card__img" v-else>
          <RouterLink :to="`/${category == 'movie' ? 'films' : 'serials'}/` + item.id" class="contentinfo-card__link" @click="ReloadClick">
            {{ item.title ? item.title : item.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Trailer from '@/components/Trailer.vue'
export default {
  components: {Trailer},
  props: ['category', 'id'],
  data() {
    return {
      selectedId: null,
      selectedItem: null,
    }
  },
  methods: {
    ...mapActions('infoblock', ['getInfoblock']),
    ...mapActions('rec', ['getRec']),
    ...mapActions('trailer', ['getTrailerVideo']),
    ReloadClick(){
      setTimeout(() => {
        location.reload()
        window.scrollTo(0, 0)
      }, 100);
    },
    async getVideo(cat, ItemId){
      this.selectedId = ItemId
      await this.getTrailerVideo({category: cat, itemId: ItemId})
      const info = cat == 'movie' ? 'movieVideo' : 'tvVideo';
      this.selectedItem = this.$store.state.trailer[info]
      console.log(this.selectedItem);
    }
  },
  computed: {
    ...mapState(['imgUrlFull']),
    getCardInfo(){
      const info = this.category == 'movie' ? 'movieId' : 'tvId'
      return this.$store.state.infoblock[info]
    },
    getRecItems(){
      const info = this.category == 'movie' ? 'moviesRec' : 'tvsRec'
      if(this.$store.state.rec[info].length == 0){
        return false
      }else{
        return this.$store.state.rec[info]
      }
    }
  },
  async created() {
    await this.getInfoblock({category: this.category, itemId: this.id})
    await this.getRec({category: this.category, itemId: this.id})
    console.log(this.getCardInfo);
    console.log(this.getRecItems);
  },
}
</script>