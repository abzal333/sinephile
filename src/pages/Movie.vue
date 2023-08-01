<template>
  <CardInfo category="movie" :id="this.$route.params.id"/>
</template>

<script>
import CardInfo from '@/components/CardInfo.vue'
export default {
  components: {CardInfo}
}
</script>