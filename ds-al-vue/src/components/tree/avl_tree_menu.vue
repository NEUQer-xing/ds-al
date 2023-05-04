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
                    <Button type="warning" @click="node_init" long >随机生成</Button> 
                </template>
            </Panel>
            <Panel name="1">
                插入-查找-删除
                <template #content>
                    <space direction="vertical" >
                        <Input v-model="value" placeholder="要操作节点的值(多值,分隔)"/>
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
                            <Button type="primary" @click="node_search">查找</Button>
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
    const value = ref();
    const emit = defineEmits([
        'node_insert_emit','node_delete_emit','node_init_emit'
    ]);
    function node_init(){
        emit('node_init_emit');
    }
    function node_insert(){
        let arr = value.value.split(',');
        for(var i=0;i<arr.length;i++){
            value.value = arr[i];
            emit('node_insert_emit',value);
        }
        value.value = null;
    }
    function node_search(){
        emit('node_search_emit',value);
    }
    function node_delete(){
        emit('node_delete_emit',value);
    }
</script>
