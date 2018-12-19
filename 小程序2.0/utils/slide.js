class Slide {
  constructor(direction) {
    this.direction = direction || "vertical";
    this.initX = 0;
    this.initY = 0;
    this.endX = 0;
    this.endY = 0;
    this.oLeft = 0;
    this.oTop = 0;
  }
  // 触摸获取初始位置坐标
  initPlace(e) {
    this.initX = e.changedTouches[0].pageX;
    this.initY = e.changedTouches[0].pageY;
    this.oLeft = e.currentTarget.offsetLeft;
    this.oTop = e.currentTarget.offsetTop; 
  }
  // 触摸获取结束位置坐标
  endPlace(e, currentNum, domHeight, minDom) {
    this.endX = e.changedTouches[0].pageX;
    this.endY = e.changedTouches[0].pageY;
    return this._comp(currentNum, domHeight, minDom);
  }
  // 触摸计算
  _comp(currentNum, dom,minDom) {
    // 元素相对页面位置
    let differenceX = this.endX - this.initX;
    // let differenceY = this.endY - this.initY;
    let differenceY = this.endY - this.oTop;
    if (this.direction == 'vertical') {
      // currentNum -= parseInt(dom*(differenceY / dom/4));
      currentNum = dom - differenceY;
      // currentNum = dom - differenceY;
    } else {
      currentNum += parseInt(differenceX/6);
    };
    if (currentNum > dom) {
      currentNum = dom;
      return currentNum;
    };
    if (currentNum < minDom) {
      currentNum = minDom;
      return currentNum;
    };
    return currentNum;
  }
  // 点击计算
  clickComp(e, dom){
    let currentNum = 0;
    // 当前点击位置
    let pageX = e.changedTouches[0].pageX;
    let pageY = e.changedTouches[0].pageY;
    // 元素相对页面位置
    let oLeft = e.currentTarget.offsetLeft;
    let oTop = e.currentTarget.offsetTop; 
    if (this.direction == 'vertical') {
      currentNum = (dom - pageY + oTop)*2;
    } else {
      currentNum = pageX - oLeft;
    };
    return currentNum;
  }
}

export { Slide }