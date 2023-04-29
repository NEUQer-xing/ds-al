<template>
  <Card>
        <template #title>
            <strong><Icon type="md-ionitron" />AI助手</strong>
        </template>
        <Collapse>
            <Panel name="1">
                呼出AI助手
                <template #content>
                    {{ text }}
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Panel } from 'view-ui-plus';
    var text=ref("this is my AI助手!");
</script>

<style>

</style>