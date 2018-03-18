class Square{
	constructor(){
		this.data = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.origin = {
			x:0,
			y:0
		};
		this.dir = 0;
	}

	canRotate(isValid){
		let d = (this.dir+1)%4;
		let test = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		for(let i=0;i<this.data.length;i++){
			for(let j=0;j<this.data[0].length;j++){
				test[i][j] = this.rotates[d][i][j];
			}
		}
		return isValid(this.origin,test);
	}
	canDown(isValid){
		let test = {
			x:this.origin.x+1,
			y:this.origin.y
		};
		return isValid(test,this.data);
	}
	canLeft(isValid){
		let test = {
			x:this.origin.x,
			y:this.origin.y-1
		};
		return isValid(test,this.data);
	}
	canRight(isValid){
		let test = {
			x:this.origin.x,
			y:this.origin.y+1
		};
		return isValid(test,this.data);
	}

	down(){
		this.origin.x = this.origin.x+1;
	}
	left(){
		this.origin.y = this.origin.y-1;
	}
	right(){
		this.origin.y = this.origin.y+1;
	}
	rotate(num){
		if(!num){
			num=1;
		}
		this.dir = (this.dir+num)%4;
		for(let i=0;i<this.data.length;i++){
			for(let j=0;j<this.data[0].length;j++){
				this.data[i][j] = this.rotates[this.dir][i][j];
			}
		}
	}
}

export default Square;