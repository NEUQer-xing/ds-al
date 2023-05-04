import {Message,Notice} from 'view-ui-plus';
function show_notice(notices, type , during_time) {
	var type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	} else if(type == 'warning') {
		type_zh = '警告' ;
	}
	var times = during_time == undefined ? 6 : during_time ;
	Notice[type]({
		title: type_zh, // 标题
		desc: notices,  // 内容
		duration: times  	// 持续时间
	});
}
function show_message(content, type, during_time ) {
	var type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	}
	var times = during_time == undefined ? 0: during_time ;
	Message[type]({
		content: content, // 内容
		duration: times , 	// 持续时间
		background: true, // 是否显示背景色
		closable: true, // 是否显示关闭按钮
	});
}

export function speed_func_control(play_speed) {
    show_notice('当前播放的速度为:' + play_speed.value, 'info');
    setAnimationSpeed(play_speed.value);
}
export function scale_func_control(canvas_scale,ctx,drawing_size) {
	ctx.clearRect(0, 0, drawing_size.width, drawing_size.height);
    ctx.scale(canvas_scale.value, canvas_scale.value);
	show_notice('设置缩放的比例为:' + canvas_scale.value, 'success',3);
}
export function scale_reset_control(canvas_scale,ctx,drawing_size) {
	ctx.clearRect(0, 0, drawing_size.width, drawing_size.height);
    ctx.scale(1 / canvas_scale.value, 1 / canvas_scale.value);
	show_notice('重置缩放比例为:' + 1, 'success',3);
}