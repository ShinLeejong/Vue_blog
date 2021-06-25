<template>
    <div>
        <v-dialog max-width="20rem">
            <template v-slot:activator="{on}">
                <v-btn text v-on="on" class="error">
                    Add new stuff
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">
                    <h2>Add a new stuff!</h2>
                </v-card-title>                
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>