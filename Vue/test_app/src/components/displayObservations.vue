<template>
    <div id="mainDiv">
        <h1>{{ test }}</h1>
        <p>This is a bit shit</p>
    </div>
</template>

<script>
export default {
    name: "displayObservations",
    data() {
        return {
            test: "test123"
        }
    }
}
</script>

<style scoped>
h1 {
font-family: 'Courier New'
}
</style>