.<template>
    <div>
        <!-- <v-text-field v-model="searchQuery" class="my-5" clearable @keyup.enter=findQuery(searchQuery)></v-text-field> -->
        <div class="d-flex justify-space-between align-center">
            <p>Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ articles.length }} items</p>
            <v-pagination v-model="currPage" :length="pageCount" :total-visible="5">
            </v-pagination>
        </div>
        <v-divider :thickness="2" class="border-opacity-25 my-10"></v-divider>
        <v-row>
            <template v-if="isLoading">
                <v-col v-for="n in itemsPerPage" :key="n" cols="12" md="4"> 
                    <v-skeleton-loader
                        type="card"
                        height="200px"
                        class="mb-4"
                    />
                </v-col>
            </template>
            <template v-else>
                <v-col cols="12" md="4" sm="6" v-for="article in paginatedArticles" :key="article.id">
                    <v-card elevation="2" class="pa-5 d-flex flex-column h-100">
                        <div class="d-flex justify-space-between">
                            <v-card-subtitle>
                                {{ this.$date_format(article.created_at, 'DD MMM YYYY HH:mm') }}
                            </v-card-subtitle>
                            <v-btn variant="tonal">
                                <v-icon v-if="!article?.bookmark">
                                    mdi-bookmark-outline
                                </v-icon>
                                <v-icon v-else color="warning">
                                    mdi mdi-bookmark
                                </v-icon>
                            </v-btn>
                        </div>
                        <v-card-subtitle>
                            {{ article.code }}
                        </v-card-subtitle>
                        <v-card-title class="text-wrap">{{ article.title }}</v-card-title>
                        <div class="card-images">
                            <v-img :src="getImgSource(article)" cover></v-img>
                        </div>
                        <div class="card-footer mt-auto d-flex justify-space-between">
                            <div class="d-flex flex-column my-3">
                                <p class="text-grey">
                                    {{ article.categories.name }}
                                </p>
                                <p class="text-muted">
                                    {{ article?.author?.name }}
                                </p>
                            </div>
                            <v-card-actions>
                                <v-btn
                                    variant="flat"
                                    color="info"
                                    text="See Detail"
                                    class="text-none"
                                    @click="openDialog(article)"
                                ></v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-col>
            </template>
        </v-row>
        <v-row justify="center">
            <v-col cols="auto">
                <v-pagination v-model="currPage" :length="pageCount" :total-visible="5">
                </v-pagination>
            </v-col>
        </v-row>
        <v-dialog v-model="custom_dialog" fullscreen persistent>
            <v-card>
                <div class="d-flex flex-column">
                    <div class="card-header d-flex justify-space-between w-100 align-center pa-3">
                        <v-card-title>
                            {{ selArticle.title }}
                        </v-card-title>
                        <v-btn @click="custom_dialog = false" variant="tonal" text="Close"><v-icon>mdi mdi-close</v-icon></v-btn>
                    </div>
                </div>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col cols="12" md="8" class="d-flex justify-center align-center bg-secondary">
                        <v-img :src="getImgSource(selArticle)" height="400px"></v-img>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Author" variant="outlined" v-model="selArticle.author.name" readonly></v-text-field>
                        <v-text-field label="Category" variant="outlined" v-model="selArticle.categories.name" readonly></v-text-field>
                        <v-textarea label="Description" variant="outlined" v-model="selArticle.content" class="no-resize" auto-grow readonly ></v-textarea>
                        <v-text-field label="Created Date" variant="outlined" :value="formatDate(selArticle.created_at)" readonly persistent-placeholder></v-text-field>
                        <v-text-field label="Effective Date" variant="outlined" :value="formatDate(selArticle.effective_date)" readonly persistent-placeholder></v-text-field>
                        <v-text-field label="Status" variant="outlined" v-model="selArticle.statuses.name" readonly></v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>

.card-images{ 
    height: 26rem;
    width: 100%
}

</style>
<script>

import moment from 'moment'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import { LIBRARY_ARTICLES_ANALYZE, LIBRARY_GET_CATEGORY, LIBRARY_GET_ARTICLES, LIBRARY_GET_USER, GALLERY_SHOW_ARR } from '../stores/actions/reqApi';
import { workerArticle, } from '../workers/index.js';

