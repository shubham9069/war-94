import React, { useContext, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import { Accordion, Modal } from 'react-bootstrap'



const AddAdmin = () => {
  const {country_list} = useContext(AuthContext)
    const location = useLocation()
    const [tournamentData,setTournamentData] = useState({status:0,name:"",Mobile:"",Email:"",Family_mobile:"",ip_address:"",designation:"",profile_image:"",indentity_proof:"",salary:"",salaryType:1,manager:"",Commissions:"",under_sub_admin:0,self_tournament:0})
    const {name,status,Mobile,Email,Family_mobile,ip_address,designation,profile_image,indentity_proof,salary,salaryType,manager,Commissions,under_sub_admin,self_tournament} = tournamentData
    const [Country,setCountry] = useState([])
    const [searchCon,setSearchCon] = useState("")

    const [groupModal,setGroupModal] = useState(false)
    const [group_reason_list,setgroup_reason_list] = useState([])

    const handleinput =(e)=>{
      console.log(e.target.value)
      setTournamentData({...tournamentData,[e.target.name]:e.target.value})
    }
    const fileupload = (e)=>{
     
      var file_input = document.getElementById('uploadefile-event4')
      
      file_input.click();
    }
      // to set country data 
      const checkItems=(e)=>{
        if(e.target.checked){
          setCountry([...Country,e.target.value])
        }else{
    
            var data = Country?.filter(element=> element!=e.target.value)
            setCountry(data)
        }
      }
      // to set country data 
      const check_groupList=(e)=>{
        if(e.target.checked){
          setgroup_reason_list([...group_reason_list,e.target.value])
        }else{
    
            var data = group_reason_list?.filter(element=> element!=e.target.value)
            setgroup_reason_list(data)
        }
      }

      
  const debounce = (func, delay) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)  // func.apply(null,args)     
        }, delay)
    }
  }
  const filerSearch = debounce((inputvalue) => setSearchCon(inputvalue.target.value), 300)

    const searchCountry = useMemo(()=>{

      if(!searchCon){
        return country_list
      }
  
      var arr = country_list?.filter((country)=>{
        var countrylow = country?.toLowerCase()
        
        return countrylow.includes(searchCon?.toLowerCase())
      })
      return arr
    },[searchCon])
  return (
    <>
    <div className="event-top padding15rem">
    <span className='span-text-light'>Home </span>
    <span className='span-text-light'> / </span>
    <span className='span-text-dark'> {location?.pathname?.split('/')[1]} </span>

    </div>

    <div className=" padding15rem " style={{backgroundColor:'white',borderRadius:12,margin:'1.5rem 1.5rem'}}>
    <div className="inputwrapper" >
                <p className='span-text-dark' >active Admin</p>
                <span className='span-text-light d-flex align-items-center' style={{flex: 2}}>
                <input  type="checkbox" checked={Number(status)} className='event-toggle' style={{position:'relative',top:0,left:0,marginRight:8}} onChange={(e)=>setTournamentData({...tournamentData,["status"]:e.target.checked? 1:0 })}></input>Active</span>
                
                </div>
                <div className="inputwrapper">
                <p className='span-text-dark' > Name</p>
                <input className="form-input" placeholder='Name' value={name} name="name" onChange={handleinput}></input>
                </div>
                <div className="inputwrapper">
                <p className='span-text-dark' > Email</p>
                <input className="form-input" placeholder='Email' value={Email} name="Email" onChange={handleinput}></input>
                </div>
                <div className="inputwrapper">
                <p className='span-text-dark' > Mobile Number</p>
                <input className="form-input" placeholder='Mobile' value={Mobile} name="Mobile" onChange={handleinput}></input>
                </div>
                <div className="inputwrapper">
                <p className='span-text-dark' > Family Mobile Number </p>
                <input className="form-input" placeholder='Family_mobile' value={Family_mobile} name="Family_mobile" onChange={handleinput}></input>
                </div>

                <div className="inputwrapper">
      <p className='span-text-dark' >Admin Operations Countries</p>
      <div className="dropdown" style={{width:'100%'}}>
      <input className="form-input dropdown-toggle" value={Country} placeholder='Event url' data-bs-toggle="dropdown" aria-expanded="false" style={{width:"100%"}}></input>

      <div className="dropdown-menu country-dropdown">
      
      <input className="form-input w-100" placeholder='search Bar ' onChange={filerSearch}></input>

      <p style={{fontSize:12,color: '#B5B5C3',fontWeight:600,margin:'1.5rem 0 0 0 '}}>country</p>
      <div className="country-countainer d-flex " style={{height:200,overflowY:"auto"}}>


          {searchCountry?.map((data)=>{

            return <div className='d-flex justify-content-between' style={{flex:'1 1 100px'}} >
          <p style={{fontSize:12,margin:0,fontWeight:600}}>{data}</p>
          <input type="checkbox" value={data} checked={Country.includes(data)}  onChange={checkItems}/>
        </div>
          })}
        
      </div>
  </div>
      </div>
      
      </div>

      <div className="inputwrapper">
                <p className='span-text-dark' > Ip Address </p>
                <input className="form-input" placeholder='ip_address' value={ip_address} name="ip_address" onChange={handleinput}></input>
        </div>
      <div className="inputwrapper">
                <p className='span-text-dark' > Desgignation </p>
                <select className="form-input" name="Desgignation" onChange={handleinput}>
                  <option selected hidden >select Desgignation</option>
                </select>
        </div>
        <div className="inputwrapper" style={{alignItems: 'flex-start'}}>
                <p className='span-text-dark' >Profile Img</p>
                <div className="upload-file ">
                {profile_image ? 
                <div className="d-flex align-items-center " style={{flexDirection:'row',gridGap:20,padding:'1.5rem 2rem '}}>
                
<svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setTournamentData({...tournamentData,["profile_image"]:""})}>
<path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M3.55349 9.81276C3.98869 6.51756 6.51757 3.98869 9.81276 3.55349C12.0781 3.2543 14.9119 3 18 3C21.0881 3 23.9219 3.2543 26.1872 3.55349C29.4824 3.98869 32.0113 6.51757 32.4465 9.81276C32.7457 12.0781 33 14.9119 33 18C33 21.0881 32.7457 23.9219 32.4465 26.1872C32.0113 29.4824 29.4824 32.0113 26.1872 32.4465C23.9219 32.7457 21.0881 33 18 33C14.9119 33 12.0781 32.7457 9.81276 32.4465C6.51756 32.0113 3.98869 29.4824 3.55349 26.1872C3.2543 23.9219 3 21.0881 3 18C3 14.9119 3.2543 12.0781 3.55349 9.81276Z" fill="#B5B5C3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4393 12.4393C13.0251 11.8536 13.9749 11.8536 14.5607 12.4393L18 15.8787L21.4393 12.4393C22.0251 11.8536 22.9749 11.8536 23.5607 12.4393C24.1464 13.0251 24.1464 13.9749 23.5607 14.5607L20.1213 18L23.5607 21.4393C24.1464 22.0251 24.1464 22.9749 23.5607 23.5607C22.9749 24.1464 22.0251 24.1464 21.4393 23.5607L18 20.1213L14.5607 23.5607C13.9749 24.1464 13.0251 24.1464 12.4393 23.5607C11.8536 22.9749 11.8536 22.0251 12.4393 21.4393L15.8787 18L12.4393 14.5607C11.8536 13.9749 11.8536 13.0251 12.4393 12.4393Z" fill="#B5B5C3"/>
</svg>

                <img src={typeof profile_image=='string' ? profile_image:URL.createObjectURL(profile_image)} style={{width:70, height:70,borderRadius:6}}></img>
                  <div>
<p className='span-text-light'>{profile_image?.name} <span className='span-text-dark float-end' >100%</span></p>
<div className='progressbar'>
  <div style={{width:200}}/>
</div>
</div>
</div>
:
                <div className="center-div" onClick={fileupload}>
                    <input type='file' hidden id="uploadefile-event4" onChange={(e)=>setTournamentData({...tournamentData,["profile_image"]:e.target.files[0]})}></input>
<svg width="65" height="65" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom:25}}>
<path opacity="0.25" d="M9.875 13.166C9.875 7.7122 14.2962 3.29102 19.75 3.29102H51.868C54.487 3.29102 56.9987 4.33141 58.8507 6.18334L66.2327 13.5654C68.0846 15.4173 69.125 17.929 69.125 20.548V65.8327C69.125 71.2865 64.7038 75.7077 59.25 75.7077H19.75C14.2962 75.7077 9.875 71.2865 9.875 65.8327V13.166Z" fill="#00A3FF"/>
<path d="M49.375 6.22654C49.375 4.6053 50.6893 3.29102 52.3105 3.29102C54.6462 3.29102 56.8862 4.21885 58.5377 5.8704L66.5456 13.8783C68.1972 15.5299 69.125 17.7698 69.125 20.1055C69.125 21.7267 67.8107 23.041 66.1895 23.041H52.6667C50.8487 23.041 49.375 21.5673 49.375 19.7493V6.22654Z" fill="#00A3FF"/>
<path d="M38.2387 29.8748C37.8505 30.0354 37.4867 30.2735 37.1711 30.5891L27.2961 40.4641C26.0107 41.7496 26.0107 43.8338 27.2961 45.1192C28.5816 46.4047 30.6658 46.4047 31.9513 45.1192L36.207 40.8635V55.9583C36.207 57.7763 37.6808 59.25 39.4987 59.25C41.3166 59.25 42.7904 57.7763 42.7904 55.9583V40.8635L47.0461 45.1192C48.3316 46.4047 50.4158 46.4047 51.7013 45.1192C52.9867 43.8338 52.9867 41.7496 51.7013 40.4641L41.8263 30.5891C40.8564 29.6192 39.4318 29.3811 38.2387 29.8748Z" fill="#00A3FF"/>
</svg>

