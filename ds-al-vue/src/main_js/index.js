var type = 0;
var index = 0;
$(function () {
    //图部分
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

});