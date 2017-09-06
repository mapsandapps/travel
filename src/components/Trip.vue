<template>
  <div>
    {{ name }}
    <div v-if="place">
      {{ place.name }}<br>
      <span v-for="(date, index) in place.dates" :key="place.dates[index]">
        <br v-if="index > 0">
        {{ date }}
      </span>
    </div>
    <q-list v-if="!place" separator>
      <q-item
        v-for="place in trip.places"
        :key="place.name"
        @click="changePlace(place)">
        <q-item-main>
          <a>
            <q-item-tile label>
              {{ place.name }}
            </q-item-tile>
          </a>
        </q-item-main>
      </q-item>
    </q-list>

    <Photo></Photo>
  </div>
</template>

<script>
import {
  QItem,
  QItemMain,
  QItemSeparator,
  QItemTile,
  QList
} from 'quasar'
import Photo from './Photo'

import find from 'lodash/find'

export default {
  name: 'trip',
  components: {
    Photo,
    QItem,
    QItemMain,
    QItemSeparator,
    QItemTile,
    QList
  },
  place: '',
  data() {
    return {
      name: this.$store.state.activeTrip.name,
      trip: this.$store.getters.getTrip(this.$route.params.trip),
      placeName: this.$route.params.place,
      place: {}
    }
  },
  methods: {
    changePlace(place) {
      this.placeName = place.name
      this.place = place
      this.$router.push(`/${this.$route.params.trip}/${place.slug}`)
    }
  },
  beforeMount() {
    this.$store.dispatch('setActiveTrip', this.$route.params).then(() => {
      this.name = this.$store.state.activeTrip.name
      this.place = find(this.trip.places, { slug: this.$route.params.place })
    })
  }
}
</script>

<style lang="scss" scoped>
  
</style>
