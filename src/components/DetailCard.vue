<template>
  <div>
  <SpinnerGlobal 
  v-if="loading"
  />
  <b-container class="main-container">
    <b-row>
      <b-col 
          cols="4"
      >
          <img v-if="item?.Poster !== 'N/A'" :src="item?.Poster" class="card-image" />
          <img v-else :src="require('@/assets/images/bees.png')" class="card-image" />
      </b-col>
      <b-col 
          cols="4"
      >
        <h1 class="text-general" >{{ item?.Title }}</h1>
        <p>Year: {{ item?.Year }}</p>
        <p>Rated: {{ item?.Rated }}</p>
        <p>Runtime: {{ item?.Runtime }}</p>
        <p>Released: {{ item?.Released }}</p>
        <p>Genre: {{ item?.Genre }}</p>
        <p>Director: {{ item?.Director }}</p>
        <p>Writer: {{ item?.Writer }}</p>
        <p>Actors: {{ item?.Actors }}</p>
        <p>Plot: {{ item?.Plot }}</p>
        <p>Language: {{ item?.Language }}</p>
        <p>Country: {{ item?.Country }}</p>
      </b-col>
      <b-col 
          cols="4"
      >
        <img 
          v-if="wishlist"
          :src="require('@/assets/images/wishlist-active.png')" class="wishimage" 
          @click="removeFromWishList(item)"
        />
        <img 
          v-else 
          :src="require('@/assets/images/wishlist.png')" class="wishimage" 
          @click="saveToWishList(item)"
        />
        <p>Awards: {{ item?.Awards }}</p>
        <p>Metascore: {{ item?.Metascore }}</p>
        <p>Rating: {{ item?.imdbRating }}</p>
        <p>Votes: {{ item?.imdbVotes }}</p>
        <p>ID: {{ item?.imdbID }}</p>
        <p>Type: {{ item?.Type }}</p>
        <p>DVD: {{ item?.DVD }}</p>
        <p>BoxOffice: {{ item?.BoxOffice }}</p>
        <p>Production: {{ item?.Production }}</p>
        <p>Website: {{ item?.Website }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col 
          cols="4"
      >
      <img 
          v-if="!id"
          :src="require('@/assets/images/back.png')" class="backimage" 
          @click="backToHome()"
        />
      </b-col>
    </b-row>
    </b-container>
    </div>
</template>

<script>
import axios from 'axios';

import config from '@/config'
import localStorageHelper from '@/utils/localstorage'
import router from '@/router'

import SpinnerGlobal from '@/components/SpinnerGlobal.vue'

export default {
  mounted() {
      this.getInfo()
  },
  props: {
    id: {
      type: String,
    }
  },
  deep: true,
  immediate: true,
  components: {
    SpinnerGlobal,
  },
  data() {
      return {
        item: {},
        wishlist: false,
        loading: true
      }
  },
  methods: {
    async getInfo() {
      const id = ((location?.pathname+location?.search).split('detail/')[1] || this.id)
      const item = await axios.get(`${config?.BASEURL}watch/${id}`);
      const wishlist = await localStorageHelper.checkIfExist(item.data)
      this.item = item.data
      this.wishlist = wishlist
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    async saveToWishList(item){
      await localStorageHelper.saveToWishList(item)
      this.wishlist = true
    }, 
    async removeFromWishList(item){
      await localStorageHelper.removeFromWishList(item)
      this.wishlist = false
    },
    backToHome() {
      router.push('/')
    }
  }

  
}



</script>


<style scoped>
.card-image {
    width: 100%;
}
.text-general {
  color: white;
}
.wishimage {
  width: 80px;
  margin-bottom: 20px;
}
.wishimage:hover {
  cursor: pointer;
}
.main-container {
  padding: 50px;
}
.backimage{
  width: 80px;
}
.backimage:hover {
  cursor: pointer;
}
p {
  color: white;
}
</style>