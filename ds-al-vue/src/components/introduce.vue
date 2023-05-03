<template>
    <Card>
        <template #title>
            <strong><Icon type="ios-navigate" />位置指示</strong>
        </template>
        <Tag  color="warning">
            <strong>
                当前的位置为:
            </strong>
        </Tag>
        <Tag  color="success">
            <strong>
                <slot> </slot>
            </strong>
        </Tag>
    </Card>
</template>

<script setup>

</script>