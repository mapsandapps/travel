<template>
  <div class="container">
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
  },
  watch: {
    '$route'(to, from) {
      this.photo = this.$store.getters.getPhoto(to.params)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  img {
    margin: 0 auto;
  }
}
</style>
