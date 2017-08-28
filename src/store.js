import Vue from 'vue'
import Vuex from 'vuex'

import find from 'lodash/find'

import data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTrip: '',
    trips: data
  },
  getters: {
    getTrip: (state, getters) => (slug) => {
      return find(state.trips, { slug })
    }
  },
  mutations: {
    setActiveTrip(state, slug) {
      state.activeTrip = find(state.trips, { slug }).name
    }
  },
  actions: {
    setActiveTrip({ commit, state }, slug) {
      commit('setActiveTrip', slug)
    }
  }
})
