//棋子相关
class ChessPiece{
    constructor(i,j,role,ctx){
        this.i = i;
        this.j = j;
        this.role = role;
        this.ctx = ctx;
    }
    //画棋子
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(26+this.i*32,26+this.j*32,15,0,2*Math.PI);
        this.ctx.closePath();
        let gradient = this.ctx.createRadialGradient(
                                                26+this.i*32+2,
                                                26+this.j*32-2,
                                                15,
                                                26+this.i*32+2,
                                                26+this.j*32-2,
                                                0);
        if(this.role===1){
            gradient.addColorStop(0,"#0a0a0a");
            gradient.addColorStop(1,"#636766");
        }else{
            gradient.addColorStop(0,"#d1d1d1");
            gradient.addColorStop(1,"#f9f9f9");
        }
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}

module.exports = ChessPiece;