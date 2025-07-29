<template>

    <v-alert
        v-if="visible"
        :type="type"
        :title="title"
        closeable
        @click:close="closeAlert"
        class="my-4"
    >
        {{ message }}
    </v-alert>

</template>

<script>


export default { 
    name: 'BaseAlert',
    props:{
        visible: {
            type: Boolean,
            required: true,
            default: false
        },
        type: {
            type: String,
            default: 'error'
        },
        title: {
            type: String,
            default: 'Warning'
        },
        message: {
            type: String,
            required: true,
            default: ''
        }
    },
    emits: ['update:visible'],
    methods: {
        closeAlert() { 
            this.$emit('update:visible', false);
        }
    }
}

</script>