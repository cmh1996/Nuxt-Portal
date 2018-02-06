import * as types from './mutation-types';

const mutations = {
  [types.SET_CACHE_NEWS](state, {index, newsData}) {
  	if(!state.news[index]){
  		state.news[index] = newsData;
  	}else{
    	state.news[index] = state.news[index].concat(...newsData);
  	}
  },
}

export default mutations;