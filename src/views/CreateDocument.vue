<template>
    <v-container>
        <div class="d-flex flex-row justify-space-between">
            <h2>Create Document</h2>
            <router-link :to="{name : 'MyDocument.list.view'}">
                <v-btn variant="tonal" rounded="lg" color="info">
                    Back
                </v-btn>    
            </router-link>
        </div>
    </v-container>
</template>

<script>

export default { 
    name: 'Create Document'
}
</script>