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
            <Panel name="1">
                初始化
                <template #content>
                    <space direction="vertical">
                        <Input v-model="init_value" placeholder="设置初始队列的大小"/>
                        <space>
                            <Button type="primary" @click="listInit">创建</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                入队
                <template #content>
                    <space direction="vertical">
                        <space>
                            <Input v-model="insert_value" placeholder="输入入队的值"/>
                        </space>
                        <space>
                            <Button type="primary" @click="listInsert">确定</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="3">
                出队
                <template #content>
                        <Button type="primary" @click="listDelete" long >确定</Button> 
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const init_value = ref();
    const insert_value = ref();
    const delete_index = ref();
    const emit = defineEmits(['list_init','list_insert','list_delete']);
    function listInit(){
        emit('list_init',init_value);
    }
    function listInsert(){
        emit('list_insert',insert_value);
    }
    function listDelete(){
        emit('list_delete',delete_index);
    }

</script>
