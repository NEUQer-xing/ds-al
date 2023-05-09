<template>
  <Card>
        <template #title>
            <strong><Icon type="md-ionitron" />AI助手</strong>
        </template>
        <Button type="warning" @click="call_gpt" icon="ios-call-outline" long ghost>
            <strong>呼出AI助手</strong>
        </Button>
    </Card>
</template>

<script setup>
    const emit = defineEmits(['call_gpt_emit']);
    function call_gpt(){
        emit('call_gpt_emit');
    }
</script>

<style>

</style>