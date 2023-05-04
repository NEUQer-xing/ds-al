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
            <Panel name="2">
                调整画布大小
                <template #content>
                    画布缩放比例为：<strong>{{ canvas_scale }}</strong>
                    <Slider 
                        v-model="canvas_scale" 
                        :step="0.1" 
                        :min="0.1" 
                        :max="2" 
                        show-input
                        :disabled=if_disable_scale
                        @on-change="scale_func">
                    </Slider>
                    <Button type="primary" @click="scale_reset"><Icon type="ios-settings" />重置</Button>
                </template>
            </Panel>
            <slot></slot>
        </Collapse>
    </Card>
</template>

<script  setup>
    import { ref } from 'vue';
    const play_speed = ref(60);
    const canvas_scale = ref(1);
    const if_disable_scale = ref(false);
    const emit = defineEmits(['control_speed','control_scale','control_scale_reset']);
    function speed_func(){
        emit('control_speed',play_speed);
    }
    function scale_func(){
        emit('control_scale',canvas_scale);
        if_disable_scale.value=true;
    }
    function scale_reset()
    {
        emit('control_scale_reset',canvas_scale);
        canvas_scale.value=1;
        if_disable_scale.value=false;
    }
</script>

<style>

</style>