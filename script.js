const url = "https://striveschool-api.herokuapp.com/api/product/";

let modId = '';
let delId = '';

async function getData(inputValue) {

    fetch(url ,{
        method: "GET",
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YjdkYWQwMDFmMzAwMTk2YWM4ZjgiLCJpYXQiOjE3MDg3NjcxOTUsImV4cCI6MTcwOTk3Njc5NX0.PGZ_QsJFauuwW0XpZE1tEnwyQtnv9q5zcVWyyuyXYPE" },
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
            showItems(data)
    })
    .catch((err) => console.log("problem: ", err));
    }

getData();


function showItems(data)
{   
    let display = document.getElementById("images");
    display.innerHTML = '';
    let i = 1;
    for(d of data)
    {
        let src = d.imageUrl;
        let brand = d.brand;
        let price = d.price;
        let name = d.name;
        let desc = d.description;

        let modClass = "btn btn-warning " + d._id;
        let delClass = "btn btn-danger " + d._id;
        console.log(i + " " + src + " " + brand + " "+ price + " "+ name + " " + desc);
                                                                                                                                                                                                                                                                                                             // <i class="fa-duotone fa-trash" style="--fa-primary-color: #b44646; --fa-secondary-color: #ff0000;"></i>
        display.innerHTML += '<div class="card col-2 m-4" style="width: 18rem;"> <img id="img"+i class="card-img-top" src="'+src+'" alt="404"> <div class="card-body">  <h5 id="title"+i class="card-title prod-title"> '+name+'</h5> <h3 id="brand"+i class="card-title brand-title"> By '+brand+'</h3>       <p> '+desc+' </p> <p> € '+price+' </p>  <a href="#" id="button1"+i onclick="modifyItem(event)" class="'+modClass+'"><i class="fas fa-pencil-alt" style="color: #ffffff;"></i></a>  <a href="#" id="button2"+i onclick="deleteItem(event)" class="'+delClass+'"><i class="fas fa-trash" style="color: #FFFFFF;"></i></a> </div></div>'                           
        i++;
    }
}   

const form = document.getElementById('form');
form.addEventListener('submit', async event => {
event.preventDefault();
})

async function SubmitItem()
{

    let price = document.getElementById("section-price").value;
    let imgUrl = document.getElementById("section-img").value;
    let brand = document.getElementById("section-brand").value;
    let name = document.getElementById("section-name").value;
    let desc = document.getElementById("section-desc").value;
//  let id = document.getElementById("section-id").value;

    let object;
    let method;
    if(modId != ''){
        object =
        {
            "imageUrl": imgUrl,
            "brand": brand,
            "price": price,
            "name": name,
            "description": desc
        } 
        method = "put" ;
    }
    else {
        object =
        {
            "imageUrl": imgUrl,
            "brand": brand,
            "price": price,
            "name": name,
            "description": desc
        } 
        method = "post";
    }

    console.log(object);
    
   

    fetch(url + modId, {
        method: method,      
        headers: { 
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YjdkYWQwMDFmMzAwMTk2YWM4ZjgiLCJpYXQiOjE3MDg3NjcxOTUsImV4cCI6MTcwOTk3Njc5NX0.PGZ_QsJFauuwW0XpZE1tEnwyQtnv9q5zcVWyyuyXYPE" 
        },
        body: JSON.stringify(object)
    })
     .then(resp => {
         return resp.json()
     })
     .then(data => {     
        console.log(data);   
    })
    .catch((err) => console.log("problem: ", err));

    modId = '';
    getData();
}

function modifyItem(event)
{
    console.log(event.target);
    fetch(url ,{
            method: "GET",
            headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YjdkYWQwMDFmMzAwMTk2YWM4ZjgiLCJpYXQiOjE3MDg3NjcxOTUsImV4cCI6MTcwOTk3Njc5NX0.PGZ_QsJFauuwW0XpZE1tEnwyQtnv9q5zcVWyyuyXYPE" },
        })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
            

        for(mod of data)
        {
            if(event.target.classList.contains(mod._id)){
                console.log(mod);
                console.log(event.target);
                let price = document.getElementById("section-price");
                let imgUrl = document.getElementById("section-img");
                let brand = document.getElementById("section-brand");
                let name = document.getElementById("section-name");
                
                price.innerHTML = '';
                console.log(mod.price);
                price.value = mod.price;
                price.style.backgroundColor = "gold";
                imgUrl.value = mod.imgUrl;
                imgUrl.style.backgroundColor = "gold";
                brand.value = mod.brand;
                brand.style.backgroundColor = "gold";
                name.value = mod.name;
                name.style.backgroundColor = "gold";
                modId = mod._id;
            }
                
        }
        console.log(data);
    })
    .catch((err) => console.log("problem: ", err));
}



function deleteItem(event)
{
    let found = false;
    let delId = '';
    console.log(event.target.classList);
    fetch(url ,{
        method: "GET",
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YjdkYWQwMDFmMzAwMTk2YWM4ZjgiLCJpYXQiOjE3MDg3NjcxOTUsImV4cCI6MTcwOTk3Njc5NX0.PGZ_QsJFauuwW0XpZE1tEnwyQtnv9q5zcVWyyuyXYPE" },
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        
        for(d of data)
        {        
            if(event.target.classList.contains(d._id)){
                found = true;
                delId = d._id;
                let idURL = url + delId;
                console.log(idURL);
                fetch(idURL, {
                    method: "DELETE",
                    headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YjdkYWQwMDFmMzAwMTk2YWM4ZjgiLCJpYXQiOjE3MDg3NjcxOTUsImV4cCI6MTcwOTk3Njc5NX0.PGZ_QsJFauuwW0XpZE1tEnwyQtnv9q5zcVWyyuyXYPE" },
                })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                })
 
            }
        }
        delId = '';
        modId = ''
        getData();
    })
    .catch((err) => console.log("problem: ", err));
}