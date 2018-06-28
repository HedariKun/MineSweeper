class cell {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.checked = false;
        this.nearMines = 0;
        this.hasMine = false;
        this.marked = false;
    }

    show(){
        if(this.checked){
            ctx.save();
            ctx.fillStyle = "rgba(150, 151, 151, 1)";
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.restore();
        }
        if(this.marked){
            ctx.fillRect(this.x + this.w/2, this.y+this.h/2, 10, 10);
        } else {
            ctx.fillText(this.nearMines, this.x + this.w/2, this.y+this.h/2);
        }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}