<template>
    <!-- 二叉搜索树 -->
    <Row>
        <Col span="17">
        <div class="showBox" style="overflow: scroll">
            <canvas ref="canvasRef" width="2000" height="1000" id="drawing">
                Canvas
            </canvas>
        </div>
        </Col>
        <Col span="7">
        <introduce>平衡二叉搜索树( AVL )</introduce>
        <control @control_speed="speed_func" @control_scale="scale_func" @control_scale_reset="scale_reset"></control>
        <avl_tree_menu @node_init_emit="node_init" @node_insert_emit="node_insert" @node_delete_emit="node_delete"
            @node_search_emit="node_search">
        </avl_tree_menu>
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

// 组件引入
import control from "@/components/control.vue";
import note from "@/components/note.vue";
import chatgpt from "@/components/chatgpt.vue";
import chatgpt_main from "@/components/chatgpt/chatgpt_main.vue";
import note_main from "@/components/markdown_note/note_main.vue";
import avl_tree_menu from "@/components/tree/avl_tree_menu.vue";
import introduce from "@/components/introduce.vue";

// js引入函数
import { ref, onMounted } from "vue";
import {
    speed_func_control,
    scale_func_control,
    scale_reset_control
} from "@/assets/js/play_control.js";
import {
    init,
    init_js,
    insert_js,
    delete_js,
    search_js,
} from "@/assets/js/tree/AVLTree.js";

// 代码开始
const canvasRef = ref(null);
var drawing_size = {
    width: 0,
    height: 0,
};

const ctx = ref(null);
// 初始化页面
onMounted(() => {
    // canvasRef只是个引用,需要通过.value来获取值,才可以当作html中的canvas来进行使用
    // 获取画布的大小
    drawing_size.width = canvasRef.value.width;
    drawing_size.height = canvasRef.value.height;
    // console.log(`成功渲染出组件!`)
    // console.log(drawing_size)
    init(drawing_size);
    ctx.value = canvasRef.value.getContext("2d");
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
function node_init() {
    init_js();
}
function node_insert(insert_value) {
    insert_js(insert_value.value);
}
function node_delete(delete_value) {
    delete_js(delete_value.value);
}
function node_search(search_value) {
    search_js(search_value.value);
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
  