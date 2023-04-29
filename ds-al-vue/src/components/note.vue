<template>
    <Card>
        <template #title>
            <strong><Icon type="md-bookmarks" />笔记</strong>
        </template>
        <Collapse>
            <Panel name="1">
                展开记录笔记
                <template #content>
                    <v-md-editor v-model="text" height="400px" left-toolbar="undo"></v-md-editor> 
                    <!-- left-toolbar="undo" 控制markdown上方工具栏的数量 -->
                </template>
            </Panel>
        </Collapse>
    </Card>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { Panel } from 'view-ui-plus';
    var text=ref("this is my note!");
</script>