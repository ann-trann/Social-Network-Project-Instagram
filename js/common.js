const getID=(id)=>document.getElementById(id);
const getSL=(selector)=>document.querySelector(selector);


const password=getID("password");
const show_hide_password=getID("show_hide_password");
const imageElement=getSL(".heroImg");
let slideIndex=0;
const IMAGE_DATA=[
    "http://localhost/Social-Network-Project-Instagram/assets/images/logo/1.png",
    "http://localhost/Social-Network-Project-Instagram/assets/images/logo/2.png",
    "http://localhost/Social-Network-Project-Instagram/assets/images/logo/3.png",
    "http://localhost/Social-Network-Project-Instagram/assets/images/logo/4.png",
    
];

if(password){
    show_hide_password.addEventListener("click",function(){
        if(password.type=="password"){
            password.type="text";
            show_hide_password.innerText="Hide";
        }else{
            password.type="password";
            show_hide_password.innerText="Show";
        }
    })

    function showSlides(){
        const slider=()=>{
            slideIndex++;

            imageElement.style.backgroundImage=`url(${IMAGE_DATA[slideIndex]})`;
            if(slideIndex==3) slideIndex = -1;
        }
        let timer=setInterval(slider,3000)

    }
    showSlides()
}
