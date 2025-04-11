import { createStore } from 'vuex';

export default createStore({

  state: {

    language: 'pt',
    selectedPokemon: null,
  },

  mutations: {

    setLanguage(state, lang) { state.language = lang; },

    setSelectedPokemon(state, pokemon) { state.selectedPokemon = pokemon; },
  },

  actions: {

    changeLanguage({ commit }, lang) { commit('setLanguage', lang); },

    selectPokemon({ commit }, pokemon) { commit('setSelectedPokemon', pokemon); },
  },

  getters: {

    currentLanguage: (state) => state.language,
    selectedPokemon: (state) => state.selectedPokemon,
  },
});
