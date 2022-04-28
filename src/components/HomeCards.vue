<template>
  <b-row>
    <b-col 
        cols="2" 
        v-for="(result, i) in results"
        :key="i"
        :id="(result?.imdbID + this?.identifier)"
        @mouseover="() => onMouseHoverCard(result)"
        @mouseleave="() => onMouseLeaveCard(result)"
    >
        <img v-if="result?.Poster !== 'N/A'" :src="result?.Poster" class="card-image" />
        <img v-else :src="require('@/assets/images/bees.png')" class="card-image" />
        <div class="display-none">
            <h3 @click="() => clickOnCard(result)" >{{ result?.Title }}<h2 >{{ result?.Year }}</h2></h3>  
            <div>
                <b-button class="btn-detail" v-b-modal="'modal-1'+result?.imdbID + this?.identifier" id="bv-modal-1">Detail</b-button>
                <b-button v-if="result?.wishList" @click="() => removeFromWishList(result)" variant="success">Wishlist</b-button>
                <b-button v-else variant="danger"  @click="() => addToWishList(result)" >Add to Wishlist</b-button>
                <b-modal 
                    :id="'modal-1'+ result?.imdbID + this?.identifier" 
                    :ref="'modal-1'+ result?.imdbID + this?.identifier" 
                    title="Detail" 
                    hide-footer 
                    size="xl"
                    header-bg-variant="dark"
                    header-text-variant="light"
                    body-bg-variant="dark"
                    body-text-variant="light"
                    footer-bg-variant="dark"
                    footer-text-variant="light"
                    @hide="() => onClose()"
                    @show="() => showBody('modal-body'+ result?.imdbID + this?.identifier)"
                >
                    <div v-if="display === 'modal-body'+ result?.imdbID + this?.identifier " class="main-div-modal">
                        <DetailCard :id="result?.imdbID" />
                    </div>
                </b-modal>
            </div>
        </div>
    </b-col>
  </b-row>
</template>


<script>
import router from '@/router'
import DetailCard from '@/components/DetailCard.vue'
import localStorageHelper from '@/utils/localstorage'

export default {
  name: 'HomeCards',
  props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
      identifier: {
        type: String,
        required: false,
        default: () => '',
      },
  },
  components: {
    DetailCard
  },
  data() {
      return {
        results: [],
        display: ''
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
      onMouseHoverCard(item){
          document?.getElementById(item.imdbID + this?.identifier)?.getElementsByTagName('img')[0]?.classList.add("card-image-extra")
          document?.getElementById(item.imdbID + this?.identifier)?.getElementsByTagName('div')[0]?.classList.add("info-div")
      },
      onMouseLeaveCard(item){
          document?.getElementById(item.imdbID + this?.identifier)?.getElementsByTagName('img')[0]?.classList.remove("card-image-extra")
          document?.getElementById(item.imdbID + this?.identifier)?.getElementsByTagName('div')[0]?.classList.remove("info-div")
      },
      clickOnCard(item) {
          router.push(`/detail/${item?.imdbID}`)
      },
      async onClose() {
          await this.$parent.getWishList();
      },
      async addToWishList(item){
        await localStorageHelper.saveToWishList(item)
        await this.$parent.getWishList();
      },
      async checkIfExist(item){
          return await localStorageHelper.checkIfExist(item)
      },
      async removeFromWishList(item){
          await localStorageHelper.removeFromWishList(item)
          await this.$parent.getWishList();
      },
      showBody(e){
          this.display = e
      }
  }
}
</script>

<style scoped>
.card-image {
    height: 400px;
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
.btn-detail {
    margin-right: 5px;
}
</style>
