import Vue from 'vue'
import Vuex from 'vuex'

import find from 'lodash/find'

import data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTrip: '',
    activePlace: '',
    trips: data
  },
  getters: {
    getTrip: (state, getters) => slug => {
      return find(state.trips, { slug })
    },
    getPhoto: (state, getters) => routeParams => {
      var photoID = routeParams.photoID || 0
      return state.activePlace.photos[photoID]
    }
  },
  mutations: {
    setActiveTrip(state, routeParams) {
      state.activeTrip = find(state.trips, { slug: routeParams.trip })
      state.activePlace = find(state.activeTrip.places, { slug: routeParams.place })
    }
  },
  actions: {
    setActiveTrip({ commit, state }, routeParams) {
      commit('setActiveTrip', routeParams)
    }
  }
})
