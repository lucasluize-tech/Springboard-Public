const createButton = $("button");
const createCupcakeForm = $("form");
const deleteButton = $(".delete"); // why this only works inside the browser?

const BASE_URL = '/api/cupcakes'

const showCupcakes = async function(){
    const res = await axios.get(BASE_URL)
    console.log(res)
    
    data = res.data
    
    for(cupcake of data.cupcakes){
        const new_li = $(`
            <li id="cupcake-${cupcake.id}" data-id:"${cupcake.id}">
                <img src="${cupcake.image}" width="50px" height="50px" class="m-3">
                ${cupcake.flavor}
                <button class="delete btn btn-danger" data-id="${cupcake.id}">Delete</button>
                </li>`)
        
        $("ul").append(new_li)
    }
}

const removeCupCakes = () => {
    $('li').remove()    
}



const submitNewCupcake = async function(e){
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
    removeCupCakes();
    showCupcakes();
    // emptyFormInputs;
    $("#flavor").val() = ''
    $("#size").val() =''
    $("#rating").val()=''
    $("image").val()=''
    
}

const deleteCupcake = async function(){
    const id = $(this).data('id')
    await axios.delete(`${BASE_URL}/${id}`)
    removeCupCakes();
    showCupcakes();
}


createButton.click(submitNewCupcake)
deleteButton.click(deleteCupcake) // it does not work , only inside the browser.



showCupcakes();        

        
