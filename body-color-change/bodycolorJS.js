document.addEventListener('mousemove', function(e) {

    let x = window.innerWidth
    let y = window.innerHeight
    
    let pageX = e.pageX
    let pageY = e.pageY
    
    document.body.style.backgroundColor = `rgb(${255/(x/pageX)},0,${255/(y/pageY)})`
    
})