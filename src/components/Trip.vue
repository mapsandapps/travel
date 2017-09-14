<template>
  <div>
    {{ name }}
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
      <div class="chevrons">
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

import find from 'lodash/find'

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
  data() {
    return {
      name: this.$store.state.activeTrip.name,
      trip: this.$store.getters.getTrip(this.$route.params.trip),
      placeName: this.$route.params.place,
      place: {},
      activeSlide: this.$store.state.activeSlide
    }
  },
  methods: {
    advanceSlide(amount) {
      this.activeSlide += amount
      if (this.activeSlide === -1) {
        this.$router.push(`/${this.$route.params.trip}/${this.place.slug}`)
      } else {
        this.$router.push(`/${this.$route.params.trip}/${this.place.slug}/${this.activeSlide}`)
      }
    },
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
  },
  watch: {
    '$route'(to, from) {
      if (this.activeSlide > -1) {
        this.$store.dispatch('setSlide', this.activeSlide)
      } else {
        this.$store.dispatch('setSlide', -1)
      }
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
