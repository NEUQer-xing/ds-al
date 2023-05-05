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
    // <!-----------------------------新加的代码------------------------>

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