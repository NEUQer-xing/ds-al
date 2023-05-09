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
      <introduce>图的深度优先遍历</introduce>
      <control @control_speed="speed_func" @control_scale="scale_func" @control_scale_reset="scale_reset"></control>
      <dfs_traverse_menu 
            @change_graph_style_emit="change_graph_style"
            @creat_graph_emit="creat_graph"
            @insert_edge_emit="insert_edge"
            @delete_edge_emit="delete_edge"
            @start_traverse_emit="start_traverse">
        </dfs_traverse_menu>
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
  import dfs_traverse_menu from "@/components/graph/dfs_traverse_menu.vue";
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
    creat_graph_js,
    insert_edge_js,
    delete_edge_js,
    start_traverse_js,
    change_graph_style_js,
  } from "@/assets/js/graph/DFS.js";
  
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
  function change_graph_style(graph_style) {
      change_graph_style_js(graph_style);
  }
  function creat_graph(node_count) {
      creat_graph_js(node_count);
  }
  function insert_edge(start_node,end_node) {
      insert_edge_js(start_node,end_node);
  }
  function delete_edge(start_node,end_node) {
      delete_edge_js(start_node,end_node);
  }
  function start_traverse(start_node) {
      start_traverse_js(start_node);
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
    