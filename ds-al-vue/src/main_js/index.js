var type = 0;
var index = 0;
var s_succ = '成功了';
$(function () {
    //--------------------------------------------------------------------------------
    //图部分
    //DFS遍历

    var graphStartFlag = 0;
    $('.graphStartHide').click(function () {
        if (graphStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".graphDFSStarts").show()', 100);
            $('.graphDFSStarts').animate({
                'width': '140px',
            }, 200);
            graphStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".graphDFSStarts").hide()', 100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.subX4').hide();
            $('.graphDFSStarts').animate({
                'width': '0px',
            }, 200);
            graphStartFlag = 0;
        }

    });

    $('.graphDFSStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];

        for (var i = 1; i < 5; i++) {
            if (i != s) {
                $('.subX' + i).hide();
            }
            else {
                $('.subX' + s).show();
            }
        };
    });

    //生成随机图
    $('.createGraph').click(function () {
        var peakNumber = parseInt($('.peakNumber').val());
        if (!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        // $('.peakNumber').val('');
    });

    //加边
    $('.addEdge').click(function () {
        var startNumber = parseInt($('.startNumber').val());
        var endNumber = parseInt($('.endNumber').val());
        var weight = parseInt($('.weightNumber').val());
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        // $('.startNumber').val('');
        // $('.endNumber').val('');
    });
    //删边
    $('.deleteEdge').click(function () {
        var startNumber = parseInt($('.startNumber').val());
        var endNumber = parseInt($('.endNumber').val());
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        // $('.startNumber').val('');
        // $('.endNumber').val('');
    });
    //run DFS
    $('.DFS').click(function () {
        var runNumber = parseInt($('.runNumber').val());
        runDFSCallBack(runNumber);
        // $('.runNumber').val('');
    });
    //run BFS
    $('.BFS').click(function () {
        var runNumber = parseInt($('.runNumber').val());
        runBFSCallBack(runNumber);
        // $('.runNumber').val('');
    });
    //配置选项
    // 显示边权重
    $('#displayWeight').click(function () {
        showEdgeWeightSwitch($('#displayWeight')[0].checked);
    })
    //选中有向图
    $('.radio1').click(function () {
        directedGraphSwitch(true);
    });
    //选中无向图
    $('.radio2').click(function () {
        directedGraphSwitch(false);
    });
    // $("#displayWeight:checked").bind(function(){
    //     alert('displayWeight checked');
    // });
    // $("#displayWeight").checked.bind(function(){
    //     alert('displayWeight checked');
    // });
    //prim
    var primStartFlag = 0;
    $('.primStartHide').click(function () {
        if (primStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".primStarts").show()', 100);
            $('.primStarts').animate({
                'width': '140px',
            }, 200);
            primStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".primStarts").hide()', 100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.primStarts').animate({
                'width': '0px',
            }, 200);
            primStartFlag = 0;
        }

    });

    $('.primStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];

        for (var i = 1; i < 5; i++) {
            if (i != s) {
                $('.subX' + i).hide();
            }
            else {
                $('.subX' + s).show();
            }
        };
    });

    //生成随机图
    $('.createPrimGraph').click(function () {
        var peakNumber = parseInt($('.peakPrimNumber').val());
        if (!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakPrimNumber').val('');
    });

    //加边
    $('.addPrimEdge').click(function () {
        var startNumber = parseInt($('.startPrimNumber').val());
        var endNumber = parseInt($('.endPrimNumber').val());
        var weight = parseInt($('.weightPrimNumber').val());
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startPrimNumber').val('');
        $('.endPrimNumber').val('');
    });
    //删边
    $('.deletePrimEdge').click(function () {
        var startNumber = parseInt($('.startPrimNumber').val());
        var endNumber = parseInt($('.endPrimNumber').val());
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startPrimNumber').val('');
        $('.endprimNumber').val('');
    });
    //run prim
    $('.Prim').click(function () {
        var runNumber = parseInt($('.runPrimNumber').val());
        runPrimCallBack(runNumber);
        // $('.runPrimNumber').val('');
    });

    //kruskal算法
    var kruStartFlag = 0;
    $('.kruStartHide').click(function () {
        if (kruStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".kruStarts").show()', 100);
            $('.kruStarts').animate({
                'width': '140px',
            }, 200);
            kruStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".kruStarts").hide()', 100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.kruStarts').animate({
                'width': '0px',
            }, 200);
            kruStartFlag = 0;
        }

    });

    $('.kruStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];

        for (var i = 1; i < 5; i++) {
            if (i != s) {
                $('.subX' + i).hide();
            }
            else {
                $('.subX' + s).show();
            }
        };
    });

    //生成随机图
    $('.createKruGraph').click(function () {
        var peakNumber = parseInt($('.peakKruNumber').val());
        if (!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakKruNumber').val('');
    });

    //加边
    $('.addKruEdge').click(function () {
        var startNumber = parseInt($('.startKruNumber').val());
        var endNumber = parseInt($('.endKruNumber').val());
        var weight = parseInt($('.weightKruNumber').val());
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startKruNumber').val('');
        $('.endKruNumber').val('');
    });
    //删边
    $('.deleteKruEdge').click(function () {
        var startNumber = parseInt($('.startKruNumber').val());
        var endNumber = parseInt($('.endKruNumber').val());
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startKruNumber').val('');
        $('.endKruNumber').val('');
    });
    //run Kruskal
    $('.Kruskal').click(function () {
        // var runNumber=parseInt($('.runKruNumber').val());
        runKruskalCallBack();
        // $('.runKruNumber').val('');
    });

    //Dijkstra
    var dijStartFlag = 0;
    $('.dijStartHide').click(function () {
        if (dijStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".dijStarts").show()', 100);
            $('.dijStarts').animate({
                'width': '140px',
            }, 200);
            dijStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".dijStarts").hide()', 100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.subX4').hide();
            $('.dijStarts').animate({
                'width': '0px',
            }, 200);
            dijStartFlag = 0;
        }

    });

    $('.dijStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];

        for (var i = 1; i < 5; i++) {
            if (i != s) {
                $('.subX' + i).hide();
            }
            else {
                $('.subX' + s).show();
            }
        };
    });

    //生成随机图
    $('.createDijGraph').click(function () {
        var peakNumber = parseInt($('.peakDijNumber').val());
        if (!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakDijNumber').val('');
    });

    //加边
    $('.addDijEdge').click(function () {
        var startNumber = parseInt($('.startDijNumber').val());
        var endNumber = parseInt($('.endDijNumber').val());
        var weight = parseInt($('.weightDijNumber').val());
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startDijNumber').val('');
        $('.endDijNumber').val('');
    });
    //删边
    $('.deleteDijEdge').click(function () {
        var startNumber = parseInt($('.startDijNumber').val());
        var endNumber = parseInt($('.endDijNumber').val());
        if (!isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startDijNumber').val('');
        $('.endDijNumber').val('');
    });
    //run Dijkstra
    $('.Dijkstra').click(function () {
        var runNumber = parseInt($('.runDijNumber').val());
        runDijkstraCallBack(runNumber);
        // $('.runDijNumber').val('');
    });
    // run Floyd 
    $('.Floyd').click(function () {
        runFloydCallBack();
    });

    //--------------------------------------------------------------------------------
    // 排序部分

    //比较排序
    var sortStartFlag = 0;
    $('.sortStartHide').click(function () {
        if (sortStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".compareSortStarts").show()', 100);
            $('.compareSortStarts').animate({
                'width': '140px',
            }, 200);
            sortStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".compareSortStarts").hide()', 100);
            $('.subC1').hide();
            $('.subC2').hide();
            $('.compareSortStarts').animate({
                'width': '0px',
            }, 200);
            sortStartFlag = 0;
        }

    });
    $('.compareSortStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subC' + i).hide();
            }
            else {
                $('.subC' + s).show();
            }
        };
    });
    //生成排序数组
    $('.createArray').click(function () {
        var length = $('.sortArrayLength').val();
        if (!isNaN(length)) {
            currentSort.initCallBack(length);
        }
    });

    //执行插入排序
    $('.insertSort').click(function () {
        currentSort.insertSortCallBack();
    });
    //执行选择排序
    $('.selectSort').click(function () {
        currentSort.selectSortCallBack();
    });
    //执行冒泡排序
    $('.bubbleSort').click(function () {
        currentSort.bubbleSortCallBack();
    });
    //执行希尔排序
    $('.shellSort').click(function () {
        currentSort.shellSortCallBack();
    });
    //执行快速排序
    $('.quickSort').click(function () {
        currentSort.quickSortCallBack();
    });
    //执行归并排序
    $('.mergeSort').click(function () {
        currentSort.mergeSortCallBack();
    });


    //基数排序
    var radixSortStartFlag = 0;
    $('.sortStartHide').click(function () {
        if (radixSortStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".radixSortStarts").show()', 100);
            $('.radixSortStarts').animate({
                'width': '140px',
            }, 200);
            radixSortStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".radixSortStarts").hide()', 100);
            $('.subV1').hide();
            $('.subV2').hide();
            $('.radixSortStarts').animate({
                'width': '0px',
            }, 200);
            radixSortStartFlag = 0;
        }

    });
    $('.radixSortStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subV' + i).hide();
            }
            else {
                $('.subV' + s).show();
            }
        };
    });
    //生成排序数组
    $('.createRadixArray').click(function () {
        var length = $('.sortArrayLength').val();
        if (!isNaN(length)) {
            currentSort.initCallBack(length);
        }
    });
    //执行基数排序
    $('.radixSort').click(function () {
        currentSort.radixSortCallBack();
    });


    // <!-----------------------------新加的代码------------------------>
    ///堆排序
    var heapSortStartFlag = 0;
    $('.sortStartHide').click(function () {
        if (heapSortStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".heapSortStarts").show()', 100);
            $('.heapSortStarts').animate({
                'width': '140px',
            }, 200);
            heapSortStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".heapSortStarts").hide()', 100);
            $('.subHS1').hide();
            $('.subHS2').hide();
            $('.heapSortStarts').animate({
                'width': '0px',
            }, 200);
            heapSortStartFlag = 0;
        }
    });
    $('.heapSortStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subHS' + i).hide();
            }
            else {
                $('.subHS' + s).show();
            }
        };
    });
    //生成排序数组
    $('.createHeapArray').click(function () {
        var length = $('.sortArrayLength').val();
        if (!isNaN(length)) {
            // alert(length);
            currentSort.initCallBack(length);
        }
    });
    //执行堆排序
    $('.heapSort').click(function () {
        currentSort.HeapSortCallBack();
    });



    //-------------------------------------------------------------------------------
    //字符串
    //模式匹配
    var patternStartFlag = 0;
    $('.patternStartHide').click(function () {
        if (patternStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".patternStarts").show()', 100);
            $('.patternStarts').animate({
                'width': '140px',
            }, 200);
            patternStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".patternStarts").hide()', 100);
            $('.subW1').hide();
            $('.subW2').hide();
            $('.subW3').hide();
            $('.patternStarts').animate({
                'width': '0px',
            }, 200);
            patternStartFlag = 0;
        }

    });
    $('.patternStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subW' + i).hide();
            }
            else {
                $('.subW' + s).show();
            }
        };
    });
    //生成模式串
    $('.createPattern').click(function () {
        var str = $('.patternString_de').val();
        if (str) {
            currentPatternMatch.patternCallBack(str);
        } else {
            alert('请输入模式串');
        }
    });
    //生成目标串
    $('.createTarget').click(function () {
        var str = $('.targetString_de').val();
        if (str) {
            currentPatternMatch.targetCallBack(str);
        } else {
            alert('请输入目标串');
        }
    });
    //KMP匹配
    $('.match').click(function () {
        currentPatternMatch.KMPmatchCallBack();
    });
    //模式串与目标串开始匹配
    $('.matchStart').click(function () {
        currentPatternMatch.matchCallBack();
    });

    //查找
    var searchStartFlag = 0;
    $('.searchStartHide').click(function () {
        if (searchStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".searchStarts").show()', 100);
            $('.searchStarts').animate({
                'width': '140px',
            }, 200);
            searchStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".searchStarts").hide()', 100);
            $('.subY1').hide();
            $('.subY2').hide();
            $('.subY3').hide();
            $('.searchStarts').animate({
                'width': '0px',
            }, 200);
            searchStartFlag = 0;
        }
    });
    $('.searchStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subY' + i).hide();
            }
            else {
                $('.subY' + s).show();
            }
        };
    });
    //设置数组大小
    $('.setSize').click(function () {
        var size = $('.arraySize').val();
        if (!isNaN(size)) {
            currentSearch.initMaxSizeCallBack(size);
        }
    });
    //设置数组内容
    $('.createSearchArray').click(function () {
        var content = $('.contentDetail').val();
        if (content) {
            currentSearch.initArrayCallBack(content);
        }
    });
    //二分查找
    $('.binarySearch').click(function () {
        var toSearch = $('.whichOne').val();
        if (toSearch) {
            currentSearch.binarySearchCallBack(toSearch);
        }
    });
    //顺序查找
    $('.sequentialSearch').click(function () {
        var toSearch = $('.whichOne').val();
        if (toSearch) {
            currentSearch.linearSearchCallBack(toSearch);
        }
    });

    //------------------------------------------树-----------------------------------
    //线索二叉树
    var bstTreeStartFlag = 0;
    $('.treeStartHide').click(function () {
        if (bstTreeStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".bstTreeStarts").show()', 100);
            $('.bstTreeStarts').animate({
                'width': '140px',
            }, 200);
            bstTreeStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".bstTreeStarts").hide()', 100);
            $('.subB1').hide();
            $('.bstTreeStarts').animate({
                'width': '0px',
            }, 200);
            bstTreeStartFlag = 0;
        }

    });
    $('.bstTreeStarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 4; i++) {
            if (i != s) {
                $('.subB' + i).hide();
            }
            else {
                $('.subB' + s).show();
            }
        };
    });
    //插入
    $('.bstTreeInsert').click(function () {
        var bstTreeNum = $('.bstTreeNumber').val();
        if (bstTreeNum) {
            currentBST.insertCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });
    //查找
    $('.bstTreeSearch').click(function () {
        var bstTreeNum = $('.bstTreeNumber').val();
        if (bstTreeNum) {
            currentBST.searchCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });
    //删除
    $('.bstTreeDelete').click(function () {
        var bstTreeNum = $('.bstTreeNumber').val();
        if (bstTreeNum) {
            currentBST.deleteCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //树和森林的转换
    var actionFlag = 0;
    //选择btree或者tree
    $('#treeStyle').change(function () {
        var treeStyle = $(this).val();
        if (treeStyle == 'bTree') {
            $('#zuoyou').removeAttr('disabled');
            $('.BCreateLine').find('p').css('color', '#fff');
            actionFlag = 0;
        } else {
            $('#zuoyou').attr('disabled', 'true');
            $('.BCreateLine').find('p').css('color', 'graytext');
            actionFlag = 1;
        }
        currentBT2T.selectStyleButtonCallBack(treeStyle);
    });
    var canInsert = 1;
    //生成边
    $('.BCreateLine').click(function () {
        var parentNode = $('.parentNodeDetail').val();
        var nodePosition = $('#zuoyou').val();
        var childNode = $('.childNodeDetail').val();
        if ((actionFlag == 0) && (canInsert == 1)) {
            currentBT2T.createButtonCallBack(parentNode, nodePosition, childNode);
        } else {
            alert('不能生成边');
        }
    });
    //转换
    $('.transformP').click(function () {
        currentBT2T.changeButtonCallBack();
        canAutoPlay = 0;
        //alert("Inner function1 canAutoPlay" + canAutoPlay);
    });
    //刷新
    var canAutoPlay = 1;
    $('.updateP').click(function () {
        currentBT2T.newButtonCallBack();
    });
    
    // 自动演示
    $('.BT2TAction').click(function () {
        init();
        currentBT2T.autoBTreeToTree();
        currentBT2T.changeButtonCallBack("bTree");
    });

    $('.T2BTAction').click(function () {
        init();
        currentBT2T.createConstTreeCallBack(0);
        currentBT2T.changeButtonCallBack("Tree");
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //线索二叉树
    var ThrdBtreeStartFlag = 0;
    $('.ThrdBtreestartHide').click(function () {
        if (ThrdBtreeStartFlag == 0) {
            $(this).children().css('transform', 'rotate(180deg)');
            setTimeout('$(".ThrdBtreestarts").show()', 100);
            $('.ThrdBtreestarts').animate({
                'width': '140px',
            }, 200);
            ThrdBtreeStartFlag = 1;
        } else {
            $(this).children().css('transform', 'rotate(360deg)');
            setTimeout('$(".ThrdBtreestarts").hide()', 100);
            $('.subF1').hide();
            $('.ThrdBtreestarts').animate({
                'width': '0px',
            }, 200);
            ThrdBtreeStartFlag = 0;
        }

    });
    $('.ThrdBtreestarts p').click(function () {
        var str = $(this).attr('class');
        var s = str[str.length - 1];
        for (var i = 1; i < 5; i++) {
            if (i != s) {
                $('.subF' + i).hide();
            }
            else {
                $('.subF' + s).show();
            }
        };
    });
    var canThrd = 1;
    //生成边
    $('.ThrdBtreeCreateLine').click(function () {
        var parentNode = $('.parentNodeDetail').val();
        var nodePosition = $('#ThrdBtreezuoyou').val();
        var childNode = $('.childNodeDetail').val();
        if (canThrd == 1) {
            currentThrdBTree.createButtonCallBack(parentNode, nodePosition, childNode);
        } else {
            alert("请刷新");
        }
    });
    //加入线索
    var canAuto = 1;
    $('.addThrd').click(function () {
        currentThrdBTree.changeButtonCallBack();
        canAuto = 0;
    });
    //刷新
    $('.ThrdUpdate').click(function () {
        currentThrdBTree.newButtonCallBack();
    });
    //自动演示
    $('#autoThrdTree').click(function () {
        //currentThrdBTree.newButtonCallBack();
        if (canAuto == 1) {
            currentThrdBTree.autoThrdBTree();
            canThrd = 0;
            canAuto = 0;
        }
        else {
            // alert("请刷新");
            init();
            currentThrdBTree.autoThrdBTree();
        }
    });
});
function ini() {
    var url = document.location.search;
    index = url[1];
    type = index;
    $('.navList').children().eq(type).addClass('selected');
    $('.navList').children().eq(type).siblings().removeClass('selected');
}
function back() {
    window.location.href = "index.html";
}
function enterFun(obj) {
    $(obj).css('background', 'black');
}
function leaveFun(obj) {
    $(obj).css('background', 'rgb(89, 229, 89)');
}