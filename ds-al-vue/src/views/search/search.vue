<template>
    <Row>
        <Col span="17">
        <div class="showBox" style="overflow: scroll">
            <canvas ref="canvasRef" width="2000" height="1000" id="drawing">
                Canvas
            </canvas>
        </div>
        </Col>
        <Col span="7">
        <introduce>查 找 算 法 ==> {{ search_style_tag }}</introduce>
        <control @control_speed="speed_func" @control_scale="scale_func" @control_scale_reset="scale_reset"></control>
        <search_menu 
            @show_style_emit="show_style"
            @creat_random_array_emit="creat_random_array"
            @creat_custom_array_emit="creat_custom_array" 
            @start_search_emit="start_search" >
        </search_menu>
        <chatgpt @call_gpt_emit="show_gpt"></chatgpt>
        <note @call_note_emit="show_note"></note>
        </Col>
    </Row>
    <Drawer title="AI助理" placement="right" :closable="false" v-model="gpt" width="30">
        <chatgpt_main></chatgpt_main>
    </Drawer>
    <Drawer title="学习笔记" placement="bottom" :closable="false" v-model="notes" height="70">
        <note_main></note_main>
    </Drawer>
</template>
  
<script setup>
import control from "@/components/control.vue";
import search_menu from "@/components/search/search_menu.vue";
import note from "@/components/note.vue";
import chatgpt from "@/components/chatgpt.vue";
import chatgpt_main from "@/components/chatgpt/chatgpt_main.vue";
import note_main from "@/components/markdown_note/note_main.vue";
import introduce from "@/components/introduce.vue";
import { ref, onMounted } from "vue";
import {
    speed_func_control,
    scale_func_control,
    scale_reset_control
} from "@/assets/js/play_control.js";
import {
    init,
    creat_random_array_js,
     creat_custom_array_js,
     start_search_js,
} from "@/assets/js/search/Search.js";

const canvasRef = ref(null);
var drawing_size = {
    width: 0,
    height: 0,
};
const ctx = ref(null);
// 初始化页面
onMounted(() => {
    drawing_size.width = canvasRef.value.width; drawing_size.height = canvasRef.value.height; init(drawing_size); ctx.value = canvasRef.value.getContext("2d");
});

// 播放速度
function speed_func(play_speed) {
    speed_func_control(play_speed);
}
// 画布缩放
function scale_func(canvas_scale) {
    scale_func_control(canvas_scale, ctx.value, drawing_size);
}
// 恢复
function scale_reset(canvas_scale) {
    scale_reset_control(canvas_scale, ctx.value, drawing_size);
}

// 具体操作
const search_style_tag = ref();
function show_style(style) {
    search_style_tag.value = style;
}
function creat_random_array(length) {
    creat_random_array_js(length);
}
function creat_custom_array(array) {
    creat_custom_array_js(array);
}
function start_search(search_style,a,b,search_value) {
    start_search_js(search_style,a,b,search_value);
}

// 显示gpt
const gpt = ref(false);
function show_gpt() {
    gpt.value = true;
}

// 显示notes
const notes = ref(false);
function show_note() {
    notes.value = true;
}

</script>
  
<style>
@import url("@/assets/css/index.css");
</style>
  