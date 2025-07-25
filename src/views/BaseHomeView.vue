<template>
    <v-container class="h-100" fluid>
        <v-row justify="center" class="h-100 w-100">
            <v-col cols="12" md="4">
                <div class="images h-100 d-flex justify-center align-center">
                    <img alt="lib-pict.png" :src="$appInfo.ftpURL+'/elibrary/Foto/home-lib-pict.png'" />
                </div>
            </v-col>
            <v-col cols="12" md="8">
                <div class="px-10 d-flex flex-column justify-center h-100">
                    <div id="header-title" class="">
                        <h2 class="fw-900">{{ headerTitle }}</h2>
                    </div>
                    <div>
                        <p class="fw-900">{{ bodyTxt }}</p>
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
                                @keyup.enter=ahbacodFindTxt(searchField)
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="d-flex flex-row w-100">
                        <div class="filter-dropdown">
                            <v-menu :location="location">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        color="primary"
                                        v-bind="props"
                                        variant="outlined"
                                    >
                                        <v-icon>
                                            mdi-menu-down
                                        </v-icon>
                                        Filter
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item
                                        v-for="(item, index) in items"
                                        :key="index"
                                        :value="index"
                                    >
                                        <template v-if="index === 1">
                                            <v-menu open-on-click offset-x location="end">
                                                <template v-slot:activator="{ props: subProps1 }">
                                                    <v-list-item v-bind="subProps1">
                                                        <v-list-item-title @click="togglePopular()">
                                                            {{ item }}
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </template>
                                            </v-menu>
                                        </template>
                                        <template v-else-if="index === 2">
                                            <v-menu open-on-click offset-x location="end">
                                                <template v-slot:activator="{ props: subProps2 }">
                                                    <v-list-item v-bind="subProps2">
                                                        <v-list-item-title>
                                                            {{ item }}
                                                            <v-icon class="ml-auto">mdi-chevron-right</v-icon>
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </template>
                                                <v-list>
                                                    <v-date-picker elevation="24" v-model="filters.findDateUpload" @update:model-value="onDatePicked" @click.stop></v-date-picker>
                                                </v-list>
                                            </v-menu>
                                        </template>
                                        <template v-else-if="index === 3">
                                            <v-menu open-on-click offset-x location="end" origin="bottom left" transition="scale-transition">
                                                <template v-slot:activator="{ props: subProps3 }">
                                                    <v-list-item v-bind="subProps3">
                                                        <v-list-item-title>
                                                            {{ item }}
                                                            <v-icon class="ml-auto">mdi-chevron-right</v-icon>
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </template>
                                                <v-card>
                                                    <div style="position: sticky; top: 0; z-index: 10; background: white;">
                                                        <v-text-field
                                                            class="ma-2"
                                                            @click.stop
                                                            v-model="findUser"
                                                            placeholder="Search item..."
                                                            density="compact"
                                                            hide-details
                                                            append-inner-icon="mdi-magnify"
                                                            clearable
                                                        />
                                                    </div>
                                                    <div style="max-height: 20rem; min-width: 18rem;">
                                                        <v-list>
                                                            <template v-if="listUser.length">
                                                                <v-list-item v-for="(i, idx) in listUser" :key="idx">
                                                                    <v-list-item-title @click="findAuthor(idx)">
                                                                        {{ i.name }}
                                                                    </v-list-item-title>
                                                                </v-list-item>
                                                            </template>
                                                            <template v-else>
                                                                <v-list-item>
                                                                    <v-list-item-title class="text-grey text-center">No data found</v-list-item-title>
                                                                </v-list-item>
                                                            </template>
                                                        </v-list>
                                                    </div>
                                                </v-card>
                                            </v-menu>
                                        </template>
                                        <template v-else>
                                            <v-list-item>
                                                <v-list-item-title @click="toggleBookmark()">{{ item }}</v-list-item-title>
                                            </v-list-item>
                                        </template>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        <div class="d-flex parent-category-scroll ml-2">
                            <v-btn variant="tonal">
                                <v-icon @click="$scrollLeftOnce($refs.scrollContainer,100,'left')" @mousedown="$startScroll($refs.scrollContainer, 'left')" @mouseup="$stopScroll" @mouseleave="$stopScroll">
                                    mdi mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <div class="d-flex category-scroll" ref="scrollContainer" @mousedown="$startDrag($event, $refs.scrollContainer)" @mousemove="$onDrag($event, $refs.scrollContainer)" @mouseup="$stopDrag" @mouseleave="$stopDrag">
                                <div v-for="(i, idx) in getLIBRARY_GET_CATEGORY.data" :key="idx">
                                    <v-btn variant="tonal" class="mx-1 text-none" @click="$handleClick($event, i.id)">
                                        {{ i.name }}
                                    </v-btn>
                                </div>
                            </div>
                            <v-btn variant="tonal" @click="$scrollLeftOnce($refs.scrollContainer,100,'right')" @mousedown="$startScroll($refs.scrollContainer, 'right')" @mouseup="$stopScroll" @mouseleave="$stopScroll">
                                <v-icon>
                                    mdi mdi-chevron-right
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.v-list-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.v-list-item-title {
    margin: 0.5rem !important;
    padding: 0 !important;
}

</style>

<script>

import { mapGetters } from 'vuex';
import { LIBRARY_GET_CATEGORY, LIBRARY_GET_USER } from '../stores/actions/reqApi'

export default { 
    name: 'BaseHomeView',
    data() { 
        return { 
            headerTitle: 'Selamat Datang di eLibrary',
            bodyTxt: `“ Satu Portal Untuk Semua. “`,
            findUser: '',
            filters: {
                searchField: '',
                findAuthor: '',
                findBookmark: false,
                findPopular: false,
                findDateUpload: '',
                findCategory: null,
            },
            items: [
                'Bookmark',
                'Popular',
                'Date Upload',
                'Release By',
            ],
        }
    },
    computed: { 
        ...mapGetters({
            getLIBRARY_GET_CATEGORY: `library/${LIBRARY_GET_CATEGORY}`,
            getLIBRARY_GET_USER: `user/${LIBRARY_GET_USER}`,
        }),
        listUser() {
            if(!this.findUser ) return this.getLIBRARY_GET_USER.data || 'No data found';

            const keyword = this.findUser.toLowerCase();
            return this.getLIBRARY_GET_USER.data.filter(u => 
                u.name.toLowerCase().includes(keyword)
            );
        }
    },
    methods: {
        ahbacodFindTxt(val) { 
            this.filters.searchField = val;
            this.pushWithParam();
        },
        onDatePicked(val) {
            this.filters.findDateUpload = this.$date_format(val, 'YYYY-MM-DD');
            this.pushWithParam();
        },
        togglePopular() { 
            this.filters.togglePopular = !this.filters.togglePopular;
            this.pushWithParam();
        },
        toggleBookmark() { 
            this.filters.findBookmark = !this.filters.findBookmark;
            this.pushWithParam();
        },
        findCategory(id) {
            this.filters.findCategory = id;
            this.pushWithParam();
        },
        findAuthor(authorName){ 
            this.filters.findAuthor = authorName;
            this.pushWithParam();
        },
        pushWithParam(params) {
            Object.assign(this.filters, params);
            this.$router.push({
                name: 'Library.view',
                query: this.filters
            });
        },
    },
    mounted() {
        this.$nextTick(() => { 
            // console.log('category ',this.getLIBRARY_GET_CATEGORY.data)
        })
    }
}

</script>