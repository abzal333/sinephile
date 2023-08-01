export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/movie/upcoming',
    upcoming: null
  },
  getters: {},
  mutations: {},
  actions: {
    async getUpcoming({state, rootState}, page=1){
      try{
        const query = await fetch(`${state.path}?api_key=${rootState.apiKey}&language=ru-RU&page=${page}`)
        const response = await query.json()
        const res = response.results
        state.upcoming = res
      }catch(error){
        console.log('Ошибка в файле upcoming ' + error);
      }
    }
  },
}