<p className="span-text-dark" style={{marginBottom:0}}> Quick File Uploader</p>
<p className="span-text-light" style={{marginBottom:0}}> Drag & Drop or choose files from computer</p>
<p ></p>

                </div>
                }
                
                </div>
                </div>

                <div className="inputwrapper" style={{alignItems: 'flex-start'}}>
                <p className='span-text-dark' >Govt identity proof</p>
                <div className="upload-file ">
                {indentity_proof ? 
                <div className="d-flex align-items-center " style={{flexDirection:'row',gridGap:20,padding:'1.5rem 2rem '}}>
                
<svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setTournamentData({...tournamentData,["indentity_proof"]:""})}>
<path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M3.55349 9.81276C3.98869 6.51756 6.51757 3.98869 9.81276 3.55349C12.0781 3.2543 14.9119 3 18 3C21.0881 3 23.9219 3.2543 26.1872 3.55349C29.4824 3.98869 32.0113 6.51757 32.4465 9.81276C32.7457 12.0781 33 14.9119 33 18C33 21.0881 32.7457 23.9219 32.4465 26.1872C32.0113 29.4824 29.4824 32.0113 26.1872 32.4465C23.9219 32.7457 21.0881 33 18 33C14.9119 33 12.0781 32.7457 9.81276 32.4465C6.51756 32.0113 3.98869 29.4824 3.55349 26.1872C3.2543 23.9219 3 21.0881 3 18C3 14.9119 3.2543 12.0781 3.55349 9.81276Z" fill="#B5B5C3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4393 12.4393C13.0251 11.8536 13.9749 11.8536 14.5607 12.4393L18 15.8787L21.4393 12.4393C22.0251 11.8536 22.9749 11.8536 23.5607 12.4393C24.1464 13.0251 24.1464 13.9749 23.5607 14.5607L20.1213 18L23.5607 21.4393C24.1464 22.0251 24.1464 22.9749 23.5607 23.5607C22.9749 24.1464 22.0251 24.1464 21.4393 23.5607L18 20.1213L14.5607 23.5607C13.9749 24.1464 13.0251 24.1464 12.4393 23.5607C11.8536 22.9749 11.8536 22.0251 12.4393 21.4393L15.8787 18L12.4393 14.5607C11.8536 13.9749 11.8536 13.0251 12.4393 12.4393Z" fill="#B5B5C3"/>
</svg>

                <img src={typeof indentity_proof=='string' ? indentity_proof:URL.createObjectURL(indentity_proof)} style={{width:70, height:70,borderRadius:6}}></img>
                  <div>
