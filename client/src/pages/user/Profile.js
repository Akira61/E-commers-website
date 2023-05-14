import React, { useEffect, useState } from 'react'
import Navbar_ from '../components/Navbar'
import { adminUrl } from '../admin/includes/functions/admin.path';
import ProductBox from '../components/productBox';
import { faCartPlus, faComment, faEnvelope, faPerson, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Profile() {
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    
    const [data , setData] = useState([]);
    useEffect(() => {
        const callMe = async () => {// call Promise functions
            const ID = await id();
            const data = await getUser(ID);
            const product  = await userProduct(data);
            const comments = await userComments(data);
        }
        callMe();



        getData()
        async function getData(){
            const req = await fetch("http://localhost:4000/products/visible");
            const res = await req.json();
            console.log(res);
            setData(res);
        }
    },[])

    // user's id
    async function id(){
        return new Promise( (resolve, reject) => {
            fetch("http://localhost:4000/userID",{credentials : "include",})
            .then(res => res.text())
            .then(ID => {
                setUserId(ID);
                resolve(ID);
            })
        })
    }
    // get user info
    async function getUser(ID){
        const res = await fetch(adminUrl.serverHost + `/user/get-user/${ID}`, {
            credentials : 'include'
        });
        const data = await res.json();
        setUserData(data);
        return data;
    }

    //get user products
    async function userProduct(dataProduct){
        console.log(userData)
        const res = await fetch(adminUrl.serverHost + `/products/user-products/${dataProduct.id}`, {
            credentials : 'include'
        });
        const data = await res.json();
        setProducts(data);
    }

    //get user comments
    async function userComments(member_id){
        const res = await fetch(adminUrl.serverHost + `/comments/user-comment/${member_id.id}`, {
            credentials : 'include'
        });
        const data = await res.json();
        if(data){
            return setComments(data);
        }
    }
  return (
    <div>
      <Navbar_/>
        
        <div className='container d-flex align-items-center justify-content-center py-4'>
            <div className="card " style={{maxWidth: '80%'}}>
                    <div className="card-body">
                        {/* <h5 class="card-title">Special title treatment</h5> */}
                        <div className='form g-3'>
                            <h3 className='text-center'>information</h3>
                            <form className='form my-5 row'>
                                <div className='d-flex align-items-center justify-content-center mb-5'><img style={{borderRadius : '50%'}} width='15%' className='img-fluid img-thumbnail' src="https://cdn.salla.sa/customer_profiles/1u9q4iPWS22XXcPVsFK5fTaNHOhgJsG9HvyczXpe.jpeg"/></div>
                                
                                <div className='col-md-6 col-xs-12'>
                                <div class="">
                                        <label class="form-label">Name</label>
                                        <div class="input-group has-validation">
                                        <span style={{borderRadius : '3px'}} class="input-group-text" id="inputGroupPrepend"><FontAwesomeIcon icon={faUser}/></span>
                                        <input style={{borderRadius : '3px'}} readOnly type="text" class="form-control shadow-none" aria-describedby="inputGroupPrepend" value={userData.name} required/>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6 col-xs-12'>
                                    <div class="">
                                        <label  class="form-label">Username</label>
                                        <div class="input-group has-validation">
                                        <span style={{borderRadius : '3px'}} class="input-group-text" id="inputGroupPrepend"><FontAwesomeIcon icon={faEnvelope}/></span>
                                        <input style={{borderRadius : '3px'}} readOnly type="text" class="form-control shadow-none" aria-describedby="inputGroupPrepend" value={userData.username} required/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>  

                            <div className='container d-flex align-items-center justify-content-center'>  
                                <div className='row my-5'>
                                    <div className='mb-5'><h3 className='text-center'>Products</h3></div>
                                    {products.map(item => (
                                        <div className="card mx-3 my-3 col-8 col-lg-4 col-xl-5" style={{width : '18rem', borderRadius: '5px'}}>
                                            <img className="card-img-top" src={`/uploads/${item.fileName}`} alt="image" style={{objectFit : 'cover'}}/>
                                            <div className="card-body py-2">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='card-subtitle'>
                                                {/* <p className="card-text">{item.description}</p> */}
                                                <div className="card-text">{item.price} ر.س </div>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                               </div>
                            
                        </div> 
                    </div>

                    <div className='col-sm-6 my-4 container align-items-center justify-content-center'>
                        <div className='panel panel-default'>
                            <div style={{backgroundColor : '#FFF'}} className='panel-heading panel-header mb-5'>
                                <h3> Latest Comments</h3>
                            </div>
                            <div className='panel-body'>
                            <ul className='list-unstyled latest-users'>
                                {comments.map(comment => (
                                <div className='comment-box'>
                                    <span className=' comment-name'><FontAwesomeIcon icon={faUser}/> {comment.name}</span>
                                    <a className='button btn btn-link float-start  float-end btn-sm'>
                                    <FontAwesomeIcon icon={faCartPlus}/> {comment.product_name}
                                    </a>
                                    <div className='my-3' style={{backgroundColor: "#dfe6e9"}}>
                                        <p className='comment'>{comment.comment}</p>
                                    </div>
                                     
                                </div>
                                ))}
                            </ul>
                            
                            </div>
                        </div>
                </div>
            </div>

        </div>
    </div>
  )
}
