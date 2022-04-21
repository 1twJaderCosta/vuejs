<template>
  <b-container class="d-flex justify-content-center main-container">
    <img :src="require('@/assets/images/lupa.svg')" class="icon" />
    <b-form-input
      type="text"
      @input="onChange"
      v-model="searchDisplay"
      class="input"
    ></b-form-input>
  </b-container>
</template>

<script>
  export default {
    name: 'InputSearch',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      }
    },
    data() {
      return {
        results: [],
        search: '',
        searchDisplay: '',
      };
    },
    methods: {
      onChange() {
        this.$emit('input', this.search);
      },
    },
  };
</script>

<style scoped>
  .input:active,
  .input:focus,
  .input:focus:active {
    background-color: #000 !important;
    border-color: #96d3ec;
    color: white;
  }
  .input {
    background-color: #000;
    width: 30%;
  }
  .icon {
    width: 50px;
    margin-right: 5px;
  }
  .main-container{
    margin-bottom: 10px;
  }
</style>