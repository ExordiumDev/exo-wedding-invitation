<template>
    <div class="main-footer d-flex flex-column bg-customFooterLight">
        <v-row justify="center" class="my-5">
            <v-col cols="12" class="d-flex justify-center">
                <h2>JALA Net</h2>
            </v-col>
        </v-row>
        <v-row class="my-5">
            <v-col cols="12" md="6">
                <div class="d-flex justify-space-between px-10 flex-wrap">
                    <div class="_cust-service d-flex-flex-column">
                        <h3 class="font-weight-light">Customer Service</h3>
                        <div class="py-5">
                            <div class="_contact-number d-flex flex-row ga-5">
                                <v-icon class="_contact-number-ico">mdi-phone</v-icon>
                                <p>( 022 ) 8717574</p>
                            </div>
                            <div class="_contact-email d-flex flex-row ga-5">
                                <v-icon class="_contact-email-ico">mdi-email</v-icon>
                                <p>tgr.cs@jne.co.id</p>
                            </div>
                        </div>
                    </div>
                    <div class="_comm">
                        <h3 class="font-weight-light">Community</h3>
                    </div>
                    <div class="_services">
                        <h3 class="font-weight-light">Services</h3>
                        <div class="_services-content py-5">
                            <p>Corporation</p>
                            <p>Retail</p>
                            <p>Become a partner</p>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="6" class="px-10">
                <div class="_address-content-header d-flex justify-space-between ">
                    <h3 class="font-weight-light">JALA</h3>
                    <h3 class="font-weight-light">Head Office</h3>
                </div>
                <v-divider></v-divider>
                <div class="_address-content-body">
                    <div class="_content-body-head my-5">
                        <h3 class="font-weight-light">PT Jalaniaga Elok</h3>
                    </div>
                    <div class="_content-body">
                        <p>Ruko golde boulevard</p>
                        <p>Blok F1 No. 21 Jl. Pahlawan seribu buaran BSD City. Lengkong Karya, Kec. Serpong Utara</p>
                        <p>Kota Tangerang Selatan</p>
                        <p>Banten</p>
                        <p>15322</p>
                    </div>
                </div>
            </v-col>
        </v-row>
        <div class="px-4 py-5 text-left w-100 bg-customFooterDark">
            <div class="d-flex justify-space-between">
                <div>
                    {{ new Date().getFullYear() }} — <strong>Jalanet</strong>
                </div>
                <div class="d-flex flex-row">
                    <p class="text-muted mr-2">Copyright &copy; 2025 <a :href="$appInfo.baseURL">{{$appInfo.appName}}</a></p>
                    <b>Version</b> {{$appInfo.appVersion}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'Footer',
}

</script>