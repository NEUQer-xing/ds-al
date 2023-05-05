import { Message, Notice } from "view-ui-plus";
function show_notice(notices, type, during_time) {
  let type_zh;
  if (type == "success") {
    type_zh = "成功";
  } else if (type == "error") {
    type_zh = "错误";
  } else if (type == "info") {
    type_zh = "提示";
  } else if (type == "warning") {
    type_zh = "警告";
  }
  var times = during_time == undefined ? 6 : during_time;
  Notice[type]({
    title: type_zh, // 标题
    desc: notices, // 内容
    duration: times, // 持续时间
  });
}
function show_message(content, type, during_time) {
  var times = during_time == undefined ? 0 : during_time;
  Message[type]({
    content: content, // 内容
    duration: times, // 持续时间
    background: true, // 是否显示背景色
    closable: true, // 是否显示关闭按钮
  });
}
var currentPatternMatch;
// 初始化函数
export function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentPatternMatch = new PatternMatch(
    animationManager,
    drawing.width,
    drawing.height
  );
}

// 模式匹配
var PatternMatch = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initAttributes(); // 初始化属性
};

// 继承与构造
PatternMatch.prototype = new Algorithm();
PatternMatch.prototype.constructor = PatternMatch;

// 初始化
PatternMatch.prototype.initAttributes = function () {
  // 逻辑部分
  this.pattern = null;
  this.target = null;
  this.head = -1;
  this.next = null;
  // 图形部分
  this.objectID = 1; // 图形的序号
  this.width = 50; // 矩形的宽度
  this.height = 50; // 矩形的高度
  this.foregroundColor = "#1E90FF"; // 前景色
  this.backgroundColor = "#B0E0E6"; // 背景色
  this.matchedColor = "#32CD32"; // 匹配后的颜色
  this.startX = 250; // 开始的x坐标
  this.startY = 150; // 开始的y坐标
  this.startArrayY = 200; // 开始的数组的y坐标
  this.patterntime = false;
  this.targettime = false;
  this.matchingtime = false;
};

// 模式串回调函数
PatternMatch.prototype.patternCallBack = function (patternStr) {
  var insertValue = patternStr;
  if (insertValue != "") {
    this.implementAction(this.initPattern.bind(this), insertValue);
  }
};
// 目标串回调函数
PatternMatch.prototype.targetCallBack = function (targetStr) {
  var insertValue = targetStr;
  if (insertValue != "") {
    this.implementAction(this.initTarget.bind(this), insertValue);
  }
};
//简单匹配回调函数
PatternMatch.prototype.matchCallBack = function (event) {
  this.implementAction(this.matching.bind(this), 0);
};

