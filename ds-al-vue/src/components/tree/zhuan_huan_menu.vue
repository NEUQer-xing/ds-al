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
                            <Tag color="warning">
                                <strong>
                                    当前操作:
                                </strong>
                            </Tag>
                            <Tag  color="success">
                                <strong>
                                    {{ tag_show }}
                                </strong>
                            </Tag>
                        </space>
                        
                        <RadioGroup v-model="tree_or_btree_selete" @on-change="change_tag_show"
                        type="button" button-style="solid" size="small">
                            <Radio label="树转二叉树" ></Radio>
                            <Radio label="<>" disabled></Radio>
                            <Radio label="二叉树转树" ></Radio>
                        </RadioGroup>
                        <space>
                            <Input v-model="parent_value" placeholder="父节点值"/>
                            <Select v-model="left_right" placeholder="位置" :disabled=is_select_disable>
                                <Option v-for="item in left_right_items" :value="item.value" :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                            <Input v-model="child_value" placeholder="子节点值"/>
                        </space>
                       
                        <space>
                            <Button type="primary" @click="node_insert">插入</Button> 
                            <Button type="warning" @click="start_change">开始: {{ tree_or_btree }}</Button>
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
        'node_insert_emit',
        'tree_to_btree_emit',
        'btree_to_tree_emit',
        'select_emit',
        'start_change_emit'
    ]);
    const parent_value = ref();
    const child_value = ref();
    const tree_or_btree = ref('树转二叉树');
    const tree_or_btree_selete = ref();
    const left_right = ref();
    const tag_show = ref('插入节点-构造树');
    const is_select_disable = ref(true); // 是否禁用选择框
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
    function change_tag_show(){
        if(tree_or_btree_selete.value == '树转二叉树'){
            tag_show.value = '插入节点-构造树';
            emit('select_emit','Tree');
            is_select_disable.value = true;
        }else if(tree_or_btree_selete.value == '二叉树转树'){
            tag_show.value = '插入节点-构造二叉树';
            emit('select_emit','bTree');
            is_select_disable.value = false;
        }
    }

    function start_init(){
        if(tree_or_btree.value == '树转二叉树'){
            emit('tree_to_btree_emit');
        }else if(tree_or_btree.value == '二叉树转树'){
            emit('btree_to_tree_emit');
        }
    }
    function node_insert(){
        if(tree_or_btree.value=='树转二叉树'){
            emit('node_insert_emit',{
                style : 'Tree',
                parent_value: parent_value.value,
                child_value: child_value.value,
                left_right: 'left' // 树只有左侧,无左右子树之分
            });
        }else if(tree_or_btree.value=='二叉树转树'){
            emit('node_insert_emit',{
                style : 'bTree',
                parent_value: parent_value.value,
                child_value: child_value.value,
                left_right: left_right.value
            });
        }
    }
    function start_change(){
        if(tree_or_btree.value == '树转二叉树'){
            emit('start_change_emit','Tree');
        }else if(tree_or_btree.value == '二叉树转树'){
            emit('start_change_emit','bTree');
        }
    }
</script>
