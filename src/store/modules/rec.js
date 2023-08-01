export default{
  namespaced: true,
  state: {
    path: 'https://api.themoviedb.org/3/',
    moviesRec: [],
    tvsRec: [],
  },
  actions: {
    async getRec({state, rootState}, {category, itemId}){
      try{
        const query = await fetch(`${state.path}/${category}/${itemId}/recommendations?api_key=${rootState.apiKey}&language=ru-RU&page=1`)
        const response = await query.json()
        const res = response.results
        if(category == 'movie'){
          state.moviesRec = res.slice(0, 4)
        }else{
          state.tvsRec = res.slice(0, 4)
        }
      }catch(error){
        console.log('Ошибка в файле rec ' + error);
      }
    }
  },
}