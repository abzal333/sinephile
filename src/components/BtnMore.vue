<template>
  <RouterLink :to="`/${page == 'movie' ? 'films' : 'serials'}/` + id" class="btn-more">
    <fa icon="fa-solid fa-bars" /> Подробнее
  </RouterLink>
</template>

<script>
export default {
  props: ['id', 'page'],
}
</script>