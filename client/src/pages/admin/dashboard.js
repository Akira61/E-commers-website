import React, { useEffect, useState } from 'react'
import Header from './includes/components/header'
import Footer from './includes/components/footer'
import { useNavigate } from 'react-router-dom';
import Navbar from './includes/components/Navbar';
import { adminUrl } from './includes/functions/admin.path';
import "./layout/css/dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faClock, faComment, faCommentDots, faCommentMedical, faInfo, faShop, faTag, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faAdd, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { EditMember } from './includes/functions/CRUD.member';
import { isAdmin } from './includes/functions/IsAdmin';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const navigate = useNavigate()
    
    const [userId, setUserId] = useState();
    const [Members, setMembers] = useState();
    const [product, setProduct] = useState();
    const [lastRegistered, setlastRegistered] = useState([]);
    const [lastProducts, setLastProducts] = useState([]);
    const [lastComments, setLastComments] = useState([]);
    useEffect(() =>{
        // title
        document.title = 'Admin';
        //auth()
        // async function auth(){
        //   const response = await fetch(adminUrl.serverHost + '/check-role', {credentials : "include"});
        //   const validation = await response.json();
        //   console.log(validation)
        //   //if user role is 'user'
        //   if(!validation.isAdmin){
        //     return navigate('/');
        //   }
        //   // if user doesn't logged in
        //   else if(!validation.role){
        //     return navigate('/login');
        //   }
        //   return navigate(adminUrl.dashboard); // user is admin
        // };
        
        // check if user logged in
        isAdmin(adminUrl.dashboard,navigate);

        // get user id
          id();
          async function id(){
            const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
            const ID = await response.text();
            setUserId(ID);
          }


        // Members number
          MembersNumber()
          async function MembersNumber(){
            const response = await fetch(adminUrl.serverHost + "/staff/members", {
              credentials : "include"
            });
            const data = await response.json();
            console.log(data)
            if(response.ok){
              setMembers(data.length);
            }
          }

        
        //Products number
          ProductsNumber()
          async function ProductsNumber(){

            const response = await fetch(adminUrl.serverHost + "/products", {
              method : 'GET',
              credentials : 'include'
            });
            const data = await response.json();
            console.log(data);
            setProduct(data.length);
          }

          
        //Last Registered 
          LastUsers()
          async function LastUsers(){
            const response = await fetch(adminUrl.serverHost + "/last-users-added?many=5", {
              credentials : "include"
            });
            const data = response.json();
            data.then(result =>{
              console.log("{".repeat(30),result);
              setlastRegistered(result)         
            })
          }

          //Last Products
          LastProducts()
          async function LastProducts(){
            const response = await fetch(adminUrl.serverHost + "/products/last-products?sort=DESC&limit=5",{
              credentials : 'include'
            });
            const data = await response.json();
            console.log("@".repeat(6), data);
            if(data){
              setLastProducts(data);
            }
          }

          //Latest Comments
          LatestComments()
          async function LatestComments(){
            const response = await fetch(adminUrl.serverHost + "/comments/get-all?limit=5&sort=DESC",{
              credentials: 'include'
            });
            //parse the response
            const data = await response.json();
            console.log(data);
            setLastComments(data);
          }
      },[]);


      // edit products
  async function editProduct(productId){

    //get product information
    const getData = await fetch(`http://localhost:4000/get-product/${productId}`);
    let data = await getData.json();
    console.log(data);
    //get categories
    const response = await fetch(adminUrl.serverHost + "/admin/categories/get-all", {
      credentials : 'include'
    });
    const categories = await response.json();
    
    // aplay info to the alert
    const { value : updatedData } = await Swal.fire({
      title : 'تعديل بيانات المنتج',
      imageUrl: `/uploads/${data.fileName}`,
      imageWidth : '50%',
      showCloseButton: true,
      html : 
      `<form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Auther : <span>${data.member_name}</span></label>
      </div>
        <div class="form-group col-md-6">
          <span>Name :</span> <input type="text" class="form-control" id="name-input" value='${data.name}'>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          Price : <input type="number" min="0" class="form-control" id="price-input" value=${data.price}>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label from='file-input'> Edit Image :</label>
          <input type="file" class="form-control" id="file-input" required>
      </div>
      <div class="form-group col-md-6">
        Description : <textarea class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${data.description}</textarea>
      </div>
      <div class="form-group col-md-6">
      Rating : <select id="rating" class="form-select" aria-label="Default select example">
        <option default hidden>${data.rating}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
      </div>
      <div class="form-group col-md-6">
      Category : <select id="category" class="form-select" aria-label="Default select example">
        <option default hidden>${data.Category_Name}</option>
        ${categories.map((category,i) => (
          `<option catId=${category.id}>${category.Name}</option>`
        ))}
    </select>
      </div>
      <div class="form-group col-md-6">
        <div class="form-check form-switch">
        <input class="form-check-input Visible switch-color" type="checkbox" id="visible-input" ${data.visible?'checked':false}>
        <label class="form-check-label" for="visible-input">Show it in the store?</label>
      </div>
    </form>`,
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value,
          img : document.querySelector('#file-input').files[0],
          description : document.querySelector('textarea').value,
          visible : document.querySelector("#visible-input").checked,
          rating : document.querySelector("#rating").value,
          category : document.querySelector("#category").value,
        }
        
      }
    });

    // send new data to the server
    if(updatedData){

      const formData = new FormData();
        formData.append('name', updatedData.name);
        formData.append('price', updatedData.price);
        formData.append('description', updatedData.description);
        formData.append('fileData', updatedData.img);
        formData.append('visible', updatedData.visible);
        formData.append('rating', updatedData.rating);
        formData.append('category', updatedData.category);

      const response =await fetch(`http://localhost:4000/update-product/${productId}`, {
        method: "PUT",
        credentials : "include",
        // headers: {"Content-Type" : "application/json"},
        // body : JSON.stringify({name : updatedData.name,
        //   price : updatedData.price,
        //   visible : updatedData.visible,
        //   description : updatedData.description,
        //   fileData : updatedData.img,
        //   rating : updatedData.rating,
        //   category : updatedData.category,
        // })
        body : formData,
      });
      const data = await response.text();
      console.log(data);

      Swal.fire({
        icon : 'success',
        title : "تم حفظ التغييرات بنجاح"
      });
    }
  }

  //show comments
  async function commentDetails(product_id){
    const response  = await fetch(adminUrl.serverHost + `/comments/get-one?product_id=${product_id}`, {
      credentials : "include"
    });
    const comments = await response.json();

    const { value : updatedData } = await Swal.fire({
      title : "Product Comments",
      showCloseButton: true,
      html : 
      `<form>
      ${comments.map(comment => (
      `<div class="form-group col-md-6">
          Name :
          <div class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${comment.name}</div>
          Email : 
          <div class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${comment.username}</div>
          Comment : 
           <div class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${comment.comment}</div>
          <hr/>
        </div>`
      ))}
    </form>`,
    });
  }
  return (
    <>
    
        <Navbar />
        <Header />
        
        <h1 className='text-center'>Dashboard</h1>
        <div className='container home-stats text-center'>
          <div className='stat-container'>
          <div className='row '>
            <div className='col-md-3'>
              <div className='stat st-members'>
              <FontAwesomeIcon style={{fontSize: '40px'}} className='member-icon' icon={faUsers}/>
                <div>Total Members</div> <span><a href={adminUrl.manageStaff}>{Members}</a></span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-pendingMembers'>
              <FontAwesomeIcon style={{fontSize: '40px'}} icon={faClock}/>
                <div>pending Clients</div> <span>15</span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-products'>
              <FontAwesomeIcon style={{fontSize: '40px'}} icon={faCartPlus} />
                <div>Total products</div><span><a href={adminUrl.productsDashboard}>{product}</a></span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-comments'>
              <FontAwesomeIcon style={{fontSize: '40px'}} icon={faCommentDots} />
                <div>Total Comments </div><span>300</span></div>
            </div>
          </div>
          </div>
        </div>

        <div className='container latest'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='panel panel-default'>
                <div className='panel-heading panel-header'>
                  <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Latest Registered Users
                </div>
                <div className='panel-body'>
                  <ul className='list-unstyled latest-users'>
                    {lastRegistered.map(user =>(
                      <li>{user.username}<span onClick={() =>EditMember(user.user_id, userId)} className='btn btn-success float-start  float-end btn-sm'>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Eidt</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='panel panel-default'>
                <div className='panel-heading panel-header'>
                  <FontAwesomeIcon icon={faTag}></FontAwesomeIcon> Latest Products
                </div>
                <div className='panel-body'>
                <ul className='list-unstyled latest-users'>
                    {lastProducts.map(product =>(
                      <li>{product.name}<span onClick={() =>editProduct(product.product_id)} className='btn btn-success float-start  float-end btn-sm'>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Eidt</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='panel panel-default'>
                <div className='panel-heading panel-header'>
                  <FontAwesomeIcon icon={faComment}></FontAwesomeIcon> Latest Comments
                </div>
                <div className='panel-body'>
                <ul className='list-unstyled latest-users'>
      
                    {lastComments.map(comment => (
                      <div className='comment-box'>
                        <span className=' comment-name '><FontAwesomeIcon icon={faUser}/> {comment.name}</span>
                        <span onClick={() => commentDetails(comment.product_id)} className='button btn btn-link float-start  float-end btn-sm'>
                        <FontAwesomeIcon icon={faCartPlus}/> {comment.product_name}
                        </span>
                        <p className='comment'>{comment.comment}</p> 
                      </div>
                      
                    ))}
                  </ul>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
    </>
)}
