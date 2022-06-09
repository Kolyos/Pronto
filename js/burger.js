"use strict"

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function (){
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());    
   }
};

if (isMobile.any()) {
   document.body.classList.add('_touch');

   let menuArrows = document.querySelectorAll('.header_top_link_lang');
   if(menuArrows.length > 0){
      for (let index = 0; index < menuArrows.length; index++){
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", function(e){
            menuArrow.parentElement.classList.toggle('_active')
         });
      }
   }
} else {
   document.body.classList.add('_pc');
}
//burger
const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.header_body');
if(iconMenu){
   
   iconMenu.addEventListener("click", function(e){
      document.body.classList.toggle('_lock')
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
});
}
const buttonCont = document.querySelector('.products__footer');
const menuBut = document.querySelector('.product__items_1');
if(buttonCont){
   
   buttonCont.addEventListener("click", function(e){
      buttonCont.classList.toggle('_active');
      menuBut.classList.toggle('_active');
});
}


const arrBut = document.querySelector('.arrow_but');
if(buttonCont){
   buttonCont.addEventListener("click", function(e){
      arrBut.classList.toggle('_active');
});
}


window.onload = function (){
   document.addEventListener("click", documentActions);

function documentActions(e){
   if (targetElement.classlist.contains('item-product__button')){
      const productID = targetElement.closest('.product_item').dataset.pid;
      addToCart(targetElement, productID);
      e.parentDefault();
}
}
//addTocard
function addToCart(productButton, productID){
   if (!productButton.classList.contains('_hold')){
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');

      const cart = document.querySelector('.header_top_link_lang');
      const product = document.querySelector(`[data-pid="${productID}"]`);
      const productImage = product.querySelector('.item-product__image');

      const productImageFly = productImage.cloneNode(true);

      const productImageFlyWight = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;
      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;

      productImageFly.setAttribute('class', '_flyImage _ibg');
      productImageFly.style.cssText = 
      `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWight}px;
      heidht: ${productImageFlyHeight}px;
      `;

      document.body.append(productImageFly);

      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlytop = cart.getBoundingClientRect().top;

      productImageFly.style.cssText = 
      `
      left: ${cartFlyLeft}px;
      top: ${cartFlytop}px;
      width: 0px;
      height: 0px;
      opacity:0;
      `;
      productImageFly.addEventListener('transitionend', function () {
         if (productButton.classList.contains('_fly')) {
            productImageFly.remove();
            updateCart(productButton, productId);
            productButton.classList.remove('_fly');
         }
      });
   }
}
}

///popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {

	if (!Element.prototype.closest) {

		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {

	if (!Element.prototype.matches) {

		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

/////////popup_value

const btns = document.querySelectorAll('.counter__btn');

btns.forEach(btn=>{
   btn.addEventListener('click', function(){
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__value');
      const currentValue = +inp.value;
      let newValue;

      if(direction === 'plus'){
         newValue = currentValue + 1;
      } else{
         newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
      }
      inp.value = newValue;
   })
})


function ibg(){

	let ibg=document.querySelectorAll(".image_pronto_bg");
		for (var i = 0; i < ibg.length; i++) {
			if(ibg[i].querySelector('img')){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
			}
		}
	}

ibg();