// 初始化模式串
PatternMatch.prototype.initPattern = function (pattern) {
  pattern = pattern.trim();
  //清空模式串原有内容
  if (this.patterntime == true) {
    for (var m = 0; m < this.pattern.length; m++) {
      if (this.patternArray[m].value != null) {
        this.cmd("Delete", this.patternArray[m].objectID);
      }
    }
    this.cmd("Step");
  }
  this.pattern = pattern;
  this.patternArray = new Array(this.pattern.length); // 模式串的字符数组
  // 创建状态框
  {
	show_notice("创建目标串"+pattern, "success");
    this.cmd("Step");
  }
  for (var i = 0; i < this.pattern.length; i++) {
    this.patternArray[i] = new ArrayNode(
      this.objectID,
      this.pattern[i],
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY
    );
    // 创建模式串矩形
    {
      this.cmd(
        "CreateRectangle",
        this.patternArray[i].objectID,
        this.patternArray[i].value,
        this.width,
        this.height,
        "center",
        "center",
        this.patternArray[i].x,
        this.patternArray[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.patternArray[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.patternArray[i].objectID, "#FFFFFF");
    }
    this.objectID++;
  }
  this.cmd("Step");
  this.patterntime = true;
  return this.commands;
};
// 初始化目标串
PatternMatch.prototype.initTarget = function (target) {
  target = target.trim();
  //清空目标串原有内容
  if (this.targettime == true) {
    for (var m = 0; m < this.target.length; m++) {
      if (this.targetArray[m].value != null) {
        this.cmd("Delete", this.targetArray[m].objectID);
      }
    }
    this.cmd("Step");
  }
  this.target = target;
  this.targetArray = new Array(this.target.length); // 模式串的字符数组
  // 创建状态框
  {
	show_notice("创建目标串"+target, "success");
    this.cmd("Step");
  }
  for (var i = 0; i < this.target.length; i++) {
    this.targetArray[i] = new ArrayNode(
      this.objectID,
      this.target[i],
      parseInt(this.startX + i * (this.width - 1)),
      this.startArrayY + 100
    );
    // 创建模式串矩形
    {
      this.cmd(
        "CreateRectangle",
        this.targetArray[i].objectID,
        this.targetArray[i].value,
        this.width,
        this.height,
        "center",
        "center",
        this.targetArray[i].x,
        this.targetArray[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.targetArray[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.targetArray[i].objectID, "#FFFFFF");
    }
    this.objectID++;
  }
  this.cmd("Step");
  this.targettime = true;
  return this.commands;
};
// 匹配
PatternMatch.prototype.matching = function () {
  //重置背景色与图形位置
  for (pos = 0; pos < this.pattern.length; pos++) {
    this.cmd("SetBackgroundColor", this.patternArray[pos].objectID, "#FFFFFF");
  }
  this.cmd("Step");
  for (pos = 0; pos < this.target.length; pos++) {
    this.targetArray[pos].x = parseInt(this.startX + pos * (this.width - 1));
    this.targetArray[pos].y = this.startArrayY + 100;
    this.cmd(
      "Move",
      this.targetArray[pos].objectID,
      this.targetArray[pos].x,
      this.targetArray[pos].y
    );
    this.cmd("SetBackgroundColor", this.targetArray[pos].objectID, "#FFFFFF");
  }
  for (var i = 0; i < this.pattern.length - this.target.length + 1; i++) {
    for (var j = 0; j < this.target.length; j++) {
      // 查找对比位置

      this.cmd("SetHighlight", this.patternArray[i + j].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.patternArray[i + j].objectID, false);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", this.targetArray[j].objectID, false);
      this.cmd("Step");

      //若正在匹配的字符不同，匹配失败
      if (this.patternArray[i + j].value != this.targetArray[j].value) {
        if (this.pattern.length - i > this.target.length) {
          {
			show_notice("目标串的第" + parseInt(i + j + 1) +"个字符与模式串的第" +parseInt(j + 1) +"个字符不同", "info");
            this.cmd("Step");
          }
          for (var pos = 0; pos < this.target.length; pos++) {
            this.targetArray[pos].x += this.width - 1;
            this.cmd(
              "Move",
              this.targetArray[pos].objectID,
              this.targetArray[pos].x,
              this.targetArray[pos].y
            );
          }
          //重置背景色
          for (pos = 0; pos < this.pattern.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.patternArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          for (pos = 0; pos < this.target.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.targetArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          break;
        } else {
          // 创建状态框
          {
			show_notice('匹配失败','error');
            this.cmd("Step");
          }
          //重置背景色
          for (pos = 0; pos < this.pattern.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.patternArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          for (pos = 0; pos < this.target.length; pos++) {
            this.cmd(
              "SetBackgroundColor",
              this.targetArray[pos].objectID,
              "#FFFFFF"
            );
          }
          this.cmd("Step");
          return this.commands;
        }
      } else {
        // 创建状态框
        {
		  show_notice("目标串的第" + parseInt(i + j + 1) +"个字符与模式串的第" +parseInt(j + 1) +"个字符相同", "info");
          this.cmd("Step");
        }
        //将已匹配的字符背景色变绿
        this.cmd(
          "SetBackgroundColor",
          this.patternArray[i + j].objectID,
          this.matchedColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.targetArray[j].objectID,
          this.matchedColor
        );
      }
    }
    //匹配成功
    if (j == this.target.length) {
      // 创建状态框
      {
		show_notice("在位置" + (i + 1).toString() + "匹配成功", "success");
        this.cmd("Step");
      }
      break;
    }
    //匹配失败后目标串向后移动一个矩形
  }
  //直到最后仍未出现和目标串相同字符，匹配失败
  if (i == this.pattern.length) {
    // 创建状态框
    {
	  show_notice("匹配失败", "error");
      this.cmd("Step");
    }
  }
  return this.commands;
};

// 节点类
var ArrayNode = function (objectID, value, x, y) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
};

export function creat_mubiao_string_js(mubiao_string){
	var length = mubiao_string.length;
	if(length>25){
		show_message("目标串长度不能超过25",'warning');
	}else{
		currentPatternMatch.targetCallBack(mubiao_string);
	}
}
export function creat_moshi_string_js(moshi_string){
	var length = moshi_string.length;
	if(length>25){
		show_message("模式串长度不能超过25",'warning');
	}else{
		currentPatternMatch.patternCallBack(moshi_string);
	}
}
export function start_search_js(a,b){
	if(a==b==0){
		show_message("请输入目标串和模式串",'error');
	}else{
		currentPatternMatch.matchCallBack();
	}
}