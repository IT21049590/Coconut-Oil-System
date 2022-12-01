import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./FinanceNavbar";


function UpdatePaybleD() {
    const[Date,setDate] = useState("");
    const[Description,setDescription] = useState("");
    const[Amount,setAmount] = useState("");

  const { id } = useParams();
  console.log(id);



  const getPaybleD = () => {
    axios
      .get("http://localhost:8889/Paybledebit/get/" +id)
      .then((res) => {

        console.log(res.data);
        
       
        setDate(res.data.Date);
        setDescription(res.data.Description);
        setAmount(res.data.Amount);


        
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getPaybleD();
  }, []);

     //page refresh function

     function refreshPage() {
        window.location.reload(false);
      }

 
      
  return (

    <div>
                    <Navbar/>
                    <div className="order_bground" style={{ zIndex: 98,height:"100vh" }}>
                    <div className="container">
                    <div className='border' >
                    <div className='col-md-8 mt-4 mx-auto'>
                        <h2 className='h4 mb-3 font-weight-normal'><center>Update Payble Debit</center></h2>
                        
                        <form className='needs-validation' 
                         onSubmit={(e) => {
                          e.preventDefault();
                
                          const newPaybleD = {
                           Date,
                           Description,
                           Amount
                          };
                          console.log("Payble debit updated", newPaybleD);
                          axios
                            .put("http://localhost:8889/Paybledebit/update/" +id, newPaybleD)
                            .then(() => {
                              alert("Payble debit updated",refreshPage());
                            })
                            .catch((err) => {
                              alert(err);
                            });
                        }}
                        
                        >
                        

                            <div className='form-group' style={{marginBottom:'15px'}}>
                                <label style={{marginBottom:'5px'}} className="lable">Date</label>
                                <input value={Date} type="date"className="form-control" name='id' placeholder='Enter Date' 
                                onChange={(event)=>{
                                    setDate(event.target.value);

                                }}/>
                            </div>

                            <div className='form-group' style={{marginBottom:'15px'}}>
                                <label style={{marginBottom:'5px'}} className="lable">Description</label>
                                <input value={Description} type="text"className="form-control"name='name'placeholder='Enter description'
                                        onChange={(event)=>{
                                            setDescription(event.target.value);
                            
                                    }}/>
                            </div>

                            <div className='form-group' style={{marginBottom:'15px'}}>
                                <label style={{marginBottom:'5px'}} className="lable">Amount </label>
                                <input value={Amount} type="number"className="form-control"name='amount'placeholder='Enter amount'
                                onChange={(event)=>{
                                    setAmount(event.target.value);
                        
                                }} />
                            </div>

                        

                        

                            <button className='btn btn-success' type='submit' style={{marginTop:'15px'}}>Update</button>

                            <a className='btn btn-danger' href="/displayPayble" style={{marginTop:'15px', marginLeft:'20px'}} > Back</a>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                  </div>
  );
}

export default UpdatePaybleD;