export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/search/multi',
    searchData: null
  },
  actions: {
    async getMultiSearch({state, rootState}, value){
      try{
        const query = await fetch(`${state.path}?api_key=${rootState.apiKey}&language=ru-RU&query=${value}&page=1&include_adult=false`)
        const response = await query.json()
        const res = response.results
        const info = []
        res.forEach((item) => {
          item.backdrop_path != null || item.poster_path != null ? info.push(item) : ''
        })
        state.searchData = info
      }catch(error){
        console.log('Ошибка в файле search ' + error);
      }
    }
  },
}