<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
  >
    <q-toolbar slot="header" class="bg-primary">
      <q-toolbar-title>
        Shawn's Travels
      </q-toolbar-title>
    </q-toolbar>

    <!-- TODO: possibly use home icon for home but words for other breadcrumbs -->

    <ul class="breadcrumb">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.slug">
        <a :href="getURL(index)">
          <!-- <q-icon :name="crumb.icon" /> -->
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
        slug: '#',
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
    },
    getURL(crumbIndex) {
      var url = ''
      for (var i = 0; i < crumbIndex + 1; i++) {
        url += '/' + this.breadcrumbs[i].slug
      }
      return url
    },
    setStoreFromNav(params) {
      console.log('SET STORE HERE')
      this.createBreadcrumbs(params) // TODO: maybe move this into store too
    }
  },
  mounted() {
    this.setStoreFromNav(this.$route.params)
  },
  watch: {
    '$route'(to, from) {
      this.setStoreFromNav(to.params)
    },
    activeTripName() {
      console.log('changed') // FIXME: still not working
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
