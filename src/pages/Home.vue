<template>
  <Upcoming/>
  <MoviesSwiper/>
  <TvsSwiper/>
  <TopRate/>
</template>

<script>
import Upcoming from '@/components/Upcoming.vue'
import MoviesSwiper from '@/components/MoviesSwiper.vue'
import TvsSwiper from '@/components/TvsSwiper.vue'
import TopRate from '@/components/TopRate.vue'
export default {
  components: {Upcoming, MoviesSwiper, TvsSwiper,TopRate}
}
</script>