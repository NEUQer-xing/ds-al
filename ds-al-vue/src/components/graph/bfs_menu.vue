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
                        <space>
                            <Input v-model="start_node" placeholder="边的起点"/>
                            <Input v-model="end_node" placeholder="边的终点"/>
                        </space> 
                        <space>
                            <Button type="warning" @click="insert_edge">插入</Button> 
                            <Button type="success" @click="delete_edge">删除</Button>
                        </space>
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                广度遍历
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
    const emit = defineEmits([
        
    ]);
    const graph_style = ref('无向图');


    function change_graph_style(graph_style){
        emit('change_graph_style_emit',graph_style)
    }
    function creat_graph(){
        emit('creat_graph_emit',node_count.value)
    }
    function insert_edge(){
        emit('insert_edge_emit',start_node.value,end_node.value)
    }
    function delete_edge(){
       emit('delete_edge_emit',start_node.value,end_node.value)
    }
    function start_traverse(){
        emit('start_traverse_emit',start_traverse_node.value)
    }
</script>
