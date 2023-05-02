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
                    <Button type="primary" @click="speed_func"><Icon type="ios-settings" />调整</Button>
                </template>
            </Panel>
            <Panel name="2">
                播放/暂停
                <template #content>
                    <Space>
                        <Button type="success" @click="play_func"><Icon type="ios-play" />播放</Button>
                        <Button type="warning" @click="hold_func"><Icon type="ios-pause" />暂停</Button> 
                    </Space>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>

<script  setup>
    import { ref } from 'vue';
    const play_speed = ref(50);
    const play_or_hold = ref(true);
    const emit = defineEmits(['control_play','control_speed']);
    function play_func(){
        play_or_hold.value = true;
        is_play();
    }
    function hold_func(){
        play_or_hold.value = false;
        is_play();
    }
    function is_play(){
        emit('control_play',play_or_hold);
    }
    function speed_func(){
        emit('control_speed',play_speed);
    }
</script>

<style>

</style>