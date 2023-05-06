import {Message,Notice} from 'view-ui-plus';
function show_notice(notices, type , during_time) {
	let type_zh ;
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
	var times = during_time == undefined ? 0: during_time ;
	Message[type]({
		content: content, // 内容
		duration: times , 	// 持续时间
		background: true, // 是否显示背景色
		closable: true, // 是否显示关闭按钮
	});
}

// 初始化函数
var currentGraph;
// 有向图的边画法改变
var directedGraphCurveWithSingleEdge = 0.0;	// 两个顶点之间只有一条边， 此时画直线
var directedGraphCurveWithDoubleEdge = 0.15;	// 两个顶点之间有两条边， 此时画曲线
var undirectedGraphCurve = 0.0;
var initialVertexNum = 5;	// 图初始的顶点数量
export function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentGraph = new Graph(animationManager, drawing.width, drawing.height);
	currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), initialVertexNum);
	currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
}

// 产生介于上界和下界的随机数，整数，上界和下界都可以取到
function getRandomNumber(lowerBound,upperBound) {
	var range = upperBound - lowerBound + 1;
	var rand = Math.round( Math.random() * 100 );
	return ( (rand% range) + lowerBound );
}


/* 边类 */
function GraphEdge(startVertex, endVertex, weight) {
	if (weight == null) {
		this.weight = 0;
	}
	else {
		this.weight = weight;
	}
	this.startVertex = startVertex;
	this.endVertex = endVertex;
}

GraphEdge.prototype = {
	constructor:GraphEdge,
}

/* 图类开始 */
// 图
var Graph = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initialize() ;
}
// 继承与构造
Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

// 初始化
Graph.prototype.initialize = function() {
	// 逻辑部分ID
	this.directed = false;		// 是否是有向图
	this.showEdgeWeight = false;	// 是否显示边权重
	// 图形部分
	this.objectID = 0 ; // 图形的序号
	this.DFSCircleID = 0;	// DFS遍历时显示的圆
	this.hintObjectID;
	this.circleID; // 节点ID数组
	this.hintLabelID;
	this.hintStartX = 550;
	this.hintStartY = 30;
	this.hintInterval = 10;
	this.hintRectWidth = 80;
	this.hintRectHeight = 40;

	this.radius = 26;	// 顶点圆的半径
	// 顶点位置的确定
	this.R = 150;		// 所有顶点分布在该圆上
	this.X0 = 250;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标
	this.foregroundColor = '#2db7f5' ; // 前景色
}

// 添加边调用函数
Graph.prototype.addEdgeCallBack = function (startVertex, endVertex, weight) {
	if (isNaN(weight) || weight == null) {
		weight = 10;
	}
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [startVertex, endVertex, weight]) ;
}
// 删除边调用函数
Graph.prototype.delEdgeCallBack = function (startVertex, endVertex) {
	currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [startVertex, endVertex]) ;
}
// DFS遍历调用函数
Graph.prototype.runDFSCallBack = function(startVertex) {
	startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
	currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), startVertex);
}
// 产生随机图调用函数
Graph.prototype.randomGraphCallBack = function() {
	do {
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	} while (1.0*currentGraph.edgeNum/currentGraph.vertexNum < 0.6 );
	// 限制了图的稀疏性
}

// 有向图和无向图的转换
Graph.prototype.directedGraphSwitch = function (directed) {
	if (directed != null) {
		// 先清除所有的边
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.directed = directed;
		// 获取随机图
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	}
}

// 顶点数量取值变化调用函数
Graph.prototype.vertexNumSelectChangeCallBack = function (newVertexNum) {
	if (!isNaN(parseInt(newVertexNum)) && parseInt(newVertexNum)>=3 && parseInt(newVertexNum) <= 10) {
		// 清除所有
		objectManager = null;
		currentGraph = null;
		animationManager = null;
		// 重新产生所有
		objectManager = new ObjectManager() ;
		animationManager = new AnimationManager(objectManager) ;
		currentGraph = new Graph(animationManager, drawing.width, drawing.height);
		currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), parseInt(newVertexNum));
	} else {
		alert("顶点数量取值范围应为 3-10 !");
	}
}

