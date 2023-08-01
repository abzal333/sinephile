export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/movie/top_rated',
    toprate: null
  },
  actions: {
    async getTopRate({state, rootState}){
      try{
        const query = await fetch(`${state.path}?api_key=${rootState.apiKey}&language=ru-RU&page=1`)
        const response = await query.json()
        const res = response.results
        const top10 = res.slice(0, 10)
        state.toprate = top10
      }catch(error){
        console.log('Ошибка в файле toprate ' + error);
      }
    }
  },
}