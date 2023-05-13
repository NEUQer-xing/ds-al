<style>
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .dev-run-preview .dev-run-preview-edit{ display: none }
    .layout-logo{
        width: 110px;
        height: 55px;
        float: left;
        position: relative;
    }
    #title {
        font-size: 35px;
        font-weight: bold;
        float: right;
        color: #76b8fa;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo">
                        <a href="/welcome.html">
                            <img src="./assets/img/D&A.png" style="width: 110px; height: 55px;"/>
                        </a>
                    </div>
                    <!-- <div style="float: right;">
                        <MenuItem>
                            <Button type="primary">
                                <a href="/.html">
                                    <span style="font-size: 16px; font-weight: bold; color: #ffff;">登录</span>
                                </a>
                            </Button>
                            &nbsp;&nbsp;
                            <Button type="info">
                                <a href="/welcome.html">
                                    <span style="font-size: 16px; font-weight: bold; color: #ffff;">注册</span>
                                </a>
                            </Button>
                        </MenuItem>
                    </div> -->
                    <div id="title">
                        <span style="font-size: 30px; font-weight: bold; color: #f75200;">数据结构</span>
                        <span style="font-size: 30px; font-weight: bold; color: #76b8fa;">与</span>
                        <span style="font-size: 30px; font-weight: bold; color: #45a0fc ;">算法</span>
                        <span style="font-size: 30px; font-weight: bold; color: #76b8fa;">可视化平台</span>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider breakpoint="md" collapsible :collapsed-width="110" v-model="isCollapsed" :style="{background: '#fff'}">
                    <Menu theme="light" width="auto" :class="menuitemClasses" accordion @on-select="show_spin">
                        <Submenu name="1" >
                            <template #title>
                                <Icon type="md-code" />
                                <span>线性表</span>
                            </template>
                            <MenuItem name="1-1" to="linearList">顺序表</MenuItem>
                            <MenuItem name="1-2" to="singleList">单链表</MenuItem>
                            <MenuItem name="1-3" to="stackList">栈</MenuItem>
                            <MenuItem name="1-4" to="queueList">队列</MenuItem>
                            <MenuItem name="1-6" to="linkedQueue">链式队列</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template #title>
                                <Icon type="ios-git-merge" />
                                <span>树</span>
                            </template>
                            <MenuItem name="2-1" to="BST">二叉搜索树</MenuItem>
                            <MenuItem name="2-2" to="heap_tree">堆</MenuItem>
                            <MenuItem name="2-3" to="huo_fu_man_tree">霍夫曼树</MenuItem>
                            <MenuItem name="2-4" to="avl_tree">AVL树</MenuItem>
                            <MenuItem name="2-5" to="zhuan_huan">二叉树转换</MenuItem>
                            <MenuItem name="2-6" to="xian_suo_tree">线索二叉树</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template #title>
                                <Icon type="ios-keypad" />
                                <span>图</span>
                            </template>
                            <Submenu name="3-1">
                                <template #title>
                                    图的遍历
                                </template>
                                <MenuItem name="3-1-1" to="DFS_traverse">DFS遍历</MenuItem>
                                <MenuItem name="3-1-2" to="BFS_traverse">BFS遍历</MenuItem>
                            </Submenu>
                            <Submenu name="3-2">
                                <template #title>
                                    最小生成树
                                </template>
                                <MenuItem name="3-2-1" to="prim">Prim算法</MenuItem>
                                <MenuItem name="3-2-2" to="kruskal">Kruskal算法</MenuItem>
                            </Submenu>
                            <Submenu name="3-3">
                                <template #title>
                                    最短路径
                                </template>
                                <MenuItem name="3-3-1" to="dijkstra">Dijkstra算法</MenuItem>
                                <MenuItem name="3-3-2" to="floyd">Floyd算法</MenuItem>
                            </Submenu>

                        </Submenu>
                        <Submenu name="4">
                            <template #title>
                                <Icon type="md-stats" />
                                <span>排序</span>
                            </template>
                            <MenuItem name="4-1" to="compare_sort">比较排序</MenuItem>
                            <MenuItem name="4-2" to="heap_sort">堆排序</MenuItem>
                            <MenuItem name="4-3" to="ji_shu">基数排序</MenuItem>
                        </Submenu>
                        <Submenu name="5">
                            <template #title>
                                <Icon type="md-search" />
                                <span>查找</span>
                            </template>
                            <MenuItem name="5-1" to="search">查找</MenuItem>
                            <MenuItem name="5-2" to="string_match">字符串匹配</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0px 5px 0px'}">
                    <Content :style="{padding: '10px 10px 0px', minHeight: '800px', background: '#fff'}">
                        <router-view> </router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import { Submenu } from 'view-ui-plus';
export default {
    data() {
        return {
            isCollapsed: false
        };
    },
    methods:{
        show_spin(){
            this.$Spin.show();
            setTimeout(() => {
                this.$Spin.hide();
            }, 1500);
        },
    },
    computed: {
        menuitemClasses: function () {
            return [
                "menu-item",
                this.isCollapsed ? "collapsed-menu" : ""
            ];
        }
    },
    components: { Submenu },

}
</script>
    