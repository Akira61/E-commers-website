import { faClipboard, faDollar, faEdit, faEnvelope, faEye, faEyeSlash, faFileText, faMoneyBill, faTextHeight, faTextSlash, faTextWidth, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar_ from '../includes/components/Navbar';
import { adminUrl } from '../includes/functions/admin.path';
import Swal from 'sweetalert2';

export default function NewProduct() {
  
  const navigate = useNavigate();
    const [loadImg, setLoadImg] = useState(`https://cdn.icon-icons.com/icons2/1993/PNG/512/frame_gallery_image_images_photo_picture_pictures_icon_123209.png`);
    const [img, setImg] = useState();
    const [name, setName] = useState("Title");
    const [price, setPrice] = useState('0');
    const [desc, setDes] = useState("Description");
    const [rating, setRating] = useState();
    const [category,setCategory] = useState();
    const [visible, setVisible] = useState();
    const [categories, setCategories] = useState([]);;

  useEffect(() => {
    Categories()
  },[])

  //Get categories
    async function Categories(){
      const response = await fetch(adminUrl.serverHost + "/admin/categories/get-all", {
        credentials : 'include'
      });
      const data =  await response.json();
      setCategories(data);
    }
    console.log(categories)
  //End Get categories


  //show image selected 
    const loadFile = function(event) {
      var reader = new FileReader();
      reader.onload = function(){
        setLoadImg(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    };
  //End show image selected 

  // send data
    async function insertData(e){
      
      const formData = new FormData();
        formData.append('productName', name);
        formData.append('price', price);
        formData.append('productDesc', desc);
        formData.append('fileData', img);
        formData.append('rating', rating);
        formData.append('visible', visible);
        formData.append('category', category);
      
      const response = await fetch(adminUrl.serverHost + "/product/new-product", {
        method : "POST",
        credentials : "include",
        body :  formData,
      });
      const data = await response.json();

       //handel server error
       if(data.err_message){
        const res = await Swal.fire({
            icon : 'error',
            title : "unvalid data",
            text : data.err_message,
            showCancelButton : true,
        });        
    } 
    if(data.success){
        //password updated succssfully, fire success popup
        const success = await Swal.fire({
        icon : 'success',
        title : "Product Added"
        })
        // on 'ok' button click
        if(success.isConfirmed){
        // reload the page
        window.location.replace(adminUrl.productsDashboard);
        }
    }
    }
  //End send data

  return (
    <div>

      <Navbar_ />

        <div className='container d-flex align-items-center justify-content-center py-4'>
          <div className="card row" style={{maxWidth: '80%'}}>
                  <div className="card-body">
                      {/* <h5 class="card-title">Special title treatment</h5> */}
                          <h1 className='text-center py-3'>New Proudct</h1>
                      <div className='row '>
                        <div className='col-md-7'>
                          <form className='form my-5'>

                              <div className='py-1'>
                                <div class="">
                                      <label class="form-label">Image</label>
                                      <div class="input-group has-validation">
                                      <input style={{borderRadius : '3px'}} readOnly type="file" class="form-control shadow-none" onChange={(e) => {loadFile(e); setImg(e.target.files[0])}} required/> {/*  */}
                                      </div>
                                </div>
                              </div>
                              <div className='py-1'>
                                <div class="">
                                      <label class="form-label">Name</label>
                                      <div class="input-group has-validation">
                                      <span style={{borderRadius : '3px'}} class="input-group-text" id="inputGroupPrepend"><FontAwesomeIcon icon={faUser}/></span>
                                      <input style={{borderRadius : '3px'}}  type="text" class="form-control shadow-none" aria-describedby="inputGroupPrepend" onChange={(e) => setName(e.target.value)} required/>
                                      </div>
                                </div>
                              </div>
                              <div className='py-1'>
                                <div class="">
                                      <label class="form-label">Price</label>
                                      <div class="input-group has-validation">
                                      <span style={{borderRadius : '3px'}} class="input-group-text" id="inputGroupPrepend"><FontAwesomeIcon icon={faDollar}/></span>
                                      <input style={{borderRadius : '3px'}}  type="text" class="form-control shadow-none" aria-describedby="inputGroupPrepend" onChange={(e) => setPrice(e.target.value)} required/>
                                      </div>
                                </div>
                              </div>
                              <div className='py-1'>
                                <div class="">
                                      <label class="form-label">Description</label>
                                      <div class="input-group has-validation">
                                      <span style={{borderRadius : '3px'}} class="input-group-text" id="inputGroupPrepend"><FontAwesomeIcon icon={faFileText}/></span>
                                      <textarea style={{borderRadius : '3px'}}  type="text" class="form-control shadow-none" aria-describedby="inputGroupPrepend" onChange={(e) => setDes(e.target.value)} required></textarea>
                                      </div>
                                </div>
                              </div>

                              <div class="py-1">
                                <select onChange={(e) => setRating(e.target.value)} id="rating" class="form-select" aria-label="Default select example">
                                  <option default hidden>Rating</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>    

                              <div class="py-1">
                                <select onChange={(e) => setCategory(e.target.value)} id="category" class="form-select" aria-label="Default select example">
                                  <option default hidden>Categories</option>
                                  ${categories.map((category,i) => (
                                    <option catId={category.id}>{category.Name}</option>
                                  ))}
                                </select>  
                              </div>   

                              <div class="form-group mt-4">
                                <div class="form-group form-check form-switch">
                                  <label class="form-check-label" for="visible-input">Visible?</label>
                                  <input class="form-check-input Visible switch-color" type="checkbox" id="visible-input" onChange={(e) => setVisible(e.target.checked)} />
                                </div> 
                              </div> 

                              <div class="form-group">
                                <button type='submit' className='btn btn-primary btn-block' onClick={(e) => insertData(e.preventDefault())}>Save</button>
                              </div>       
                        </form>

                        </div>

                        <div className='col-md-4 mt-5 mx-2'>
                          {/* Live product */} 
                          <div className=' row d-flex align-items-center justify-content-center mb-3'>
                                  <div class="" style={{width : '18rem', borderRadius: '5px'}}>
                                    <div class="card ">
                                      <img src={loadImg} style={{borderRadius: '5px', objectFit:'cover'}}/>
                                      <div class="card-body">
                                        <h5 class="card-title">{name}</h5>
                                        <span>${price}</span>
                                        <p class="card-text">{desc}</p>

                                        </div>
                                      </div>
                                      <div>
                                  </div>  
                                  </div>
                            </div>
                        </div>
                      </div>
                                                  
              </div>
          </div>

        </div>
  </div>
  )
}
