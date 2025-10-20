<template>
    <v-container>
        <v-row v-show="outro">
            <v-col cols="12">
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingOutro">
                    <span class="text-none text-md-h3 _salina_text mb-5">Thank You</span>
                    <span class="text-none text-md-h6 _avenir_text">Merupakan suatu kehormatan dan kebahagiaan kami</span>
                    <span class="text-none text-md-h6 _avenir_text">Keluarga besar yang mengundang mempelai Wanita : </span>
                    <ul>
                        <li>Keluarga Besar Bakri & Lasupu</li>
                        <li>Keluarga Besar Yunus & Abdullah</li>
                        <li>Keluarga Besar Latopada</li>
                    </ul>

                    <span class="text-none text-md-h6 _avenir_text ">Keluarga besar yang mengundang mempelai Pria : </span>
                    <ul>
                        <li>Keluarga Besar Hamdan Nasution</li>
                        <li>Keluarga Besar Elfi Sahra Lubis</li>
                    </ul>

                    <span class="text-none text-md-h6 _avenir_text">apabila Bapak/Ibu/Saudara/i berkenan hadir</span>
                    <span class="text-none text-md-h6 _avenir_text">untuk memberikan doa restu kepada putra-putri kami</span>

                    <span class="_salina_text text-none text-md-h6 mt-5">Wassalamu'alaikum Warahmmatullahi Wabarakaatuh</span>
                </div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" class="d-flex align-center justify-center">
                <v-btn variant="elevated" class="my-10" color="background" @click="closedInv">Closed Invitation</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>