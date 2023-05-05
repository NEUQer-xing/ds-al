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
            <Panel name="3">
                创建随机数组
                <template #content>
                    <space>
                        <Input v-model="random_array_length" placeholder="请输入随机数组长度" style="width: 100%" />
                        <Button type="primary" @click="creat_random_array" long >确定</Button> 
                    </space>
                </template>
            </Panel>
            <Panel name="1">
                自定义数组
                <template #content>
                    <space>
                        <Input v-model="custom_array" placeholder="请输入自定义数组,以,分隔" style="width: 100%" />
                        <Button type="primary" @click="creat_custom_array" long >确定</Button> 
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                排序
                <template #content>
                        <Button type="primary" @click="start_sort" long >开始排序</Button>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const random_array_length = ref();
    const custom_array = ref([]);
    const array_by_user= ref([]);
    var length = 0;
    const emit = defineEmits(['show_style_emit','creat_random_array_emit','creat_custom_array_emit','start_sort_emit']);
    function creat_random_array(){
        emit('creat_random_array_emit',random_array_length.value);
        length = random_array_length.value;
    }
    function creat_custom_array(){
        array_by_user.value = custom_array.value.split(',');
        emit('creat_custom_array_emit',array_by_user.value);
        length = array_by_user.value.length;
    }
    function start_sort(){
        emit('start_sort_emit',length,length);
    }
</script>
