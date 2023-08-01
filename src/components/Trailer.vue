<template>
  <div class="trailer" :class="{active: id != null}">
    <button class="trailer__close" @click="$emit('close')">
      <fa icon="fa-solid fa-xmark" />
    </button>
    
    <Transition name="info">
      <div class="trailer-content">
        <iframe
          v-for="(el, i) in selectedItem" :key="i"
          :src="'https://www.youtube.com/embed/' + el.key" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ['category', 'id', 'selectedItem']
}
</script>