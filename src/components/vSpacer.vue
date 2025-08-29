<template>
    <div :style="{height : size + 'px'}"></div>
</template>

<script>

export default { 
    name: "VSpacerY",
    props: {
        size: {
            type: Number,
            default: 16
        }
    }
}


</script>