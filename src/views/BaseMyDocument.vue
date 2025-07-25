<template>
    <v-container>
        <div class="d-flex flex-row justify-space-between">
            <h2>My Document</h2>
            <router-link :to="{name : 'MyDocument.create.view'}">
                <v-btn variant="tonal" rounded="lg" color="info">
                    Create
                </v-btn>
            </router-link>
        </div>
    </v-container>
</template>

<script>

export default { 
    name: 'My Document'
}
</script>