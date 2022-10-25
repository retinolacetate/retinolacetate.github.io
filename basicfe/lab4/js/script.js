// -------1st task-------
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

const changeColorsById = () => {
  document.getElementById('change_backgrnd1').style.background = random_rgba();
  document.getElementById('change_backgrnd1').style.color = random_rgba();
};

const changeColorsQuerySelector = () => {
  document.querySelector('.change_backgrnd2').style.background = random_rgba();
  document.querySelector('.change_backgrnd2').style.color = random_rgba();
};

// -------2nd task-------
const secondTaskFigure = document.getElementById('task2');
const addBtn = document.getElementById('add_img');
const increaseBtn = document.getElementById('enlarge_size');
const reduceBtn = document.getElementById('reduce_size');
const removeBtn = document.getElementById('delete_img');

const imgElem = document.createElement('img');
imgElem.src = 'img/kyiv_map.jpg';
imgElem.width = 500;
imgElem.height = 500;

function add() {
  secondTaskFigure.appendChild(imgElem);
  addBtn.disabled = true;
  increaseBtn.disabled = false;
  reduceBtn.disabled = false;
  removeBtn.disabled = false;
}

function increase() {
  if (parseInt(imgElem.style.width) > 1000) {
    increaseBtn.disabled = true;
    alert("Ви досягли максимального значення зображення!")
  }
  imgElem.style.width = imgElem.width + 25 + 'px';
  imgElem.style.height = imgElem.height + 25 + 'px';
  reduceBtn.disabled = false;
}

function reduce() {
  if (parseInt(imgElem.style.width) < 300) {
    reduceBtn.disabled = true;
    alert("Ви досягли мінімального значення зображення!")
  }
  imgElem.style.width = imgElem.width - 25 + 'px';
  imgElem.style.height = imgElem.height - 25 + 'px';
  increaseBtn.disabled = false;
}

function remove() {
  secondTaskFigure.querySelector('img')?.remove()
  addBtn.disabled = false;
  increaseBtn.disabled = true;
  reduceBtn.disabled = true;
  removeBtn.disalbed = true;
}
