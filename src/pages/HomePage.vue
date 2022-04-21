<template>
  <div class="main-container">
    <div class="flex-row">
      <img class="img-cinema" src='@/assets/images/cinema.png' />
      <h1>WEISS CINEMA</h1>
    </div>
    <SearchAutocomplete
        @input="getWatch"
        :items="list"
    />
    <HomeCards :items="list" />
  </div>
</template>


<script>
import axios from 'axios';
import SearchAutocomplete from '@/components/SearchAutocomplete.vue'
import HomeCards from '@/components/HomeCards.vue'
import config from '@/config'

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  components: {
    SearchAutocomplete,
    HomeCards
  },
  data() {
      return {
        list: []
      }
  },
  methods: {
      async getWatch(e) {
        try{
          const word = e?.target?.value
          if( (word || '').length >= 3 ){
            // GET request using axios with async/await
            const response = await axios.get(`${config?.BASEURL}watch/search?word=${word}`);
            //console.log("response", response)
            if (response?.data?.Search?.length > 0){
              this.list = response?.data?.Search;
            } else {
              this.list = []
            }
          }
        } catch(err){
          console.log("err", err)
          this.list = []
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
  margin-top: 10px;
  margin-left: 10px;
}
.img-cinema {
  width: 85px;
  height: 70px;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.main-container {
  padding: 30px;
}
</style>
