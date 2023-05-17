var Algorithm = function() {}
// 初始化
Algorithm.prototype.init = function(animManager, width, height) {
	this.animationManager = animManager ; 	// 动画
	this.canvasWidth = width ; 				// 画布宽度
	this.canvasHeight = height ; 			// 画布高度
	this.commands = [] ; 					// 命令行
}
// 完成动作
Algorithm.prototype.implementAction = function(func, val) {
	var retVal = func(val);
	this.animationManager.startNewAnimation(retVal);
}
// commands生成函数
Algorithm.prototype.cmd = function() {
	var command = arguments[0];
	for(i = 1; i < arguments.length; i++)
	{
		command = command + "<cry>" + String(arguments[i]);
	}
	this.commands.push(command);
}	