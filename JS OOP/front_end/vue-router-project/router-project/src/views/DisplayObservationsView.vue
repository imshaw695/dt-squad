<template> 
    <ul>
        <li v-for="observation in observations">
            {{ observation.time }} - {{ observation.data }}
        </li>
    </ul>
</template>

