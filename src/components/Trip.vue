<template>
  <div>
    {{ name }}<br>
    {{ placeName }}<br>
    <q-list separator>
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

import find from 'lodash/find'

export default {
  name: 'trip',
  components: {
    QItem,
    QItemMain,
    QItemSeparator,
    QItemTile,
    QList
  },
  place: '',
  data() {
    return {
      name: this.$store.state.activeTrip,
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
    this.$store.dispatch('setActiveTrip', this.$route.params.trip).then(() => {
      this.name = this.$store.state.activeTrip
      this.place = find(this.trip.places, { slug: this.$route.params.place })
    })
  }
}
</script>

<style scoped>
  
</style>
