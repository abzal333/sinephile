<template>
  <div class="toprate">
    <h2 class="toprate-title">топ<span>10</span></h2>
    
    <Swiper
      class="toprate-slider"
      :modules="modules"
      :space-between="24"
      :navigation="true"
      :breakpoints="swiperOptions.breakpoints"
    >
      <Swiper-slide 
        class="toprate-slider__item"
        v-for="(item, ind) in toprate"
        :key="ind"
        :item="item"
        >
        <img src="@/assets/images/no-img.png" alt="" class="toprate-slider__item--img" v-if="item.poster_path == null">
        <img :src="imgUrlFull + item.poster_path" alt="" class="toprate-slider__item--img" v-else-if="item.backdrop_path == null">
        <img :src="imgUrlFull + item.backdrop_path" alt="" class="toprate-slider__item--img" v-else>
        <div class="toprate-slider__item--info">
          <p>{{ind + 1}}</p>
        </div>
      </Swiper-slide>
    </Swiper>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss';
import 'swiper/scss/navigation';
export default {
  components: {Swiper,SwiperSlide},
  data() {
    return {
      modules: [Navigation],
      swiperOptions: {
        breakpoints: {
          320: {slidesPerView: 1},
          768: {slidesPerView: 2},
          992: {slidesPerView: 3},
        }
      },
    }
  },
  methods: {
    ...mapActions('toprate', ['getTopRate'])
  },
  computed: {
    ...mapState('toprate', ['toprate']),
    ...mapState(['imgUrlFull']),
  },
  async created() {
    await this.getTopRate()
  },
}
</script>