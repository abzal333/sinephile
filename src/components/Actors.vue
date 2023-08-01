<template>
  <div class="actors"
    v-for="(item, ind) in getCountActors"
    :key="ind"
    >
    <img :src="imgUrlFull + item.profile_path" alt="" class="actors-img">
    <div class="actors-name">{{ item.name }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['type', 'id', 'count'],
  methods: {
    ...mapActions('actors', ['getActors'])
  },
  computed: {
    ...mapState(['imgUrlFull']),
    getCountActors(){
      const stateActors = this.type == 'movie' ? 'actorsMovie' : 'actorsTv'
      const res = this.$store.state.actors[stateActors]
      return res
    }
  },
  async created() {
    await this.getActors({itemId: this.id, category: this.type, count: this.count})
    console.log(this.getCountActors);
  },
}
</script>