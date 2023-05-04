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
                生成随机树
                <template #content>
                    <space >
                        <Button type="warning" @click="start_init" long >随机生成</Button>
                        <Button type="success" @click="start_action" long >中序线索化</Button> 
                    </space>
                </template>
            </Panel>
            <Panel name="1">
                构造二叉树
                <template #content>
                    <space direction="vertical" >
                        <space>
                            <Tag color="warning">
                                <strong>
                                    插入父节点的: 
                                </strong>
                            </Tag>
                            <Tag  color="success">
                                <strong>
                                    {{ tag_value }} 侧
                                </strong>
                            </Tag>
                        </space>
                        <space>
                            <Input v-model="parent_value" placeholder="父节点值"/>
                            <Select v-model="left_right" placeholder="位置" @on-change="change_tag">
                                <Option v-for="item in left_right_items" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                            <Input v-model="child_value" placeholder="子节点值"/>
                        </space>
                       
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
                            <Button type="warning" @click="start_action">中序线索化 </Button>
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
    const tag_value = ref();
    const left_right = ref();
    const emit = defineEmits([
        'node_insert_emit',
        'start_init_emit',
        'start_action_emit'
    ]);
    const parent_value = ref();
    const child_value = ref();
    const left_right_items = ref([
        {
            value: 'left',
            label: '左侧'
        },
        {
            value: 'right',
            label: '右侧'
        }
    ]);
    function change_tag(value){
        if(value == 'left'){
            tag_value.value = '左';
        }else{
            tag_value.value = '右';
        }
    }

    function start_init(){
        emit('start_init_emit');
    }
    function node_insert(){
        emit('node_insert_emit',{
            parent_value: parent_value.value,
            child_value: child_value.value,
            left_right: left_right.value
        });
    }
    function start_action(){
        emit('start_action_emit');
    }
</script>
