// JavaScript Document
// 动画指针
var AnimatedPointer = function(objectID, label, length, direction) {
	this.objectID = objectID ; // 物体的ID
	this.label = label ; // 物体的标签
	this.length = length ; // 箭头长度
	this.direction = direction ; // 方向
	this.height = 8 ; // 高度
	this.width = 6 ; // 宽度
	this.interval = 10 ; // 间距
}

// 继承和构造函数
AnimatedPointer.prototype = new AnimatedObject() ;
AnimatedPointer.prototype.constructor = AnimatedPointer ;

// 画箭头
AnimatedPointer.prototype.drawArrow = function(ctx) {
	ctx.beginPath() ;
	// 判断方向
	if(this.direction.toUpperCase() == 'UP') {
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x-this.width), parseInt(this.y+this.height)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x+this.width), parseInt(this.y+this.height)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(this.x, parseInt(this.y+this.length)) ;
	}
	else if(this.direction.toUpperCase() == 'DOWN') {
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x-this.width), parseInt(this.y-this.height)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x+this.width), parseInt(this.y-this.height)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(this.x, parseInt(this.y-this.length)) ;
	}
	else if(this.direction.toUpperCase() == 'LEFT') {
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x+this.height), parseInt(this.y-this.width)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x+this.height), parseInt(this.y+this.width)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x+this.length), this.y) ;
	}
	else if(this.direction.toUpperCase() == 'RIGHT') {
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x-this.height), parseInt(this.y-this.width)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x-this.height), parseInt(this.y+this.width)) ;
		ctx.moveTo(this.x, this.y) ;
		ctx.lineTo(parseInt(this.x-this.length), this.y) ;
	}
	ctx.closePath() ;
	ctx.strokeStyle = this.foregroundColor ;
	ctx.lineWidth = 2 ;
	ctx.stroke();
	ctx.fillStyle = this.foregroundColor ;
	ctx.fill();
}

// 画图
AnimatedPointer.prototype.draw = function(ctx) {
	// 开始画图
	ctx.beginPath() ;
	// 设置透明度
	ctx.globalAlpha = 1.0 ;
	// 画箭头
	this.drawArrow(ctx) ;
	// 写文字
	ctx.font = "10px Arial" ;
	ctx.textAlign = "center" ;
	ctx.textBaseline = "middle" ;
	ctx.fillStyle = this.foregroundColor ;
	// 判断方向
	if(this.direction.toUpperCase() == 'UP') {
		ctx.fillText(this.label, this.x, parseInt(this.y+this.length+this.interval)) ;
	}
	else if(this.direction.toUpperCase() == 'DOWN') {
		ctx.fillText(this.label, this.x, parseInt(this.y-this.length-this.interval)) ;
	}
	else if(this.direction.toUpperCase() == 'LEFT') {
		ctx.fillText(this.label, parseInt(this.x-this.length-this.interval), this.y) ;
	}
	else if(this.direction.toUpperCase() == 'RIGHT') {
		ctx.fillText(this.label, parseInt(this.x+this.length+this.interval), this.y) ;
	}
}