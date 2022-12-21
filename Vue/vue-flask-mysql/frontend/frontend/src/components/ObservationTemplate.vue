<template>
    <div>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'ObservationTemplate',
    data() {
        return {
             msg: ""
        }
    },
    methods: {
        getResponse() {
            const path = 'http://localhost:5000/createobservation';
            axios.get(path)
            .then ((res) => {
                console.log(res.data)
                this.msg = res.data;
            })
            .catch ((err) => {
                console.error(err);
            }); 
        }
    },
    created() {
        this.getResponse();
    }

}
</script>