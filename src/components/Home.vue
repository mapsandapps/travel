<template>
  <q-card>
    <q-card-main>
      <q-list no-border link inset-delimiter>
        <q-list-header>Trips</q-list-header>
        <q-item
          v-for="trip in trips"
          :to="`/${trip.slug}`"
          :key="trip.slug">
          <q-item-side icon="location_on" />
          <q-item-main :label="trip.name" :sublabel="trip.date" />
        </q-item>
      </q-list>
    </q-card-main>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardMain,
  QItem,
  QItemMain,
  QItemSide,
  QList,
  QListHeader
} from 'quasar'

export default {
  name: 'home',
  components: {
    QCard,
    QCardMain,
    QItem,
    QItemMain,
    QItemSide,
    QList,
    QListHeader
  },
  data() {
    return {
      trips: this.$store.state.trips
    }
  }
}
</script>
