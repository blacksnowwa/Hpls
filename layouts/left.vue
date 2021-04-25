<template>
    <div id="left">
    <left-nav/>
    <div class="nuxt">
         <button class="nav-collaped"><font-awesome-icon :icon="['fas', 'bars']" /></button>
        <Nuxt/>
    </div>
     
    </div>
</template>
<script>
export default {
    middleware: 'auth',
}
</script>
<style >

</style>