// 初始化数组
Graph.prototype.initGraph = function(vertexNum) {
	// DFS时移动的圆
	this.DFSCircleID = vertexNum;
	// 提示区域显示
	this.hintObjectID = new Array(vertexNum);
	this.circleID = new Array(vertexNum);
	for (var i=0; i<vertexNum; i++) {
		this.hintObjectID[i] = vertexNum + 1 + i;
	}
	this.hintLabelID = 2*vertexNum + 2;

	this.vertexNum = vertexNum ; 	// 顶点的数量
	this.edgeNum = 0;				// 边的数量
	this.matrix = new Array(this.vertexNum);	// 图的邻接矩阵
	for (var i=0; i<this.vertexNum; i++) {
		this. matrix[i] = new Array(this.vertexNum);
		for (var j=0; j<this.vertexNum; j++) {
			this.matrix[i][j] = 0;
		}
	}
	this.position = new Array(this.vertexNum);	// 存储顶点的位置
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i] = new Array(2);
	}
	// 对顶点的分布做出适应性改变
	this.R = this.R + 20 * (this.vertexNum - 5);
	this.R = (this.R > 220) ? 220 : this.R;
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i][0] = Math.round( this.X0 + this.R * Math.sin( 2* Math.PI * i / this.vertexNum ) );
		this.position[i][1] = Math.round( this.Y0 - this.R * Math.cos( 2 * Math.PI * i / this.vertexNum ) );
	}
	
	for(var i=0 ; i<this.vertexNum ; i++) {
		this.circleID[i] = i;
		this.cmd("CreateCircle", this.objectID, this.objectID,
				 this.position[this.objectID][0], this.position[this.objectID][1], this.radius);
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
		this.objectID ++ ;
	}
	// hint label "DFS递归深度"
	this.cmd("CreateLabel", this.hintLabelID, "DFS递归--(上下表示访问顺序，左右间隔表示递归深度)", this.hintStartX, this.hintStartY);
	this.cmd("SetForegroundColor", this.hintLabelID, this.foregroundColor);
	return this.commands;
}

// 清除图的所有边
Graph.prototype.clearAllEdges = function () {
	//alert("clearAllEdges");
	// 有向图
	//alert(this.directed);
	if (this.directed ) {
		for(var i=0; i<this.vertexNum; i++ ) {
			for(var j=0; j<this.vertexNum; j++) {
				if (this.matrix[i][j]) {
					this.cmd("Disconnect", i, j);
					this.matrix[i][j] = 0;
				}
			}
		}
	}
	// 无向图
	else {
		for (var i=0; i<this.vertexNum; i++) {
			for (var j=0; j<i ; j++) {
				if (this.matrix[i][j]) {
					this.cmd("Disconnect", j, i );
					this.matrix[i][j] =0;
					this.matrix[j][i] =0;
				}
			}
		}
	}
	this.edgeNum = 0;
	return this.commands;
}

// 产生随机图
Graph.prototype.getRandomGraph = function () {
	// 产生无向图
	if (!this.directed) {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j<i; j++) {
				if ( !getRandomNumber(0,2) ) {
					this.addEdge( [j , i, getRandomNumber(1,100), false] );
				}
			}
		}
	}
	// 产生有向图
	else {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j < this.vertexNum; j++) {
				if (i != j ) {
					//alert(i +" "+j +":"+this.matrix[i][j] );
					// 决定是否添加边
					if ( !getRandomNumber(0,2) ) {
						this.addEdge( [i , j, getRandomNumber(1,100), false] );
					}
				}
			}
		}
	}
	return this.commands;
}

// 添加边
Graph.prototype.addEdge = function() {
	// 传入参数，起点，终点，权重, 是否需要动画
	var startVertex =  arguments[0][0];
	var endVertex =  arguments[0][1];
	var weight =  arguments[0][2];	
	var withAnimation = (arguments[0].length > 3) ? arguments[0][3] : true;	// bool
	// 传入参数的合法性判断
	if (startVertex <0 || startVertex >= this.vertexNum) {
		alert("start Vertex illeagl");
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		alert("end Vertex illeagl");
		return this.commands;
	}
	if(weight <=0 ) {
		alert("weight illeagl");
		return this.commands;
	}
	// 判断这条边是否已经存在
	if (this.directed) {
		if (this.matrix[startVertex][endVertex] ) {
			alert("this edge already exists");
			return this.commands;
		}
	}
	else {
		if (this.matrix[startVertex][endVertex] || this.matrix[endVertex][startVertex]) {
			alert("this edge already exists");
			return this.commands;
		}
	}
	// 添加这个边
	if (withAnimation) {
		this.cmd("SetHighlight", startVertex, true) ;
		this.cmd("SetHighlight", endVertex, true) ;
		this.cmd("Step") ;
		this.cmd("SetHighlight", startVertex, false) ;
		this.cmd("SetHighlight", endVertex, false) ;
		this.cmd("Step") ;
	}
	//this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

	// 有向图
	if (this.directed) {
		this.matrix[startVertex][endVertex] = weight;
		var label1 = (this.showEdgeWeight) ? this.matrix[startVertex][endVertex] : "";
		var label2 = (this.showEdgeWeight) ? this.matrix[endVertex][startVertex] : "";
		// 对于有向图，需要先判断是否已经存在反向的连线
		if (this.matrix[endVertex][startVertex] ) {
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
				directedGraphCurveWithDoubleEdge, this.directed, label1 );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
				directedGraphCurveWithDoubleEdge, this.directed, label2 );
		}
		else {
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, directedGraphCurveWithSingleEdge, this.directed, label1);
		}
	}
	// 无向图
	else {
		this.matrix[startVertex][endVertex] = weight;
		this.matrix[endVertex][startVertex] = weight;
		// var label = (showEdgeWeight.checked) ? weight : "";
		var label = (this.showEdgeWeight) ? weight : "";
		if (startVertex>endVertex) {
			var tmp = startVertex;
			startVertex = endVertex;
			endVertex = tmp;
		}
		// alert("add:"+startVertex+":"+endVertex);
		this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
			undirectedGraphCurve, this.directed, label);
	}
	/* changed */
	this.edgeNum++;
	return this.commands;
}
	
