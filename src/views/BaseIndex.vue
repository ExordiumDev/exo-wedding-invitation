<template>
     <v-main class="pa-0 h-100">
        <v-container fluid class="h-100">
            <v-row justify="center" class="h-100">
                <v-col cols="12" md="10" class="">
                    <v-breadcrumbs :items="breadcrumbs" divider=">">
                        <template #item="{ item }">
                            <router-link
                                v-if="item.to"
                                :to="item.to"
                                class="text-disabled"
                            >
                            {{ item.text }}
                            </router-link>
                            <span v-else class="text-secondary">
                                {{ item.text }}
                            </span>
                        </template>
                    </v-breadcrumbs>
                    <router-view />
                </v-col>
            </v-row>
        </v-container>
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