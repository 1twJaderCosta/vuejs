<template>
  <div>
    <SearchAutocomplete
        :items="[
          'Apple',
          'Banana',
          'Orange',
          'Mango',
          'Pear',
          'Peach',
          'Grape',
          'Tangerine',
          'Pineapple'
        ]"
    />
  </div>
</template>


<script>
import SearchAutocomplete from '../components/SearchAutocomplete.vue'

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  components: {
    SearchAutocomplete
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
