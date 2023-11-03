// select elements
const form = document.getElementById("productForm");
const tbody = document.getElementById("tbody");
const baseUrl = "http://localhost:3000/products";

//fetch  data
async function getData() {
  try {
    const response = await axios.get(baseUrl);
    addProduct(response.data)
  } catch (error) {
    console.log(error);
  }
}

//fill  table
function addProduct(allProduct) {
  tbody.innerHTML=''
  allProduct.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.id}</td>
        <td><img src="${product.productImg}" ></td>
        <td>${product.productName}</td>
        <td>${product.productPrice}₼</td>
        <td>
        <button  id="editBtn" onclick="editProduct(${product.id})">edit</button>
        <button id="deleteBtn" onclick="deleteProduct(${product.id})">delete</button>
        </td>
    `;
    // const deleteBtn=document.getElementById('deleteBtn')
    // const editBtn=document.getElementById('editBtn')

    // deleteBtn.addEventListener('click', () => deleteProduct(${product.id}))

    tbody.appendChild(row)

  });
}



//create product 
document.getElementById('createBtn').addEventListener('click',async(e)=>{
    e.preventDefault()
    async function createProduct() {
        
        const productImgValue=document.getElementById('productImg').value
        const productNameValue=document.getElementById('productName').value
        const productPriceValue=document.getElementById('productPrice').value
    
        try {
            await axios.post(baseUrl,{
                productImg:productImgValue,
                productName:productNameValue,
                productPrice:productPriceValue
            })
            getData()
        } catch (error) {
            console.log(error);
        }
    }
    createProduct()
})


//delete product
async function deleteProduct(productId) {
    try {
        await axios.delete(`${baseUrl}/${productId}`)
        getData()
    } catch (error) {
        console.log(error);
    }
}


//edit
let selectedProductId=null;

async function editProduct(productId) {
    try {
        const response = await axios.get(`${baseUrl}/${productId}`)
        const data=response.data
        document.getElementById('productImg').value=data.productImg
        document.getElementById('productName').value=data.productName
        document.getElementById('productPrice').value=data.productPrice

        selectedProductId=productId
    } catch (error) {
        console.log(error);
    }
}


//update product

document.getElementById('updateBtn').addEventListener("click", async (e)=>{
    e.preventDefault()
    async function updateProduct() {
        if (selectedProductId) {
            try {
                const productImgValue=document.getElementById('productImg').value
                const productNameValue=document.getElementById('productName').value
                const productPriceValue=document.getElementById('productPrice').value
                await axios.put(`${baseUrl}/${selectedProductId}`,{
                    productImg:productImgValue,
                    productName:productNameValue,
                    productPrice:productPriceValue
                })
                getData()
        
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    updateProduct()
})




getData();
