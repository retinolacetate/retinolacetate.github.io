const table = document.querySelector('.table');

let counter = 1;

const createTable = () => {
    for (let i = 0; i < 6; i ++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            cell.innerHTML = counter;
            cell.id = counter
            row.appendChild(cell);
            counter++;
        }
        table.appendChild(row);
    }
}

createTable();

const mainCell = 16;
const selectedCell = document.getElementById(mainCell);


const randomizeColor = () => {
    let color1 = Math.floor(Math.random()*255);
    let color2 = Math.floor(Math.random()*255);
    let color3 = Math.floor(Math.random()*255);
    return `rgb(${color1}, ${color2}, ${color3})`;
}


selectedCell.addEventListener('mouseover', (e) => {
    selectedCell.style.background = randomizeColor();
});

selectedCell.addEventListener('click', (e) => {
    let selectedColor = document.getElementById('colors').value;
    selectedCell.style.background = selectedColor;
});

let arr = [19, 20, 21, 25, 26, 27, 31, 32,33];

selectedCell.addEventListener('dblclick', (e) => {
    let selectedColor = document.getElementById('colors').value;
    for (let i = mainCell; i <= 36; i++) {
        if(!arr.includes(i)){
            const curEl = document.getElementById(i);
            curEl.style.background = selectedColor;
        }
    }
});
