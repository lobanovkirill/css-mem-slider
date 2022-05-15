const items = document.querySelectorAll('.slider__item');
const controls = document.querySelectorAll('.slider__control');
const texts = document.querySelectorAll('.slider__text');
let activeItem = 1;
let isEnabled = true;

function changeActiveItem(numItem) {
  activeItem = (numItem + items.length) % items.length;
}

function hideItem(cls) {
  isEnabled = false;
  items[activeItem].classList.add(cls);
  texts[activeItem].classList.add(cls);
  items[activeItem].addEventListener('animationend', function () {
    this.classList.remove('active', cls);
  });
  texts[activeItem].addEventListener('animationend', function () {
    this.classList.remove('active', cls);
  });
}

function showItem(cls) {
  items[activeItem].classList.add('next', cls);
  texts[activeItem].classList.add('next', cls);
  items[activeItem].addEventListener('animationend', function () {
    this.classList.remove('next', cls);
    this.classList.add('active');
    isEnabled = true;
  });
  texts[activeItem].addEventListener('animationend', function () {
    this.classList.remove('next', cls);
    this.classList.add('active');
    isEnabled = true;
  });
}

function changeControlItem() {
  controls.forEach((control) => {
    control.classList.remove('active');
  });
  controls[activeItem].classList.add('active');
}

for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener('click', () => {
    if (i > activeItem) {
      if (isEnabled) {
        hideItem('to-left');
        changeActiveItem(i);
        showItem('from-right');
        changeControlItem();
      }
    } else if (i < activeItem) {
      if (isEnabled) {
        hideItem('to-right');
        changeActiveItem(i);
        showItem('from-left');
        changeControlItem();
      }
    }
  });
}
