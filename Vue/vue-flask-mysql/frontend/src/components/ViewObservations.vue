<template>
    <div>
        {{ this.messages.messageArray }}
    </div>
</template>

<script>
export default {
    props: [
        "user",
        "messages",
        "observations",
    ]
}
</script>