// 删除边
Graph.prototype.delEdge = function() {
	// 传入参数，要删除的边
	var startVertex = arguments[0][0];
	var endVertex = arguments[0][1];
	// 传入参数的合法性判断
	if (startVertex <0 || startVertex >= this.vertexNum) {
		alert("start Vertex illeagl.");
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		alert("end Vertex illeagl.");
		return this.commands;
	}
	// 如果是无向图，需要调整起点和终点
	if (!this.directed && startVertex>endVertex) {
		var tmp = startVertex;
		startVertex = endVertex;
		endVertex = tmp;
	}
	if ( !this.matrix[startVertex][endVertex] ) {	
		alert("this edge do not exists.");
		return this.commands;
	}
	
	this.cmd("SetHighlight", startVertex, true) ;
	this.cmd("SetHighlight", endVertex, true) ;
	this.cmd("Step") ;
	this.cmd("SetHighlight", startVertex, false) ;
	this.cmd("SetHighlight", endVertex, false) ;
	this.cmd("Step") ;
	//this.cmd("Disconnect", startVertex, endVertex);
	// 有向图
	if (this.directed) {
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		if (this.matrix[endVertex][startVertex] ) {
			// var label = (showEdgeWeight.checked) ? this.matrix[endVertex][startVertex] : "";
			var label = (this.showEdgeWeight) ? this.matrix[endVertex][startVertex] : "";
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
					directedGraphCurveWithSingleEdge, this.directed, label);
		}
	}
	else {
		// alert("ready to del:"+startVertex+" "+endVertex);
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		this.matrix[endVertex][startVertex] = 0;
	}
	this.edgeNum--;
	return this.commands;
}


// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
	for(var i=0; i< this.vertexNum; i++) {
		if ( this.matrix[vertex][i] ) {
			var edge = new GraphEdge(vertex,i,this.matrix[vertex][i]);
			return edge;
		}
	}
	return null;	// 该顶点没有邻边
}

