.<template>
    <div>
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
                    <v-card elevation="8" class="pa-5 d-flex flex-column h-100">
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
                        <div class="card-images ">
                            <v-img cover :src="$appInfo.ftpURL+'/elibrary/Files/word-svgrepo-com.svg'"></v-img>
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
                                    @click="reserve"
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
    </div>
</template>

<style scoped>

.card-images{ 
    height: 26rem;
    width: 100%
}

</style>
<script>

import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import { LIBRARY_ARTICLES_ANALYZE, LIBRARY_GET_CATEGORY, LIBRARY_GET_ARTICLES, LIBRARY_GET_USER, GALLERY_SHOW_ARR } from '../stores/actions/reqApi';
import ArticleWorker from '../workers/articleWorker.js?worker'

export default { 
    name: 'BaseArticleList',
    data() { 
        return { 
            currPage: 1,
            itemsPerPage: 9,
            worker: null,
            paginatedArticles: [],
            allArticles: [],
            totalItems: 0,
            isLoading: false,
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
    },
    methods: {
        ...mapActions({
            act_LIBRARY_GET_ARTICLES:'library/'+LIBRARY_GET_ARTICLES,
        }),
        processPage(page) {
            if (this.worker && this.allArticles.length > 0) {
                this.isLoading = true;
                this.worker.postMessage({
                    articles: JSON.parse(JSON.stringify(this.allArticles)),
                    page,
                    perPage: this.itemsPerPage
                });
            }
        },
    },
    mounted() { 
        this.isLoading = true;
        this.worker = new ArticleWorker(); 
        this.worker.onmessage = (e) => {
            this.paginatedArticles = e.data.paginated;
            this.totalItems = e.data.total;
            this.isLoading = false;
        };

        this.$nextTick(async() => {
            await this.act_LIBRARY_GET_ARTICLES({v:3,s:2})
            const all = this.getLIBRARY_GET_ARTICLES?.data || [];
            this.allArticles = all;
            // this.isLoading = false;

            this.processPage(this.currPage);
        })
    },
    watch: {
        currPage(newPage) {
            // this.isLoading = true;
            this.worker.postMessage({
                articles: JSON.parse(JSON.stringify(this.allArticles)),
                page: newPage,
                perPage: this.itemsPerPage
            });
        }
    }
}

</script>