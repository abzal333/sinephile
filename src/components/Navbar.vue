<template>
  <nav class="navbar">
    <div class="navbar-nav container">
      <router-link to="/" class="navbar-nav__logo">
        <img src="@/assets/images/Logo.svg" alt="">
      </router-link>
      
      <button class="navbar-nav__btn" @click="openMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul class="navbar-nav__list">
        <button class="navbar-nav__close" @click="closeMenu">
          <fa icon="fa-solid fa-xmark" />
        </button>
        <li v-for="(link, ind) in navbarList" :key="ind">
          <router-link :to="link.url">{{ link.name }}</router-link>
        </li>
        <li>
          <router-link to="/search">
            <fa icon="fa-solid fa-magnifying-glass"/>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      navbarList: [
        {url: '/', name: 'Главная'},
        {url: '/films', name: 'Фильмы'},
        {url: '/serials', name: 'Сериалы'},
      ],
    }
  },
  methods: {
    openMenu(){
      const navbarList = document.querySelector('.navbar-nav__list')
      navbarList.style.transition = '0.3s'
      navbarList.style.transform = 'translateX(0)'
    },
    closeMenu(){
      const navbarList = document.querySelector('.navbar-nav__list')
      navbarList.style.transition = '0.3s'
      navbarList.style.transform = 'translateX(-320px)'
      setTimeout(() => {
        navbarList.removeAttribute('style')
      }, 400);
    }
  },
  created() {
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 992){
        const navbarList = document.querySelector('.navbar-nav__list')
        navbarList.removeAttribute('style')
      }
    })
  },
}
</script>

<style>

</style>