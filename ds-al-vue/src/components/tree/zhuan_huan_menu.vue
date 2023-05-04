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
                自动随机演示
                <template #content>
                    <space direction="vertical">
                        <space>
                            <RadioGroup v-model="tree_or_btree" type="button" button-style="solid" size="small">
                                <Radio label="树转二叉树" ></Radio>
                                <Radio label="<>" disabled></Radio>
                                <Radio label="二叉树转树" ></Radio>
                            </RadioGroup>
                        </space>
                        <Button type="warning" @click="start_init" long >开始转换</Button> 
                    </space>
                   
                </template>
            </Panel>
            <Panel name="1">
                构造树
                <template #content>
                    <space direction="vertical" >
                        <space>
                            <Input v-model="parent_value" placeholder="父节点值"/>
                            <Select v-model="left_right" placeholder="位置">
                                <Option v-for="item in left_right_items" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                            <Input v-model="child_value" placeholder="子节点值"/> 
                        </space>
                       
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
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
        'node_insert_emit','tree_to_btree_emit','btree_to_tree_emit'
    ]);
    const parent_value = ref();
    const child_value = ref();
    const tree_or_btree = ref('树转二叉树');
    const left_right = ref();
    const left_right_items = ref([
        {
            value: 'left',
            label: '左侧'
        },
        {
            value: 'right',
            label: '右侧'
        }
    ])

    function start_init(){
        alert(tree_or_btree.value);
        if(tree_or_btree.value == '树转二叉树'){
            emit('tree_to_btree_emit');
        }else if(tree_or_btree.value == '二叉树转树'){
            emit('btree_to_tree_emit');
        }
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
