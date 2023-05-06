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
                生成随机图
                <template #content>
                    <space>
                        <Input v-model="node_count" placeholder="要生成的节点数"/>
                        <Button type="primary" @click="creat_graph" long >生成</Button>   
                    </space>
                </template>
            </Panel>
            <Panel name="-1">
                图的类型
                <template #content>
                    <space>
                        <RadioGroup v-model="graph_style" @on-change="change_graph_style">
                            <Radio label="无向图" border></Radio>
                            <Radio label="有向图" border></Radio>
                        </RadioGroup>
                    </space>
                </template>
            </Panel>
            <Panel name="1">
                增加/删除 边
                <template #content>
                        <space direction="vertical" >
                            <space direction="vertical">
                                <RadioGroup v-model="insert_or_delete" type="button" button-style="solid" @on-change="change_insert_delete">
                                    <Radio label="insert_edge">增加边</Radio>
                                    <Radio label="" disabled></Radio>
                                    <Radio label="delete_edge">删除边</Radio>
                                </RadioGroup>
                            <space>
                                <Input v-model="start_node" placeholder="边的起点"/>
                                <Input v-model="end_node" placeholder="边的终点"/>
                                <Input v-model="weight" :disabled=is_disabled placeholder="边的权重"/>
                            </space> 
                            <space >
                                <Button type="warning" @click="insert_delete_func" long>确定</Button> 
                            </space>
                        </space>
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                最短路径算法
                <template #content>
                    <space>
                        <Input v-model="start_traverse_node" placeholder="遍历的起始节点"/>
                        <Button type="primary" @click="start_traverse" long >开始遍历</Button>   
                    </space> 
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>

    import { ref } from 'vue';
    
    const node_count = ref();
    const start_node = ref();
    const end_node = ref();
    const start_traverse_node = ref();
    const weight = ref();
    const insert_or_delete = ref('insert_edge');
    const is_disabled = ref(false);
    const emit = defineEmits([]);
    const graph_style = ref('有向图');

    function change_insert_delete(value){
        insert_or_delete.value = value;
        is_disabled.value = value == 'delete_edge';
        //alert(insert_or_delete.value)
    }
    function insert_delete_func(){
        if(insert_or_delete.value == 'insert_edge'){
            insert_edge();
        }else{
            delete_edge();
        }
    }
    function change_graph_style(graph_style){
        emit('change_graph_style_emit',graph_style)
    }
    function creat_graph(){
        emit('creat_graph_emit',node_count.value)
    }
    function insert_edge(){
        emit('insert_edge_emit',start_node.value,end_node.value,weight.value)
    }
    function delete_edge(){
       emit('delete_edge_emit',start_node.value,end_node.value)
    }
    function start_traverse(){
        emit('start_traverse_emit',start_traverse_node.value)
    }
</script>
