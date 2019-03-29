const topMenu = document.querySelector('.topMenu');
const dropDown = document.querySelector('.dropDown');
topMenu.addEventListener('click',function(e){
    e.preventDefault();
    if(dropDown.style.display == 'block'){
        dropDown.style.display = 'none';
        return
    }
    if(dropDown.style.display == ''){
        dropDown.style.display = 'block';
        return
    }
   
    dropDown.style.display = 'block'
    
    
})
