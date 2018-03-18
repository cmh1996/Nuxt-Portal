import SquareFactory from './SquareFactory.js';
class Game{
	constructor(){
		this.nextData = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.gameData = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		this.nextDivs = [];
		this.gameDivs = [];
		this.cur = SquareFactory.prototype.make(2,2);
		this.next = SquareFactory.prototype.make(3,3);
	}

	// 初始化div
    initDiv(container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement("div");
                newNode.className = "none";
                newNode.style.top = (i * 20) + "px";
                newNode.style.left = (j * 20) + "px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }

    //刷新div
    refreshDiv(data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if (data[i][j] == 1) {
                    divs[i][j].className = "done";
                } else if (data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    }

    //判断数据是否合法
    isValid(pos,data){
    	for(let i=0;i<data.length;i++){
    		for(let j=0;j<data[0].length;j++){
    			if(data[i][j]!==0){
    				if(!this.check(pos,i,j)){
    					return false;
    				}
    			}
    		}
    	}
    	return true;
    }

    setData(){
    	for(let i=0;i<this.cur.data.length;i++){
    		for(let j=0;j<this.cur.data[0].length;j++){
    			if(this.check(this.cur.origin,i,j)){
    				this.gameData[this.cur.origin.x+i][this.cur.origin.y+j] = this.cur.data[i][j];
    			}
    		}
    	}
    }

    clearData(){
    	for(let i=0;i<this.cur.data.length;i++){
    		for(let j=0;j<this.cur.data[0].length;j++){
    			if(this.check(this.cur.origin,i,j)){
	    			this.gameData[this.cur.origin.x+i][this.cur.origin.y+j] = 0;
	    		}
    		}
    	}
    }

    //检查点是否合法
    check(pos,x,y){
    	if(pos.x+x<0){
    		return false;
    	}else if(pos.x+x>=this.gameData.length){
    		return false;
    	}else if(pos.y+y<0){
    		return false;
    	}else if(pos.y+y>=this.gameData[0].length){
    		return false;
    	}else if(this.gameData[pos.x+x][pos.y+y]===1){
    		return false;
    	}else{
    		return true;
    	}
    }

    // 把小视窗方块放到游戏里，并生成新的方块
    performNext(type, dir) {
        this.cur = this.next;
        this.setData();
        this.next = SquareFactory.prototype.make(type, dir);
        this.refreshDiv(this.gameData, this.gameDivs);
        this.refreshDiv(this.next.data,this.nextDivs);
    }

    //下到底部固定下来
    fixed(){
    	for (var i = 0; i < this.cur.data.length; i++) {
            for (var j = 0; j < this.cur.data[0].length; j++) {
                if (this.check(this.cur.origin, i, j)) {
                    if (this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] == 2) {
                        this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 1;
                    }
                }
            }
        }
        this.refreshDiv(this.gameData, this.gameDivs);
    }

    //下移
    down(){
    	if(this.cur.canDown(this.isValid.bind(this))){
    		this.clearData();
    		this.cur.down();
	    	this.setData();
	    	this.refreshDiv(this.gameData,this.gameDivs);
	    	return true;
    	}else{
    		return false;
    	}
    }

    //左移
    left(){
    	if(this.cur.canLeft(this.isValid.bind(this))){
    		this.clearData();
    		this.cur.left();
	    	this.setData();
	    	this.refreshDiv(this.gameData,this.gameDivs);
    	}
    }

    //右移
    right(){
    	if(this.cur.canRight(this.isValid.bind(this))){
    		this.clearData();
    		this.cur.right();
	    	this.setData();
	    	this.refreshDiv(this.gameData,this.gameDivs);
    	}
    }

    //旋转
    rotate(){
    	if(this.cur.canRotate(this.isValid.bind(this))){
    		this.clearData();
    		this.cur.rotate();
	    	this.setData();
	    	this.refreshDiv(this.gameData,this.gameDivs);
    	}
    }

    //直接到底
    fall(){
    	while(this.down());
    }

    //消行
    checkClear() {
        let line = 0;
        for (let i = this.gameData.length - 1; i >= 0; i--) {
            let clear = true;
            for (let j = 0; j < this.gameData[0].length; j++) {
                if (this.gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line += 1;
                for (let m = i; m > 0; m--) {
                    for (let n = 0; n < this.gameData[0].length; n++) {
                        this.gameData[m][n] = this.gameData[m - 1][n];
                    }
                }
                for (let n = 0; n < this.gameData[0].length; n++) {
                    this.gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    }

    checkGameOver() {
        let gameOver = false;
        for (let i = 0; i < this.gameData[0].length; i++) {
            if (this.gameData[1][i] === 1) {
                gameOver = true;
            }
        }
        return gameOver;
    }

	init(doms,type,dir){
		let gameDiv = doms.gameDiv;
		let nextDiv = doms.nextDiv;
		this.next = SquareFactory.prototype.make(type,dir);
		this.initDiv(gameDiv,this.gameData,this.gameDivs);
		this.initDiv(nextDiv,this.next.data,this.nextDivs);
		this.refreshDiv(this.next.data,this.nextDivs);
	}
}

export default Game;