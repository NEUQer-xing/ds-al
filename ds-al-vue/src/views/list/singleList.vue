<template>
        <Row>
        <Col span="17">
          <div class="showBox" style="overflow: scroll;">
		        <canvas ref="canvasRef" width="2000" height="1000" id="drawing">Canvas</canvas>
		      </div>
        </Col>
        <Col span="7">
          <control @control_speed="speed_func" @control_play="play_func"></control>
          <listmenu @list_init="init_list" @list_insert="insert" @list_delete="Delete"></listmenu>
          <note></note>
          <chatgpt></chatgpt>
        </Col>
    </Row>
</template>

<script setup>
  import control from '@/components/control.vue';
  import listmenu from '@/components/listmenu.vue';
  import note from '@/components/note.vue';
  import chatgpt from '@/components/chatgpt.vue';
  import {ref,onMounted} from 'vue';

  import {speed_func_control,play_func_control} from '@/assets/js/test/play_control.js';
  import {init,list_init_index,list_insert_index,list_delete_index} from '@/assets/js/list/OrderList.js';
  const canvasRef = ref(null);
  var drawing_size = {
    width:0,
    height:0
  };
  onMounted(() => {
    // canvasRef只是个引用,需要通过.value来获取值,才可以当作html中的canvas来进行使用
    // 获取画布的大小
    drawing_size.width = canvasRef.value.width; 
    drawing_size.height = canvasRef.value.height;
    console.log(`成功渲染出组件!`)
    console.log(drawing_size)
    init(drawing_size);
  })
  // // start 播放控制
  // 播放速度
  function speed_func(play_speed){
    const speed = speed_func_control(play_speed);
    console.log(drawing) 
    alert(drawing)
    //alert('哈哈哈哈哈当前播放的速度为:'+speed.value)
  }
  function play_func(play_or_hold){
    const play = play_func_control(play_or_hold);
  }

  // 具体操作
  function init_list(init_value){
    // 因为是const引用,所以只能通过相互赋值进行传递参数
    list_init_index(init_value.value);
  }
  function insert(insert_index,insert_value){
    list_insert_index(insert_index.value,insert_value.value);
  }
  function Delete(delete_value){
    list_delete_index(delete_value.value)
  }
</script>
    
<style>
    @import url("@/assets/css/index.css");
</style>