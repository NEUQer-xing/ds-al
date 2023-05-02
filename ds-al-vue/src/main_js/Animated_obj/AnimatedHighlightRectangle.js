// JavaScript Document
// 动画高亮矩形
var AnimatedHighlightRectangle = function(objectID, width, height, xJust, yJust) {
	this.objectID = objectID ; // 物体的ID
	this.width = width ; // 宽
	this.height = height ; // 高
	this.xJustify = xJust ;
	this.yJustify = yJust ;
	this.thickness = 3 ; // 宽度
}

// 继承和构造函数
AnimatedHighlightRectangle.prototype = new AnimatedObject() ;
AnimatedHighlightRectangle.prototype.constructor = AnimatedHighlightRectangle ;

// 画图
AnimatedHighlightRectangle.prototype.draw = function(ctx) {
	var startX ; // 左上角的X坐标
	var startY ; // 左上角的Y坐标
	// 通过justX和justY来计算左上角点的坐标和文字的坐标
	if(this.xJustify.toUpperCase() == 'LEFT') {
		startX = this.x ;
	}
	else if(this.xJustify.toUpperCase() == 'CENTER') {
		startX = this.x - this.width/2 ;
	}
	else if(this.xJustify.toUpperCase() == 'RIGHT') {
		startX = this.x - this.width ;
	}
	if(this.yJustify.toUpperCase() == 'TOP') {
		startY = this.y ;
	}
	else if(this.yJustify.toUpperCase() == 'CENTER') {
		startY = this.y - this.height/2 ;
	}
	else if(this.yJustify.toUpperCase() == 'BOTTOM') {
		startY = this.y - this.height ;
	}
	ctx.beginPath() ;
	// 设置透明度
	ctx.globalAlpha = 1.0 ;
	// 画外框
	ctx.moveTo(startX - parseInt(this.highlightDiff), startY - parseInt(this.highlightDiff)) ;
	ctx.lineTo(startX+this.width + parseInt(this.highlightDiff), startY - parseInt(this.highlightDiff)) ;
	ctx.lineTo(startX+this.width + parseInt(this.highlightDiff), startY+this.height + parseInt(this.highlightDiff)) ;
	ctx.lineTo(startX - parseInt(this.highlightDiff), startY+this.height + parseInt(this.highlightDiff)) ;
	ctx.lineTo(startX - parseInt(this.highlightDiff), startY - parseInt(this.highlightDiff)) ;
	ctx.strokeStyle = '#FF6347' ;
	ctx.lineWidth = this.highlightDiff+1 ;
	ctx.stroke() ;
}