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
                    <Slider v-model="play_speed" :step="1" :min="1" :max="100"></Slider>
                    <Button type="primary" @click="speed_func"><Icon type="ios-settings" />调整</Button>
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>

<script  setup>
    import { ref } from 'vue';
    const play_speed = ref(60);
    const emit = defineEmits(['control_speed']);
    function speed_func(){
        emit('control_speed',play_speed);
    }
</script>

<style>

</style>