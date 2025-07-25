<template>
    <v-container>
        <v-row justify="center" class="h-100">
            <v-col cols="12" md="4">
                <div class="images h-100 d-flex justify-center align-center">
                    <img alt="lib-pict.png" :src="$appInfo.ftpURL+'/elibrary/Foto/all-lib-pict.png'" />
                </div>
            </v-col>
            <v-col cols="12" md="8">
                <div class="d-flex justify-content-start align-items-start">
                    <h2>{{ headerTitle }}</h2>
                </div>
                <div>
                    <div id="search-bar" class="my-5">
                        <v-text-field
                            v-model="searchField"
                            append-inner-icon="mdi-magnify"
                            density="compact"
                            label="Search name or document code"
                            variant="solo"
                            hide-details
                            single-line
                            clearable
                            @keyup.enter=ahbacod(searchField)
                        ></v-text-field>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default { 
    name: 'BaseLibraryAll',
    data() { 
        return { 
            headerTitle: 'List of Documents Library',
            
        }
    },
    mounted() {
        this.$nextTick(() => {
            
        })
    }
}

</script>