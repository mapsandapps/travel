import Vue from 'vue'
import Vuex from 'vuex'

import find from 'lodash/find'

import data from './data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTrip: '',
    activePlace: '',
    activeSlide: -1,
    trips: data
  },
  getters: {
    getPhoto: (state, getters) => routeParams => {
      var photoID = routeParams.photoID || 0
      return state.activePlace.photos[photoID]
    }
  },
  mutations: {
    setState(state, routeParams) {
      state.activeTrip = find(state.trips, { slug: routeParams.trip })
      if (routeParams.place) {
        state.activePlace = find(state.activeTrip.places, { slug: routeParams.place })
      } else {
        state.activePlace = undefined
      }
      state.activeSlide = routeParams.photoID ? parseInt(routeParams.photoID) : -1
    }
  },
  actions: {
    setState({ commit, state }, routeParams) {
      commit('setState', routeParams)
    }
  }
})