<p className='span-text-light'>{indentity_proof?.name} <span className='span-text-dark float-end' >100%</span></p>
<div className='progressbar'>
  <div style={{width:200}}/>
</div>
</div>
</div>
:
                <div className="center-div" onClick={fileupload}>
                    <input type='file' hidden id="uploadefile-event4" onChange={(e)=>setTournamentData({...tournamentData,["indentity_proof"]:e.target.files[0]})}></input>
<svg width="65" height="65" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom:25}}>
<path opacity="0.25" d="M9.875 13.166C9.875 7.7122 14.2962 3.29102 19.75 3.29102H51.868C54.487 3.29102 56.9987 4.33141 58.8507 6.18334L66.2327 13.5654C68.0846 15.4173 69.125 17.929 69.125 20.548V65.8327C69.125 71.2865 64.7038 75.7077 59.25 75.7077H19.75C14.2962 75.7077 9.875 71.2865 9.875 65.8327V13.166Z" fill="#00A3FF"/>
<path d="M49.375 6.22654C49.375 4.6053 50.6893 3.29102 52.3105 3.29102C54.6462 3.29102 56.8862 4.21885 58.5377 5.8704L66.5456 13.8783C68.1972 15.5299 69.125 17.7698 69.125 20.1055C69.125 21.7267 67.8107 23.041 66.1895 23.041H52.6667C50.8487 23.041 49.375 21.5673 49.375 19.7493V6.22654Z" fill="#00A3FF"/>
<path d="M38.2387 29.8748C37.8505 30.0354 37.4867 30.2735 37.1711 30.5891L27.2961 40.4641C26.0107 41.7496 26.0107 43.8338 27.2961 45.1192C28.5816 46.4047 30.6658 46.4047 31.9513 45.1192L36.207 40.8635V55.9583C36.207 57.7763 37.6808 59.25 39.4987 59.25C41.3166 59.25 42.7904 57.7763 42.7904 55.9583V40.8635L47.0461 45.1192C48.3316 46.4047 50.4158 46.4047 51.7013 45.1192C52.9867 43.8338 52.9867 41.7496 51.7013 40.4641L41.8263 30.5891C40.8564 29.6192 39.4318 29.3811 38.2387 29.8748Z" fill="#00A3FF"/>
</svg>

