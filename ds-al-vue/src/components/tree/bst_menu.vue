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
                插入-查找-删除
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="输入要操作节点的值"/>
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
                            <Button type="primary" @click="node_search">查找</Button>
                            <Button type="primary" @click="node_delete">删除</Button>
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                深度遍历节点
                <template #content>
                    <space direction="vertical">
                        <space>
                            <Button type="primary" @click="dfs_qian">前序</Button>
                            <Button type="primary" @click="dfs_zhong">中序</Button>
                            <Button type="primary" @click="dfs_hou">后序</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="3">
                广度遍历节点
                <template #content>
                    <Button type="primary" @click="bfs" long>广度遍历</Button> 
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>

    import { ref } from 'vue';
    const value = ref();
    const emit = defineEmits([
        'node_insert_emit','node_search_emit','node_delete_emit',
        'dfs_qian_emit','dfs_zhong_emit','dfs_hou_emit','bfs_emit'
    ]);
    function node_init(){
        let arr_init = [4,2,3,1,6,5,7];
        for(var i=0;i<arr_init.length;i++){
            value.value = arr_init[i];
            emit('node_insert_emit',value);
        }
    }
    function node_insert(){
        let arr = value.value.split(',');
        for(var i=0;i<arr.length;i++){
            value.value = arr[i];
            emit('node_insert_emit',value);
        }
    }
    function node_search(){
        emit('node_search_emit',value);
    }
    function node_delete(){
        emit('node_delete_emit',value);
    }
    function dfs_qian(){
        emit('dfs_qian_emit',1);
    }
    function dfs_zhong(){
        emit('dfs_zhong_emit',2);
    }
    function dfs_hou(){
        emit('dfs_hou_emit',3);
    }
    function bfs(){
        emit('bfs_emit');
    }
</script>