Graph.prototype.nextEdge = function (edge) {
	for (var i = edge.endVertex + 1; i<this.vertexNum; i++) {
		if( this.matrix[edge.startVertex][i] ) {
			edge.endVertex = i;
			edge.weight = this.matrix[edge.startVertex][i];
			return edge;
		}
	}
	return null;	// 没有nextEdge
}
// 	清除hint区域
Graph.prototype.clearHintArea = function () {
	if (typeof(this.visited) == 'undefined') {
		return this.commands;
	}
	// alert(this.hintObjectID.length);
	for (var i=0; i<this.hintObjectID.length; i++) {
		if (this.visited[i] ) {
			//this.cmd("Delete", this.hintObjectID[i]);
			try {
				this.cmd("Delete", this.hintObjectID[i]);
			}
			catch(error) {
				// do nothing 
			}
		}
	}
	return this.commands;
}
// DFS
Graph.prototype.DFSTraverse = function(startVertex) {
	// alert("start DFSTraverse()");
	if (startVertex >= this.vertexNum) {
		show_message("输入的顶点应在0-"+(this.vertexNum-1)+"之间",'error');
		return this.commands;
	}
	this.visited = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++ ) {
		this.visited[i] = false;
	}

	this.cmd("CreateHighlightCircle", this.DFSCircleID, 100,50,this.radius);
	this.cmd("SetForegroundColor", this.DFSCircleID, "#FF0000");
	this.cmd("SetBackgroundColor", this.DFSCircleID, '#FFFFFF') ;
	this.cmd("Step");
	this.objectID++;
	this.visitSeq = new Array();

	var count = 0; //用于记录访问到的层数
	var number = 1; // 用于记录是第几个访问的
	for (var i=0; i<this.vertexNum; i++) {
		var toVisit = (startVertex+i)%this.vertexNum;
		if ( !this.visited[toVisit] ) 
			this.DFS(toVisit, -1, count, number);
	}
	var visitSeqStr = "";
	for (var i=0; i<this.visitSeq.length; i++) {
		if (i!= 0) {
			visitSeqStr+=","
		}
		visitSeqStr+=this.visitSeq[i]
	}
	show_notice("DFS遍历顺序是 "+visitSeqStr,'success',0);
	this.cmd("Step");
	this.cmd("Delete", this.DFSCircleID);
	this.cmd("Step");
	return this.commands;
}
// 从fromVertex 找到vertex的
Graph.prototype.DFS = function(vertex, fromVertex, count, number) {
	// number is a bad design, ignore it
	var number = 1;	// number of visited vertex + 1
	for (var i=0; i<this.vertexNum; i++) {
		if (this.visited[i]) 
			number++;
	}
	show_notice("访问顶点"+vertex+"，这是第"+number+"个被访问的顶点，"+"递归深度是"+count,'info');
	this.visited[vertex] = true;
	this.visitSeq.push(vertex);
	this.cmd("CreateRectangle", this.hintObjectID[vertex], "DFS("+vertex+")", 
			this.hintRectWidth, this.hintRectHeight, 'center', 'center', 
			this.hintStartX + count* 80, this.hintStartY + number*(this.hintInterval+this.hintRectHeight));
	this.cmd("SetForegroundColor", this.hintObjectID[vertex], this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintObjectID[vertex], "#FFFFFF");

	this.cmd("SetForegroundColor", this.DFSCircleID, "#FF0000");
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("SetBackgroundColor", this.DFSCircleID, '#FFFFFF') ;

	this.cmd("Move", this.DFSCircleID, this.position[vertex][0], this.position[vertex][1]);
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("SetBackgroundColor",this.circleID[vertex],"#ff9f0f"); // 设置访问过的顶点的颜色
	show_notice("检查顶点<"+vertex+">的相连顶点是否被访问",'info');
	this.cmd("Step");
	// 记录该顶点有没有没有访问的邻节点, 没有为0
	for (var edge = this.firstEdge(vertex); edge!=null; edge = this.nextEdge(edge)) {
		var fromV = edge.startVertex;
		var toV = edge.endVertex;
		if ( !this.directed && fromV > toV) {
			fromV = edge.endVertex;
			toV = edge.startVertex;
		}
		this.cmd("SetLineHighlight", fromV, toV, true);
		this.cmd("Step");
		this.cmd("Step");
		this.cmd("SetLineHighlight", fromV, toV, false);
		this.cmd("Step");
		this.cmd("Step");
		// 找到没有访问的邻节点
		if( !this.visited[edge.endVertex] ) {
			number = this.DFS(edge.endVertex, vertex, count+1, ++number);
		}
	}
	if (fromVertex == -1) {
		show_notice("顶点"+vertex+"的相连顶点访问完成，完成算法",'success');
	}
	else {
		show_notice("顶点"+vertex+"的相连顶点访问完成，退回"+fromVertex,'info');
	}
	this.cmd("Step");
	if ( fromVertex != -1 ) {
		this.cmd("Move", this.DFSCircleID, this.position[fromVertex][0], this.position[fromVertex][1]);
		this.cmd("Step");
		this.cmd("Step");
	}
	return number;
}

export function change_graph_style_js(style) {
	var flag = false;
	if(style=='有向图'){
		flag = true;
	}else{
		flag = false;
	}
	//show_message(flag,'info');	
	currentGraph.directedGraphSwitch(flag);
}
export function creat_graph_js(node_count) {
	currentGraph.vertexNumSelectChangeCallBack(node_count);
    currentGraph.randomGraphCallBack();
}
export function insert_edge_js(start_node,end_node) {
	currentGraph.addEdgeCallBack(start_node, end_node);
}
export function delete_edge_js(start_node,end_node) {
	currentGraph.delEdgeCallBack(start_node,end_node);
}
export function start_traverse_js(start_node) {
	currentGraph.runDFSCallBack(start_node);
}
