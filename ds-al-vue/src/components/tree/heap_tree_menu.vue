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
                插入-删除
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="输入要操作节点的值"/>
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
                            <Button type="primary" @click="node_delete">删除</Button>
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
        'node_insert_emit','node_delete_emit',
    ]);
    function node_init(){
        let arr_init = [4,2,3,1,6,5,7];
        for(var i=0;i<arr_init.length;i++){
            value.value = arr_init[i];
            emit('node_insert_emit',value);
        }
        value.value = null;
    }
    function node_insert(){
        let arr = value.value.split(',');
        for(var i=0;i<arr.length;i++){
            value.value = arr[i];
            emit('node_insert_emit',value);
        }
        value.value = null;
    }
    function node_delete(){
        emit('node_delete_emit',value);
    }
</script>
