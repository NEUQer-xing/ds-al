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
                排序类型 {{ show_tag }}
                <template #content>
                    <space>
                        <Select v-model="sort_style" style="width:150px" @on-change="show_style" label-in-value>
                            <Option v-for="item in sort_items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button type="primary" @click="start_sort" long >开始排序</Button>
                    </space>
                    
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const sort_style = ref();
    const show_tag = ref();
    const sort_items = ref(
        [
            {
                value : 'insert_sort',
                label : '插入排序'
            },
            {
                value : 'select_sort',
                label : '选择排序'
            },
            {
                value : 'bubble_sort',
                label : '冒泡排序'
            },
            {
                value : 'shell_sort',
                label : '希尔排序'
            },
            {
                value : 'quick_sort',
                label : '快速排序'
            },
            {
                value : 'merge_sort',
                label : '归并排序'
            }
        ]
    );
    const random_array_length = ref();
    const custom_array = ref([]);
    const array_by_user= ref([]);
    var length = 0;
    const emit = defineEmits(['show_style_emit','creat_random_array_emit','creat_custom_array_emit','start_sort_emit']);

    function show_style(sort_style){
        show_tag.value = '  ==>  ' + sort_style.label;
        emit('show_style_emit',sort_style.label);
    }
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
        emit('start_sort_emit',sort_style.value,length,length);
    }
</script>
