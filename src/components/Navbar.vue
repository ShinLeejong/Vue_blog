<template>
    <div>
        <v-app-bar app>
            <v-app-bar-title class="text-capitalize">
                <span class="font-weight-light">Welcome to</span>
                <span>Lee's Blog!</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <span>
                    Sign Out
                </span>
                <v-icon right>
                    mdi-exit-to-app
                </v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    span {
        margin: 0 .25rem;
    }
</style>