/////////////////////galety
window.onload = function() {
   document.addEventListener("click", documentAction);

   function documentAction(e){
      const targetElement = e.target;
   }

const furniture = document.querySelector('.furniture__body');

if (furniture && !isMobile.any()) {
   const furnitureItems = document.querySelector('.furniture__items');
   const furnitureColumn = document.querySelectorAll('.furniture__column');

   const speed = furniture.dataset.speed;

   let positionX = 0;
   let coordXprocent = 0;

   function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0;
      furnitureColumn.forEach(element =>{
         furnitureItemsWidth += element.offsetWidth;
      });

      const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
      const distX = Math.floor(coordXprocent - positionX);

      positionX = positionX + (distX * speed);
      let position = furnitureDifferent / 200 * positionX;

      furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

      if (Math.abs(distX)>0){
         requestAnimationFrame(setMouseGalleryStyle);
      } else {
         furniture.classList.remove('_init');
      }
   }
   furniture.addEventListener("mousemove", function (e){
      const furnitureWidth = furniture.offsetWidth;

      const coordX = e.pageX - furnitureWidth / 2;

      coordXprocent = coordX / furnitureWidth * 200;
      
      if (!furniture.classList.contains('_init')){
         requestAnimationFrame(setMouseGalleryStyle);
         furniture.classList.add('_init');
      }
   });
}
}