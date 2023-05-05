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
                创建模式串
                <template #content>
                    <space>
                        <Input v-model="moshi_string" placeholder="请输入模式串" style="width: 100%" />
                        <Button type="primary" @click="creat_moshi_string" long >确定</Button> 
                    </space>
                </template>
            </Panel>
            <Panel name="3">
                创建目标串-查找
                <template #content>
                    <space direction="vertical">
                        <Input v-model="mubiao_string" placeholder="请输入目标串" style="width: 100%" />
                        <space>
                            <Button type="warning" @click="creat_mubiao_string" long >确定</Button> 
                            <Button type="success" @click="start_search" long >开始查找</Button> 
                        </space>
                    </space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script setup>
    import { ref } from 'vue';
    const mubiao_string = ref('');
    const moshi_string = ref('');
    var length = 0;
    const emit = defineEmits(['creat_mubiao_string_emit','creat_custom_array_emit','start_search_emit']);
    function creat_mubiao_string(){
        //alert(mubiao_string.value)
        emit('creat_mubiao_string_emit',mubiao_string.value);
        length = mubiao_string.value.length;
    }
    function creat_moshi_string(){
        //alert(moshi_string.value)
        emit('creat_moshi_string_emit',moshi_string.value);
        length = moshi_string.value.length;
    }
    function start_search(){
        //alert(moshi_string.value.length+' '+mubiao_string.value.length);
        emit('start_search_emit',length,length);
    }
</script>
