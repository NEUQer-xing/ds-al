<template>       
    <v-md-editor v-model="text" height="600px" ></v-md-editor> 
         <!-- left-toolbar="undo" 控制markdown上方工具栏的数量 -->
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    var text=ref("this is my note!");
</script>