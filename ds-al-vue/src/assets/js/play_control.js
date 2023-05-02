import {Notice} from 'view-ui-plus';
function show_notice(notices, type) {
	var type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	}
	Notice[type]({
		title: type_zh, // 标题
		desc: notices,  // 内容
		duration: 6  	// 持续时间
	});
}
export function speed_func_control(play_speed) {
    show_notice('当前播放的速度为:' + play_speed.value, 'info');
    setAnimationSpeed(play_speed.value);
}