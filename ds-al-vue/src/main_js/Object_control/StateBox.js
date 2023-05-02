// JavaScript Document
// 动画矩形
var StateBox = function(objectID, state, width, height) {
	this.objectID = objectID ; // 物体的ID
	this.state = state ; // 物体的标签
	this.width = width ; // 宽度
	this.height = height ; // 高度
	this.addToScene = true ; // 是否加入画布
}

// 继承和构造函数
StateBox.prototype = new AnimatedObject() ;
StateBox.prototype.constructor = StateBox ;

// 设置状态
StateBox.prototype.setState = function(state) {
	this.state = state ;
}

// 画图
StateBox.prototype.draw = function(ctx) {
	// 开始画图
	ctx.beginPath() ;
	// 设置透明度
	ctx.globalAlpha = 1.0 ;
	// 画背景
	ctx.moveTo(this.x, this.y) ;
	ctx.lineTo(this.x+this.width, this.y) ;
	ctx.lineTo(this.x+this.width, this.y+this.height) ;
	ctx.lineTo(this.x, this.y+this.height) ;
	ctx.fillStyle = this.backgroundColor ;
	ctx.fill() ;
	// 写文字
	ctx.font = "16px Arial" ;
	ctx.textAlign = "left" ;
	ctx.textBaseline = "middle" ;
	ctx.fillStyle = this.foregroundColor ;
	ctx.fillText(this.state, this.x+20, parseInt(this.y+this.height/2)) ;
}