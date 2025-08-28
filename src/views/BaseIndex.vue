<template>
     <v-main class="pa-0">
         <router-view />
    </v-main>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
    const list = []
    let currRoute = route

    while (currRoute) {
        const { meta, name } = currRoute
        if (meta?.breadcrumb) {
            list.unshift({
                text: meta.breadcrumb,
                to: currRoute.fullPath !== route.fullPath ? currRoute.fullPath : null
            })
        }

        if (meta?.parent) {
            currRoute = router.resolve({ name: meta.parent })
        } else {
            break
        }
    }

    return list
})

</script>