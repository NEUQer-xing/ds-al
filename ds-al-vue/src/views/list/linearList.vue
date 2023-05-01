<template>

    <Row>
        <Col span="17">
          <div class="showBox" style="overflow: scroll;">
		        <canvas id="drawing" width="2000" height="1000">Canvas</canvas>
		      </div>
        </Col>
        <Col span="7">
          <control @control_speed="speed_func" @control_play="play_func"></control>
          <listmenu @list_init="init" @list_insert="insert" @list_delete="Delete"></listmenu>
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
  import { ref, watch, watchEffect } from 'vue';

  // start 播放控制
  const speed = ref(50); // 播放速度
  const play = ref(false); // 播放状态
  function speed_func(play_speed){
    speed.value = play_speed.value;
    console.log(speed.value);
  }
  function play_func(play_or_hold){
    play.value = play_or_hold.value;
    console.log(play.value);
    if(play.value){
      clear_canvas();
      test_canvas();
    }
  }
  // end 播放控制

  // start canvas
  function test_canvas(){
    var canvas = document.getElementById("drawing");
    if (canvas.getContext){
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 55, 50);
      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (30, 30, 55, 50);
    }
  }
  function clear_canvas(){
    var canvas = document.getElementById("drawing");
    if (canvas.getContext){
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,500,500);
    }
  }
  // end canvas

  // 具体操作
  const list_size = ref(); // 列表大小
  const list_insert_index = ref(); // 插入的位置
  const list_insert_value = ref(); // 插入的值
  const list_delete_value = ref(); // 删除数据所在位置
  function init(init_value){
    list_size.value = init_value.value; // 因为是const引用,所以只能通过相互赋值进行传递参数
    console.log(list_size);
  }
  function insert(insert_index,insert_value){
    list_insert_index.value = insert_index.value;
    list_insert_value.value = insert_value.value;
  }
  function Delete(delete_value){
    list_delete_value.value = delet
    e_value.value;
  }

</script>

<style>
  @import url("@/assets/css/index.css");
</style>