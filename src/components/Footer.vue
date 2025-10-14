<template>
    <v-footer app height="64" color="exr_accent_orange_600" class="px-5">
        <div class="d-flex w-100 align-center">
            <strong>Exordium</strong>
            <v-spacer></v-spacer>
            <div class="d-flex ga-2 ms-auto">
                <v-btn
                    v-for="(i, idx) in icons"
                    :key="idx"
                    :icon="i._ico"
                    variant="plain"
                    color="white"
                />
            </div>
        </div>
    </v-footer>

</template>

<script>

export default {
    name: 'Footer',
    data() {
        return { 
            icons: [
                {
                    _url: 'facebook',
                    _ico: 'mdi-facebook',
                },
                {
                    _url: 'twitter',
                    _ico: 'mdi-twitter',
                },
                {
                    _url: 'linkedin',
                    _ico: 'mdi-linkedin',
                },
                {
                    _url: 'instagram',
                    _ico: 'mdi-instagram',
                },
            ]
        }
    }
}

</script>