<p className="span-text-dark" style={{marginBottom:0}}> Quick File Uploader</p>
<p className="span-text-light" style={{marginBottom:0}}> Drag & Drop or choose files from computer</p>
<p ></p>

                </div>
                }
                
                </div>
                </div>   
       <div className="inputwrapper">
                <p className='span-text-dark' >Admin Salary/Income Type</p>
                <select className="form-input" name="salaryType" onChange={handleinput}>
                  <option selected={salaryType==1} value={1} >Fixed Salary</option>
                  <option selected={salaryType==2} value={2} >Commission On Tournament</option>
                </select>
        </div>
        {salaryType==1 ?
        <> <div className="inputwrapper">
                <p className='span-text-dark' > Salary</p>
                <input className="form-input" placeholder='salary' value={salary} name="salary" onChange={handleinput}></input>
        </div>         
       <div className="inputwrapper">
                <p className='span-text-dark' >Account Manager</p>
                <select className="form-input" name="manager" onChange={handleinput}>
                  <option selected hidden >Vikash kumar </option>
                </select>
        </div>
        </>:
        <>
        <div className="inputwrapper">
                <p className='span-text-dark' >Enter Commissions (In %)</p>
                <input className="form-input" placeholder='Commissions' value={Commissions} name="Commissions" onChange={handleinput}></input>
        </div>
        <div className="inputwrapper" >
                <p className='span-text-dark' >Under Sub Admin</p>
                <span className='span-text-dark d-flex align-items-center' style={{flex: 2,fontWeight:600}}>
                <input  type="checkbox" checked={Number(under_sub_admin)} className='event-toggle' style={{position:'relative',top:0,left:0,marginRight:8}} onChange={(e)=>setTournamentData({...tournamentData,["under_sub_admin"]:e.target.checked? 1:0 })}></input>disabled</span>
                
                </div>
        <div className="inputwrapper" >
                <p className='span-text-dark' >Create self tournaments</p>
                <span className='span-text-dark d-flex align-items-center' style={{flex: 2,fontWeight:600}}>
                <input  type="checkbox" checked={Number(self_tournament)} className='event-toggle' style={{position:'relative',top:0,left:0,marginRight:8}} onChange={(e)=>setTournamentData({...tournamentData,["self_tournament"]:e.target.checked? 1:0 })}></input>disabled</span>
                
         </div>
       
        </>
          }
          <div className="inputwrapper" >
                <p className='span-text-dark' style={{alignSelf:'flex-start'}}>Add Group</p>
                <div style={{flex:2}}>
                  <button className='themeButton' style={{background:"#F6C000"}} onClick={()=>setGroupModal(true)} >
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M5.17961 1.8761C3.44048 2.10579 2.10579 3.44048 1.8761 5.17961C1.7182 6.37522 1.58398 7.87083 1.58398 9.50065C1.58398 11.1305 1.7182 12.6261 1.8761 13.8217C2.10579 15.5608 3.44048 16.8955 5.17961 17.1252C6.37522 17.2831 7.87083 17.4173 9.50065 17.4173C11.1305 17.4173 12.6261 17.2831 13.8217 17.1252C15.5608 16.8955 16.8955 15.5608 17.1252 13.8217C17.2831 12.6261 17.4173 11.1305 17.4173 9.50065C17.4173 7.87083 17.2831 6.37522 17.1252 5.17961C16.8955 3.44048 15.5608 2.10579 13.8217 1.8761C12.6261 1.7182 11.1305 1.58398 9.50065 1.58398C7.87083 1.58398 6.37522 1.7182 5.17961 1.8761Z" fill="#E8FFF3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49935 13.4577C9.93657 13.4577 10.291 13.1032 10.291 12.666V10.291H12.666C13.1032 10.291 13.4577 9.93657 13.4577 9.49935C13.4577 9.06212 13.1032 8.70768 12.666 8.70768H10.291V6.33268C10.291 5.89546 9.93657 5.54102 9.49935 5.54102C9.06212 5.54102 8.70768 5.89546 8.70768 6.33268V8.70768H6.33268C5.89546 8.70768 5.54102 9.06212 5.54102 9.49935C5.54102 9.93657 5.89546 10.291 6.33268 10.291H8.70768V12.666C8.70768 13.1032 9.06212 13.4577 9.49935 13.4577Z" fill="#E8FFF3"/>
</svg>
Add group</button>
            <div className="upload-file " style={{marginTop:'1.3rem',width:'100%'}} >
            <div className="flex-row " style={{gridGap:10,borderColor:'#F6C000',background:"#FFF8DD",width:'100%'}}>
          <p style={{borderRadius:6,background:'white',padding:10,border:'1px solid #5E6278',fontSize:13,color:"#5E6278"}}>Customer Support <i class="bi bi-x-circle-fill" style={{color:"#F1416C",fontSize:15,marginLeft:8}}></i></p>
          
            </div>
            </div>
                </div>
                
         </div>

          <div className="inputwrapper" >
                <p className='span-text-dark' ></p>
                
                  <button className='themeButton' >Save Changes</button>
         </div>      
    </div>

    <Modal show={groupModal} onHide={()=>setGroupModal(false)} size="lg">
        <Modal.Header >
          <div className="between-div" style={{width:'100%'}}>
          
          <p style={{fontWeight:600}}>Add group </p>
          <button className='themeButton'>save</button>
          </div>
        </Modal.Header>
        <Modal.Body>
        <div className="inputwrapper">
                <p className='span-text-dark' >Enter Commissions (In %)</p>
                <input className="form-input" placeholder='Commissions' value={Commissions} name="Commissions" onChange={handleinput}></input>
        </div>

        <div className="d-flex justify-content-center" style={{gridGap:10}}>

        <div className="subadmin-grouplist" style={{borderRadius: 6}}>
          <p> Available list </p>
          <Accordion style={{background:'transparent',flex:1,margin:'1rem '}} >
      <Accordion.Item eventKey="0" style={{margin:'1rem 0 ',borderRadius:6,}}>
        <Accordion.Header style={{color:"#2884EF"}}>Live Chat</Accordion.Header>
        <Accordion.Body>
         
        {[...Array(4)]?.map((data)=>{

return <div className='d-flex ' style={{flex:'1 1 100px',gridGap:5,margin:"5px 0"}} >
<input type="checkbox" value={1}   onChange={check_groupList}/>
<p style={{fontSize:12,margin:0,color:"#3F4254"}}>suport chat with customer </p>
</div>
})}
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1" style={{margin:'1rem 0 ',borderRadius:6}}>
        <Accordion.Header style={{color:"#2884EF"}}>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
         asdf
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div className='d-flex' style={{gridGap:10,background:"transparent",padding:'1rem'}}>
    <button className='themeButton'>Add</button>
    <button className='themeButton' style={{background:'#F1416C'}}>Add All</button>
    </div>
        </div>



        <div className="subadmin-grouplist" style={{borderRadius: 6}}>
          <p style={{background:"#00A3FF",color:'white'}}> selected list </p>
          <Accordion style={{background:'transparent',flex:1,margin:'1rem '}} >
      <Accordion.Item eventKey="0" style={{margin:'1rem 0 ',borderRadius:6,}}>
        <Accordion.Header style={{color:"#2884EF"}}>Live Chat</Accordion.Header>
        <Accordion.Body>
         sdfcv
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1" style={{margin:'1rem 0 ',borderRadius:6}}>
        <Accordion.Header style={{color:"#2884EF"}}>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
         asdf
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div className='d-flex' style={{gridGap:10,background:"transparent",padding:'1rem'}}>
    <button className='themeButton' style={{background:"#FFF5F8",color:"#F1416C"}}>remove</button>
    <button className='themeButton' style={{color:'#F1416C',background:"white"}}>remove All</button>
    </div>
        </div>
        



        </div>

        </Modal.Body>
       
      </Modal>
        
    </>
  )
}

export default AddAdmin