export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/',
    movieVideo: [],
    tvVideo: [],
  },
  actions: {
    async getTrailerVideo({state, rootState}, {category, itemId}){
      try{
        const query = await fetch(`${state.path}/${category}/${itemId}/videos?api_key=${rootState.apiKey}&language=ru-RU`)
        const response = await query.json()
        const res = response.results
        if(category == 'movie'){
          state.movieVideo = res.slice(0, 1)
        }else{
          state.tvVideo = res.slice(0, 1)
        }
      }catch(error){
        console.log('Ошибка в файле rec ' + error);
      }
    }
  },
}