let hrs = document.querySelector("#hrs");
let min = document.querySelector("#min");
let sec = document.querySelector("#sec");


setInterval(() => {
    
    setInterval(() => {
        let currentTime = new Date();
        
        // Format hours, minutes, and seconds with leading zero if needed
        hrs.innerHTML = String(currentTime.getHours()).padStart(2, '0');
        min.innerHTML = String(currentTime.getMinutes()).padStart(2, '0');
        sec.innerHTML = String(currentTime.getSeconds()).padStart(2, '0');
        /** If the string is less than 2 characters, it adds "0" at the beginning until 
         * the string is 2 characters long. */
    }, 1000);
})