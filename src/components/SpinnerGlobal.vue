
<template>
    <div class="main-spinner">
        <div class="text-center">
        <b-spinner class="spinner" variant="primary" label="Text Centered"></b-spinner>
        </div>
    </div>
</template>

<style scoped>
.main-spinner{
    position: absolute;
    width: 100%;
    background-color: white;
    height: 100%;
    opacity: 0.7;
    padding-top: 25%;
    margin-left: -1.4%;
    margin-top: -1.4%;
}
.spinner {
    width: 5rem;
    height: 5rem;
}
</style>