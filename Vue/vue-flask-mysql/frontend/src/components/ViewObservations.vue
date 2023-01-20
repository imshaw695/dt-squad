<template>
    <div>
        <h1>Messages should appear below.</h1>
        {{ this.message }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "",
        }
    },
    props: [
        "user",
        "messages",
        "observations",
    ],
    methods: {
        display_messages() {
            console.log("inside display_messages function")
            if (this.messages.message_array.length) {
                this.message = this.messages.message_array[0];
                this.messages.delete_message();
            } else {
                this.message = "";
            }
            setTimeout(this.display_messages,5000);
        },
        
    },
    created() {
        console.log("created")
        this.display_messages();
    }
}
</script>