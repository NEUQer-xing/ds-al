var type = 0;
var index = 0;
$(function () {
    //图部分

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