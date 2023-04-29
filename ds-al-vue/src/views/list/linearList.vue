<template>
    <Row>
        <Col span="17">
          <div class="showBox" style="overflow: scroll;">
		        <canvas id="drawing" width="2000" height="1000">Canvas</canvas>
		      </div>
        </Col>
        <Col span="7">
          <control></control>
          <listmenu></listmenu>
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
</script>

<style>
  @import url("@/assets/css/index.css");

</style>