<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
#title {
    font-size: 40px;
    font-weight: bold;
    color: #76b8fa;
  }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div>
                        <p id="title">
                            <router-link to="/">DS&AL</router-link>
                        </p>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto">
                        <Submenu name="1" >
                            <template #title>
                                <Icon type="md-code" />
                                线性表
                            </template>
                            <MenuItem name="1-1" to="linearList">顺序表</MenuItem>
                            <MenuItem name="1-2" to="singleList">单链表</MenuItem>
                            <MenuItem name="1-3" to="stackList">栈</MenuItem>
                            <MenuItem name="1-4" to="queueList">队列</MenuItem>
                            <MenuItem name="1-5" to="factorial">阶乘</MenuItem>
                            <MenuItem name="1-6" to="linkedQueue">链式队列</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template #title>
                                <Icon type="ios-git-merge" />
                                树
                            </template>
                            <MenuItem name="2-1" to="BST">线索二叉树</MenuItem>
                            <MenuItem name="2-2" to="heap_tree">堆</MenuItem>
                            <MenuItem name="2-3" to="huo_fu_man_tree">霍夫曼树</MenuItem>
                            <MenuItem name="2-4" to="avl_tree">AVL树</MenuItem>
                            <MenuItem name="2-5" to="zhuan_huan">二叉树转换</MenuItem>
                            <MenuItem name="2-6" to="xian_suo_tree">线索二叉树</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template #title>
                                <Icon type="ios-keypad" />
                                图
                            </template>
                            <MenuItem name="3-1" to="DFS_traverse">DFS遍历</MenuItem>
                            <MenuItem name="3-2" to="BFS_traverse">BFS遍历</MenuItem>
                            <MenuItem name="3-3" to="prim">Prim算法</MenuItem>
                            <MenuItem name="3-4" to="kruskal">Kruskal算法</MenuItem>
                            <MenuItem name="3-5" to="dijkstra">Dijkstra算法</MenuItem>
                            <MenuItem name="3-6" to="floyd">Floyd算法</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template #title>
                                <Icon type="md-stats" />
                                排序
                            </template>
                            <Submenu name="4-1">
                                <template #title>
                                    比较排序
                                </template>
                                <MenuItem name="4-1-1" to="mao_pao">冒泡排序</MenuItem>
                                <MenuItem name="4-1-2" to="xuan_ze">选择排序</MenuItem>
                                <MenuItem name="4-1-3" to="cha_ru">插入排序</MenuItem>
                                <MenuItem name="4-1-4" to="xi_er">希尔排序</MenuItem>
                                <MenuItem name="4-1-5" to="gui_bing">归并排序</MenuItem>
                                <MenuItem name="4-1-6" to="quick_sort">快速排序</MenuItem>
                            </Submenu>
                            <MenuItem name="4-2" to="heap_sort">堆排序</MenuItem>
                            <MenuItem name="4-3" to="ji_shu">基数排序</MenuItem>
                        </Submenu>
                        <Submenu name="5">
                            <template #title>
                                <Icon type="md-search" />
                                字符串
                            </template>
                            <MenuItem name="5-1" to="search">查找算法</MenuItem>
                            <MenuItem name="5-2" to="string_match">字符串匹配</MenuItem>
                        </Submenu>

                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 10px 0px'}">
                    <Content :style="{padding: '24px', minHeight: '600px', background: '#fff'}">
                        <router-view> </router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>

</script>
