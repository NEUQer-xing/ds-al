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
                查找类型 {{ show_tag }}
                <template #content>
                    <space direction="vertical">
                        <Select v-model="search_style" style="width:100%" @on-change="show_style" label-in-value>
                            <Option v-for="item in search_items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <space>
                            <Input v-model="search_value" placeholder="查找数字" style="width: 100%" />
                            <Button type="primary" @click="start_search" long >开始查找</Button>
                        </space>
                    </space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const search_style = ref();
    const show_tag = ref();
    const search_items = ref(
        [
            {
                value : 'LinearSearch',
                label : '顺序查找'
            },
            {
                value : 'BinarySearch',
                label : '二分查找'
            }
        ]
    );
    const random_array_length = ref();
    const custom_array = ref([]);
    const array_by_user= ref([]);
    const search_value = ref();
    var length = 0;
    const emit = defineEmits(['show_style_emit','creat_random_array_emit','creat_custom_array_emit','start_search_emit']);

    function show_style(search_style){
        show_tag.value = search_style.label;
        emit('show_style_emit',search_style.label);
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
    function start_search(){
        emit('start_search_emit',show_tag.value,length,length,search_value.value);
    }
</script>