export default { 
    name: 'BaseArticleList',
    props: {
        search: {
            type: String,
            default: ''
        },
        searchTrigger: {
            type: [Number, String],
            default: 0
        }
    },
    data() { 
        return { 
            custom_dialog: false,
            currPage: 1,
            itemsPerPage: 9,
            worker: null,
            paginatedArticles: [],
            allArticles: [],
            totalItems: 0,
            isLoading: false,
            selArticle: null,
            allFilesImage: {},
            searchQuery: '',
        }
    },
    computed: {
        ...mapGetters({
            getLIBRARY_GET_ARTICLES: `library/${LIBRARY_GET_ARTICLES}`,
        }),
        articles() { 
            return this.getLIBRARY_GET_ARTICLES.data || [];
        },
        pageCount() { 
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        paginatedArticlesOld() {
            const start = (this.currPage - 1) * this.itemsPerPage;
            return this.articles.slice(start, start + this.itemsPerPage);
        },
        startIndex() {
            return (this.currPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            const end = this.startIndex + this.itemsPerPage;
            return end > this.articles.length ? this.articles.length : end;
        },
        currFilePath() {
            return this.allArticles.map(a => a.files?.[0]?.file_path);
        },
        filterArticles() {
            if (!this.search) return this.allArticles;

            const q = this.search.toLowerCase();

            return this.allArticles.filter(art => {
                return (
                    art.title?.toLowerCase().includes(q) ||
                    art.content?.toLowerCase().includes(q) ||
                    art.code?.toLowerCase().includes(q)
                );
            });
        },
    },
    methods: {
        formatDate(val, format){
            return moment(val).format("DD MMM YYYY HH:mm")
        },
        openDialog(currArticle){ 
            this.selArticle = currArticle;
            this.custom_dialog = true;
        },
        ...mapActions({
            act_LIBRARY_GET_ARTICLES:'library/'+LIBRARY_GET_ARTICLES,
        }),
        processPage(page) {
            if (workerArticle && this.filterArticles.length > 0) {
                this.isLoading = true;
                workerArticle.postMessage({
                    articles: JSON.parse(JSON.stringify(this.filterArticles)),
                    page,
                    perPage: this.itemsPerPage
                });
            }  else {
                this.paginatedArticles = [];
                this.totalItems = 0;
            }
        },
        showErr(){
            this.$emit('open-snackbar');
        },
        getFileId(filePath) {
            return filePath?.split('/').pop();
        },
        getImgPdf(filePath, page = 0) {
            const id = this.getFileId(filePath);
            return this.allFilesImage?.[id]?.[page] || null;
        },
        getImgSource(article) {
            const filePath = article.files?.[0]?.file_path;
            if(!filePath) return null;

            if(this.isImage(filePath)) {
                return filePath;
            }

            if(this.isPdf(filePath)) {
                return this.getImgPdf(filePath);
            }

            return this.$appInfo.ftpURL + '/elibrary/Files/word-svgrepo-com.svg';
        },
        findQuery(query) {
            this.currPage = 1;
            const base = query
                ? this.allArticles.filter(a =>
                    a.title?.toLowerCase().includes(query.toLowerCase())
                )
                : this.allArticles;

            this.isLoading = true;
            workerArticle.postMessage({
                articles: JSON.parse(JSON.stringify(base)),
                page: this.currPage,
                perPage: this.itemsPerPage
            });
        }
    },
    async mounted() { 
        this.isLoading = true;

        try {
            await this.act_LIBRARY_GET_ARTICLES({v:3,s:2})
            const all = this.getLIBRARY_GET_ARTICLES?.data || [];
            this.allArticles = all;
            const itemsWithFile = this.allArticles.filter(item => item.files?.[0]?.file_path);
            // for (const item of itemsWithFile) {
            //     const filePath = item.files[0].file_path
            //     if (filePath) { 
            //         const storeName = 'LibraryCardCache';
            //         this.globalLoadPdf(filePath, item, storeName)
            //     }
            // }
            Promise.all(
                itemsWithFile.map(async (item) => {
                    const filePath = item.files?.[0]?.file_path;
                    if (filePath) {
                        const storeName = 'LibraryCardCache';
                        await this.globalLoadPdf(filePath, item, storeName);
                    }
                })
            );
            workerArticle.onmessage = (e) => {
                this.paginatedArticles = e.data.paginated;
                this.totalItems = e.data.total;
                this.isLoading = false;
            };

            this.isLoading = false;
            this.$nextTick(async() => {
                this.processPage(this.currPage);
            })
        } catch (error) {
            console.log('Error fetching articles:', error);
            this.isLoading = false;
            this.showErr();
        }
    },
    watch: {
        currPage(newPage) {
            // this.isLoading = true;
            workerArticle.postMessage({
                articles: JSON.parse(JSON.stringify(this.filterArticles)),
                page: newPage,
                perPage: this.itemsPerPage
            });
            this.processPage(newPage);
            // this.findQuery(this.searchQuery);
            // this.findQuery(this.search);
        },
        searchTrigger() {
            this.currPage = 1;
            this.processPage(1); 
        },
    }
}

</script>