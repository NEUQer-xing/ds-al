<template>       
    <v-md-editor v-model="text" height="600px" @save="save"></v-md-editor> 
         <!-- left-toolbar="undo" 控制markdown上方工具栏的数量 -->
</template>
<script setup>
    import { ref , onMounted } from 'vue';
    import { Notice } from 'view-ui-plus';
    let note = "";
    const text=ref("");

    onMounted(() => {
        note =  get_note();
        text.value = note;
    });

    function save(tx,ht){
        text.value = tx;
        save_note(tx);
    }
    function save_note(note){
        localStorage.setItem("note", note);
        Notice.success({
            title: '保存成功',
            desc: '笔记保存成功,下次可以返回继续编辑',
            duration: 3
        })
        return true;
    };
    function get_note(){
        if (note!="") return note;
        note = localStorage.getItem("note") ?? "";
        return note;
    };
</script>