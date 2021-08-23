const createButton = $("button")
const createCupcakeForm = $("form")

const BASE_URL = '/api/cupcakes'

const showCupcakes = async function(){
    const res = await axios.get(BASE_URL)
    
    for(cupcake of res.cupcakes){
        const new_li = $(`
            <li id=${cupcake.id}>
            ${cupcake.flavor}</li>`)
        
        $("ul").append(new_li)
    }
}

createButton.click(async function(e){
    e.preventDefault()
    // create a new cupcake
    const res = await axios({
      method : 'post',
      url: `${BASE_URL}`,
      data: {
          flavor: $("#flavor").val() ,
          size: $("#size").val(),
          rating: $("#rating").val(),
          image: $("image").val(),
      }
    })
    console.log('created new cupcake')
    showCupcakes();

})

        

        
