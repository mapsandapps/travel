<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="bg-primary">
      <q-toolbar-title>
        Shawn's Travels
        <div slot="subtitle">{{ activeTripName }}</div>
      </q-toolbar-title>
    </q-toolbar>

    <ul class="breadcrumb">
      <li v-for="crumb in breadcrumbs" :key="crumb.slug">
        <a>
          <q-icon :name="crumb.icon" />
          {{ crumb.name }}
        </a>
      </li>
    </ul>

    <router-view class="layout-view" />
  </q-layout>
</template>

<script>
import find from 'lodash/find'
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
      breadcrumbs: [],
      trips: this.$store.state.trips
    }
  },
  methods: {
    createBreadcrumbs(params) {
      var crumbs = [{
        slug: '',
        name: 'Travels',
        icon: 'home'
      }]
      if (params.trip) {
        var thisTrip = find(this.trips, ['slug', params.trip])
        console.log(this.trips)
        crumbs.push({
          slug: params.trip,
          name: thisTrip.name,
          icon: 'map'
        })
        if (params.place) {
          crumbs.push({
            slug: params.place,
            name: find(thisTrip.places, ['slug', params.place]).name,
            icon: 'place'
          })
        }
      }
      this.breadcrumbs = crumbs
    }
  },
  mounted() {
    this.createBreadcrumbs(this.$route.params)
  },
  watch: {
    '$route'(to, from) {
      this.createBreadcrumbs(to.params)
    },
    activeTripName: () => {
      console.log('changed') // FIXME: still not working
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
