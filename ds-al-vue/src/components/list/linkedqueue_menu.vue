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
    const insert_index = ref();
    const insert_value = ref();
    const delete_index = ref();
    const emit = defineEmits(['list_insert','list_delete']);
    function listInsert(){
        emit('list_insert',insert_index,insert_value);
    }
    function listDelete(){
        emit('list_delete',delete_index);
    }

</script>
