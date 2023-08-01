export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3',
    actorsMovie: null,
    actorsTv: null,
  },
  actions: {
    async getActors({state, rootState}, {itemId, category, count}){
      try{
        const query = await fetch(`${state.path}/${category}/${itemId}/credits?api_key=${rootState.apiKey}&language=ru-RU`)
        const response = await query.json()
        const res = response.cast
        const actorsCount = res.slice(0, count)
        if(category == 'movie'){
          state.actorsMovie = actorsCount
        }else{
          state.actorsTv = actorsCount
        }
      }catch(error){
        console.log('Ошибка в файле toprate ' + error);
      }
    }
  },
}