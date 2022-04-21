<template>
  <b-row>
    <b-col 
        cols="2" 
        v-for="(result, i) in results"
        :key="i"
        :id="result?.Title || i"
        @mouseover="onMouseHoverCard(result, i)"
        @mouseleave="onMouseLeaveCard(result, i)"
        @click="clickOnCard(result)"
    >
        <img v-if="result?.Poster !== 'N/A'" :src="result?.Poster" class="card-image" />
        <img v-else :src="require('@/assets/images/bees.png')" class="card-image" />
        <div class="display-none">
            <h3 >{{ result?.Title }}<h2 >{{ result?.Year }}</h2></h3>  
        </div>
    </b-col>
  </b-row>
</template>


<script>
import router from '@/router'

export default {
  name: 'HomeCards',
  props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      }
  },
  data() {
      return {
        results: []
      }
  },
  watch: {
    items: function (value, oldValue) {
        if (value.length !== oldValue.length) {
            this.results = value;
        } 
    },
  },
  methods: {
      onMouseHoverCard(item, i){
          document?.getElementById(item.Title || i)?.getElementsByTagName('img')[0]?.classList.add("card-image-extra")
          document?.getElementById(item.Title || i)?.getElementsByTagName('div')[0]?.classList.add("info-div")
      },
      onMouseLeaveCard(item, i){
          document?.getElementById(item.Title || i)?.getElementsByTagName('img')[0]?.classList.remove("card-image-extra")
          document?.getElementById(item.Title || i)?.getElementsByTagName('div')[0]?.classList.remove("info-div")
      },
      clickOnCard(item) {
          router.push(`/detail/${item?.imdbID}`)
      }
  }
}
</script>

<style scoped>
.card-image {
    height: 300px;
    width: 100%;
    padding: 10% 10% 0 10%;
    
}
.card-image-extra {
    filter: blur(4px);
    -webkit-filter: blur(4px);
    cursor: pointer;
}
.display-none {
    display: none;
}
.info-div {
    padding: 10% 10% 0 10%;
    cursor: pointer;
    display: block;
}
h3 {
    position: absolute;
    z-index: 100;
    margin-top: -125px;
    width: 211px;
    font-size: 15px;
    color: white;
    margin-left: 9px;
    text-shadow: 2px 2px 4px #000000;
}
h2 {
    position: absolute;
    z-index: 100;
    margin-top: 6px;
    font-size: 15px;
    color: white;
    text-shadow: 2px 2px 4px #000000;
}
</style>
