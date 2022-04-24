document.getElementById('cars').addEventListener("click", e =>{
    if (e.target.classList.contains('more')){
        let btn = e.target
        let more = e.target.parentElement.querySelector('.description')
        if (more.style.display === 'block'){
            btn.textContent = 'Show More'
            more.style.display = 'none'
        } else {
            btn.textContent = 'Show Less'
            more.style.display = 'block'
        }
    }
})