<template>       
    <v-md-editor v-model="text" height="600px" @save="save_note"></v-md-editor> 
         <!-- left-toolbar="undo" 控制markdown上方工具栏的数量 -->
</template>
<script setup>
    import { ref } from 'vue';
    const text=ref("this is my note!");
    function save_note(tx,ht){
        text.value = tx;
    }
</script>