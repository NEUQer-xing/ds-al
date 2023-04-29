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
            <strong><Icon type="ios-construct" />操作面板</strong>
        </template>
        <Collapse>
            <Panel name="1">
                初始化
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="设置初始数据"/>
                        <space>
                            <Button type="primary" @click="init">随机数据</Button> 
                            <Button type="primary" @click="init">创建</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="2">
                插入
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="输入插入的位置"/>
                        <space>
                            <Button type="primary" @click="init">插入</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
            <Panel name="3">
                删除
                <template #content>
                    <space direction="vertical">
                        <Input v-model="value" placeholder="输入删除数据所在位置"/>
                        <space>
                            <Button type="primary" @click="init">删除</Button> 
                        </space> 
                    </space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script>
    
</script>
