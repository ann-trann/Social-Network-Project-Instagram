const getID=(id)=>document.getElementById(id);
const getSL=(selector)=>document.querySelector(selector);


const password=getID("password");
const show_hide_password=getID("show_hide_password");
const imageElement=getSL(".heroImg");
let slideIndex=0;
const IMAGE_DATA=[
    "/Social-Network-Project-Instagram/assets/images/logo/1.png",
    "/Social-Network-Project-Instagram/assets/images/logo/2.png", 
    "/Social-Network-Project-Instagram/assets/images/logo/3.png",
    "/Social-Network-Project-Instagram/assets/images/logo/4.png"     
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


// sidebar-toggle.js

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarToggle();
});

function initializeSidebarToggle() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationBtnSmall = document.getElementById('notification-btn-small');
    const searchBtn = document.getElementById('search-btn');
    const searchBtnSmall = document.getElementById('search-btn-small');
    const sidebar = document.querySelector('.sidebar');
    const sidebarSmall = document.querySelector('.sidebar-small');

    // Mở/đóng sidebar lớn khi nhấp vào notification hoặc search
    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.toggle('active');
        sidebarSmall.classList.remove('active'); // Ẩn sidebar nhỏ khi mở sidebar lớn
    });

    notificationBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        sidebarSmall.classList.toggle('active');
        sidebar.classList.remove('active'); // Ẩn sidebar lớn khi mở sidebar nhỏ
    });

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.toggle('active');
        sidebarSmall.classList.remove('active'); // Ẩn sidebar nhỏ khi mở sidebar lớn
    });

    searchBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        sidebarSmall.classList.toggle('active');
        sidebar.classList.remove('active'); // Ẩn sidebar lớn khi mở sidebar nhỏ
    });
}
