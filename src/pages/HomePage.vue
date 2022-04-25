<template>
  <div class="main-container">
    <div class="flex-row">
      <img class="img-cinema" src='@/assets/images/cinema.png' />
      <h1>WEISS CINEMA</h1>
    </div>
    <InputSearch
        @input="getWatch"
        :items="list"
    />
    <h3 v-if="searchWord !== '' && notFound === '' " >Search Results For "{{ searchWord }}"</h3>
    <h3 v-if="notFound !== '' " >Results Not Found For "{{ notFound }}"</h3>
    
    <div v-if="notFound || searchWord" class="line"/>
    <HomeCards identifier="cards" :items="list" />

      <div v-if="wishList && wishList.length > 0" class="wishlistdiv" >
        <h3>Your Wishlist</h3>
        <div class="line" />
      </div>
      <HomeCards identifier="wishlist" :items="wishList" />
  </div>
</template>


<script>
import axios from 'axios';
import InputSearch from '@/components/InputSearch.vue'
import HomeCards from '@/components/HomeCards.vue'
import config from '@/config'
import localStorageHelper from '@/utils/localstorage'

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  components: {
    InputSearch,
    HomeCards
  },
  
  data() {
      return {
        list: [],
        wishList: [],
        notFound: '',
        searchWord: ''
      }
  },
  mounted() {
      this.getWishList()
  },
  methods: {
      updateList(list, wish){
        const newList = []
        for (const x of list){
          let exist = false
          for (const y of wish){
            if(x.imdbID === y.imdbID){
              exist = true
              continue;
            }
          }
          x.wishList = exist
          newList.push(x)
        }
        return newList
      },
      async getWatch(e, f) {
        try{
          const word = f || e?.target?.value
          this.searchWord = word
          if( (word || '').length >= 3 ){
            const response = await axios.get(`${config?.BASEURL}watch/search?word=${word}`);
            if (response?.data?.Search?.length > 0){
              const wish = await localStorageHelper.getFromWishList()
              const res = response?.data?.Search;
              const newList = this.updateList(res, wish)
              this.list = newList
              this.notFound = ''
            } else {
              this.list = []
              this.notFound = word
            }
          } else {
            this.list = []
            this.notFound = ''
          }
        } catch(err){
          console.log(err)
        }
      },
      async getWishList() {
        const wishList = await localStorageHelper.getFromWishList()
        const newWishList = []
        for (const x of wishList){
          x.wishList = true
          newWishList.push(x)
        }
        const newList = this.updateList(this.list, wishList)
        this.list = newList
        this.wishList = newWishList
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
  margin-left: 1%;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.main-container {
  padding: 30px;
}
.line {
  border-top: 1px solid white;
  height: 1px;
  margin-left: 1.6%;
  margin-right: 1.6%;
}
.wishlistdiv {
  margin-top: 10px;
}
h3 {
  margin-left: 1.6%;
  min-width: 20px;
}
</style>
