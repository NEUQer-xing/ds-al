<style>
.rate-demo {
    display: flex;
    justify-content: space-between;
    align-items: center;   
}
</style>
<template>
    <Card style="width: 100%;">
        <template #title>
            <strong><Icon type="md-cube" />操作面板</strong>
        </template>
        <Collapse>
            <Panel name="0">
                初始化示例
                <template #content>
                    <Button type="warning" @click="node_init" long >初始化</Button> 
                </template>
            </Panel>
            <Panel name="1">
                自定义示例
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="输入字符串序列"/>
                        <space>
                            <Button type="primary" @click="node_insert">确定</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const value = ref(null);
    const emit = defineEmits([
        'node_init_emit','node_delete_emit',
    ]);
    function node_init(){
        emit('node_init_emit');
    }
    function node_insert(){
        emit('node_insert_emit',value);
    }
</script>
