import Vue from 'vue'
import Vuex from 'vuex'

import find from 'lodash/find'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trips: [
      {
        slug: 'montana-2017',
        name: 'Montana 2017',
        date: 'August 5-12, 2017'
      }
    ]
  },
  getters: {
    getTrip: (state, getters) => (slug) => {
      return find(state.trips, { 'slug': slug })
    }
  }
})
