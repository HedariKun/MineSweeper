let canvas, ctx;
let columns = 9, rows = 9;
let mines = 10;
let cells = [];

let selectedCell;

let markedCells = [];
let minedCells = [];
let won = false;

window.onload = ()=>{
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    setUp();
    update();
}

function setUp(){
    cells = [];
    for(let i = 0; i < columns; i++){
        let row = [];
        for(let g = 0; g < rows; g++){
            let x = canvas.width / columns * i;
            let y = canvas.height / rows * g;
            let w = canvas.width / columns;
            let h = canvas.height / rows;
            let c = new cell(x, y, w, h);
            row.push(c);
        }
        cells.push(row);
    }
    minedCells = [];
    markedCells = [];
    for(let i = 0; i < mines; i++){
        setMine();
    }
    
    selectedCell = cells[0][0];
}

function setMine(){
    let i = Math.floor(Math.random() * columns);
    let g = Math.floor(Math.random() * rows);
    let c = cells[i][g];
    if(c.hasMine){
        return setMine();
    } else {
        c.hasMine = true;
        minedCells.push(c);
    }
}

window.onmousemove = (e) => {  
    let i = Math.floor(e.clientX * columns / canvas.width);
    let g = Math.floor(e.clientY * rows / canvas.height);
    if(i >= columns || g >= rows)
        return;
    selectedCell = cells[i][g];
}

window.onmousedown = (e)=>{
    if(e.button != 0) return;
    let i = Math.floor(e.clientX * columns / canvas.width);
    let g = Math.floor(e.clientY * rows / canvas.height);
    if(i >= columns || g >= rows)
        return;
    checkCells(i, g);
    if(selectedCell.hasMine){
        setUp();
    }
    if(won){
        setUp();
    }
    
}

let counter = mines;
window.oncontextmenu = (e)=>{
    e.preventDefault();
    if(!selectedCell.marked){
        let n = false;
        for(let m of markedCells){
            if(m == selectedCell) n = true;
        }
        if(n) return;
        
        if(counter <= 0) return;
        
        counter--;
        selectedCell.marked = true;
        markedCells.push(selectedCell);
    }else{
        for(let m in markedCells){
            if(markedCells[m] == selectedCell){
                markedCells.splice(m, 1);
                counter++;
                selectedCell.marked = false;
            }
        }
    }
    
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillRect(selectedCell.x, selectedCell.y, selectedCell.w, selectedCell.h);

    for(let row of cells){
        for(c of row){
            c.show();
        }
    }

    won = true;
    for(let i of minedCells){
        let n = false;
        for(let g of markedCells){
            if(g == i){
                n = true;
            }
        }
        if(!n){
            won = false;
        }
    }
    if(won){
        console.log("you won");
    }

    requestAnimationFrame(update);

}

function checkCells(i, g){
    if(cells[i][g].checked) return;
    let m = 0;
    if(i-1 >=0){
        m = cells[i-1][g].hasMine ? ++m : m;
    }
    if(i+1 < columns){
        m = cells[i+1][g].hasMine ? ++m : m;
    }
    if(g-1 >=0){
        m = cells[i][g-1].hasMine ? ++m : m;
    }
    if(g+1 < rows){
        m = cells[i][g+1].hasMine ? ++m : m;
    }
    if(i-1 >=0 && g-1 >=0){
        m = cells[i-1][g-1].hasMine ? ++m : m;
    }
    if(i-1 >=0 && g+1 < rows){
        m = cells[i-1][g+1].hasMine ? ++m : m;
    }
    if(i+1 < columns && g-1 >= 0){
        m = cells[i+1][g-1].hasMine ? ++m : m;
    }
    if(i+1 < columns && g+1 < rows){
        m = cells[i+1][g+1].hasMine ? ++m : m;
    }
    cells[i][g].nearMines = m;
    cells[i][g].checked = true;

    if(m == 0){
        if(i-1 >=0){
            checkCells(i-1, g)
        }
        if(i+1 < columns){
            checkCells(i+1, g)
        }
        if(g-1 >=0){
            checkCells(i, g-1)
        }
        if(g+1 < rows){
            checkCells(i, g+1);
        }
        if(i-1 >=0 && g-1 >=0){
            checkCells(i-1, g-1);
        }
        if(i-1 >=0 && g+1 < rows){
            checkCells(i-1, g+1);
        }
        if(i+1 < columns && g-1 >= 0){
            checkCells(i+1, g-1);
        }
        if(i+1 < columns && g+1 < rows){
            checkCells(i+1, g+1);
        }
    }
}
