<template>
    <v-container fluid ref="weddingDua">
        <v-row justify="center" class="h-100">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form class="w-100">
                    <span class="text-h4 text-md-h4 _salina_text mb-5">Doa dan Kata Hangat untuk kami</span>
                    <v-card variant="tonal" class="pa-5">
                        <v-card-item>
                            <v-card-title class="text-h6 text-md-h4 text-center text-background _salina_text mb-5">RSVP</v-card-title>
                            <v-text-field label="Name" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2"></v-text-field>
                            <v-autocomplete label="Confirmation of Attendance" class="text-background" variant="outlined"></v-autocomplete>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn variant="flat" block class="text-none">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
        <v-img v-if="showBurung" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
        <v-img v-if="showBurung" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img>
    </v-container>
</template>

<style scoped>

._burung_left { 
    width: 14%;
    position: absolute;
    top: 8%;
    left: 18%;
    z-index: 2;
}

._burung_right { 
    width: 14%;
    position: absolute;
    top: 8%;
    right: 17%;
    z-index: 2;
}

</style>
<script>

import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
export default {
    name: 'WeddingGift',
    data() { 
        return { 
            burungKiri,
            burungKanan,
            showBurung: true,
        }
    }
}
</script>