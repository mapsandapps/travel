<template>
  <div>
    <img :src="`https://s3.us-east-2.amazonaws.com/mapsandapps-travel/montana-2017-thumbnails/${photo.SourceFile}`">
  </div>
</template>

<script>
export default {
  name: 'Photo',
  data() {
    return {
      photo: this.$store.getters.getPhoto(this.$route.params)
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
