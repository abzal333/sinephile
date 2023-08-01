<template>
  <div class="popular">
    <RouterLink to="/films" class="popular-link">
      Фильмы <fa icon="fa-solid fa-chevron-right" />
    </RouterLink>
    
    <Swiper
      class="popular-slider"
      :modules="modules"
      :space-between="24"
      :navigation="true"
      :breakpoints="swiperOptions.breakpoints"
    >
      <Swiper-slide 
        v-for="(item, ind) in movies"
        :key="ind"
        :item="item"
        class="popular-slider__item"
        :class="{active: selectedId == item.id}"
        @click="getInfo(item, ind)"
        >
        <img src="@/assets/images/no-img.png" alt="" class="popular-slider__item--img" v-if="item.poster_path == null">
        <img :src="imgUrlFull + item.poster_path" alt="" class="popular-slider__item--img" v-else-if="item.backdrop_path == null">
        <img :src="imgUrlFull + item.backdrop_path" alt="" class="popular-slider__item--img" v-else>
      </Swiper-slide>
      <Swiper-slide class="popular-slider__item">
        <RouterLink to="/films" class="popular-slider__item--link">
          <fa icon="fa-solid fa-chevron-right" />
          <span>Все фильмы</span>
        </RouterLink>
      </Swiper-slide>
    </Swiper>
    
    
    <InfoBlock
      :selectedId="selectedId"
      :selectedItem="selectedItem"
      :index="index"
      category="movie"
      @close="selectedId = null"
    />
  </div>
</template>

<script>
import InfoBlock from '@/components/InfoBlock.vue'
import { mapState, mapActions } from 'vuex'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss';
import 'swiper/scss/navigation';
export default {
  components: {Swiper,SwiperSlide,InfoBlock},
  data() {
    return {
      modules: [Navigation],
      swiperOptions: {
        breakpoints: {
          320: {slidesPerView: 2},
          768: {slidesPerView: 3},
          992: {slidesPerView: 4},
          1200: {slidesPerView: 5},
        }
      },
      selectedId: null,
      selectedItem: null,
      index: null,
    }
  },
  methods: {
    ...mapActions('popular', ['getPopular']),
    ...mapActions('infoblock', ['getInfoblock']),
    async getInfo(item, ind){
      this.selectedId = item.id
      this.selectedItem = null
      this.index = ind
      await this.getInfoblock({category: 'movie', itemId: item.id})
      this.selectedItem = this.movieId
      console.log(this.selectedItem);
    }
  },
  computed: {
    ...mapState('popular', ['movies']),
    ...mapState('infoblock', ['movieId']),
    ...mapState(['imgUrlFull']),
  },
  async created() {
    await this.getPopular({category: 'movie', page: 1})
  },
}
</script>