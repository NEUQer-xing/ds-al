<template>
  <Card>
        <template #title>
            <strong><Icon type="ios-construct" />控制面板</strong>
        </template>
        <Collapse>
            <Panel name="1">
                调整速度
                <template #content>
                    动画播放速度为：<strong>{{ play_speed }}</strong>
                    <Slider v-model="play_speed" :step="10" :min="10" :max="90"></Slider>
                </template>
            </Panel>
            <Panel name="2">
                播放/暂停
                <template #content>
                    <Space>
                        <Button type="success"><Icon type="ios-play" />播放</Button>
                        <Button type="warning"><Icon type="ios-pause" />暂停</Button> 
                    </Space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    var play_speed = ref(10)
</script>

<style>

</style>