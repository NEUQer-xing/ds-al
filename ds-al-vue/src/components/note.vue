<template>
    <Card>
        <template #title>
            <strong><Icon type="md-bookmarks" />笔记</strong>
        </template>
        <Button type="success" @click="call_note" icon="ios-book-outline" long ghost>
            <strong>记录笔记</strong>
        </Button>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const emit = defineEmits(['call_note_emit']);
    function call_note(){
        emit('call_note_emit');
    }
</script>