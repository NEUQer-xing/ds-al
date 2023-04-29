<template>
    <Row>
        <Col span="17">
          col-20
        </Col>
        <Col span="7">
          <listmenu></listmenu>
          <note></note>
          <chatgpt></chatgpt>
        </Col>
    </Row>
</template>

<script setup>
  import listmenu from '@/components/listmenu.vue';
  import note from '@/components/note.vue';
  import chatgpt from '@/components/chatgpt.vue';
</script>

<style>

</style>