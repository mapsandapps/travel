<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="bg-primary">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Shawn's Travels
        <div slot="subtitle">{{ activeTripName }}</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Trips</q-list-header>
        <q-side-link
          item
          v-for="trip in trips"
          :to="`/${trip.slug}`"
          :key="trip.slug">
          <q-item-side icon="location_on" />
          <q-item-main :label="trip.name" :sublabel="trip.date" />
        </q-side-link>
      </q-list>
    </div>

    <router-view class="layout-view" />
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItemSide,
  QItemMain,
  QSideLink
} from 'quasar'

export default {
  name: 'nav',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItemSide,
    QItemMain,
    QSideLink
  },
  data () {
    return {
      activeTripName: this.$store.state.activeTrip,
      trips: this.$store.state.trips
    }
  },
  watch: {
    activeTripName: () => {
      console.log('changed')
    }
  }
}
</script>

<style>

</style>
