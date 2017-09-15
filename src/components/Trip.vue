<template>
  <div>
    {{ trip.name }}
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
    <div v-if="place">
      <div class="chevrons" v-if="place.photos">
        <!-- FIXME: need some aria -->
        <q-btn
          v-if="activeSlide > -1"
          @click="advanceSlide(-1)"
          class="chevron left"
          flat
          big
          icon-right="chevron_left"
          color="primary" />
        <q-btn
          v-if="activeSlide < place.photos.length - 1"
          @click="advanceSlide(1)"
          class="chevron right"
          flat
          big
          icon-right="chevron_right"
          color="primary" />
      </div>
      {{ place.name }}<br>
      <span v-for="(date, index) in place.dates" :key="place.dates[index]">
        <br v-if="index > 0">
        {{ date }}
      </span>
      <div v-if="activeSlide === -1">
        Map
      </div>
      <Photo v-if="activeSlide > -1"></Photo>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QIcon,
  QItem,
  QItemMain,
  QItemSeparator,
  QItemTile,
  QList
} from 'quasar'
import Photo from './Photo'

import { mapState } from 'vuex'

export default {
  name: 'trip',
  components: {
    Photo,
    QBtn,
    QIcon,
    QItem,
    QItemMain,
    QItemSeparator,
    QItemTile,
    QList
  },
  place: '',
  computed: mapState({
    trip: 'activeTrip',
    place: 'activePlace',
    activeSlide: 'activeSlide'
  }),
  methods: {
    advanceSlide(amount) {
      var newSlide = this.activeSlide + amount
      if (newSlide < 0) {
        this.$router.push(`/${this.$route.params.trip}/${this.place.slug}`)
      } else {
        this.$router.push(`/${this.$route.params.trip}/${this.place.slug}/${newSlide}`)
      }
    },
    changePlace(place) {
      this.$router.push(`/${this.$route.params.trip}/${place.slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.q-btn-standard {
  .q-icon {
    font-size: 50px;
  }
}
.chevrons {
  .chevron {
    position: fixed;
    top: calc(50vh - 25px); // FIXME: adjust for "big" button
    padding: 0px;
    &.left {
      left: 0px;
    }
    &.right {
      right: 0px;
    }
  }
}
</style>
