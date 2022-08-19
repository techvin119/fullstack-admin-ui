import React,{useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import logo from "./../images/admin-logo.jpg";

import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";

function Admin() {

    const[profiles,setProfiles] = useState([])
    const[criteria,setCriteria] = useState('')
    const[error,setError] = useState('') 
    const [value, setValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [idValue, setIdValue] = useState('');
    const [skillValue, setSkillValue] = useState('');
    const [fetch, setFetch] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
     
    const usersPerPage = 1;
    const pageVisited =  pageNumber * usersPerPage
    const pageCount = Math.ceil(profiles.length / usersPerPage)
    const skillReset = 'SELECT SKILL'

    const options = [
        { key: 0, label: 'SELECT SKILL', value: 'SELECT SKILL' },
        { key: 1, label: 'ANGULAR', value: 'ANGULAR' },
        { key: 2, label: 'HTML-CSS-JAVASCRIPT', value: 'HTML-CSS-JAVASCRIPT' },
        { key: 3, label: 'REACT', value: 'REACT' },
        { key: 4, label: 'SPRING', value: 'SPRING' },
        { key: 5, label: 'RESTFUL', value: 'RESTFUL' },
        { key: 6, label: 'HIBERNATE', value: 'HIBERNATE' },
        { key: 7, label: 'GIT', value: 'GIT' },
        { key: 8, label: 'DOCKER', value: 'DOCKER' },
        { key: 9, label: 'JENKINS', value: 'JENKINS' },
        { key: 10, label: 'AWS', value: 'AWS' },
        { key: 11, label: 'SPOKEN', value: 'SPOKEN' },
        { key: 12, label: 'COMMUNICATION', value: 'COMMUNICATION' },
        { key: 13, label: 'APTITUDE', value: 'APTITUDE' }
           
      ];

      useEffect(()=>{

            if(fetch && value.length > 0) {
         
            axios.get(`http://localhost:8083/skill-tracker/api/v1/admin/${criteria}/${value}`)
            .then(response => {
                setProfiles(response.data)
            })
            .catch(error =>{    
               setError(error)
             })
         }},[value])

    const handleChanges = (event) => {
        
        setFetch(true)
        setCriteria(event.target.name)
        setValue(event.target.value)

        switch(event.target.name) {
            case 'prefix':
                setIdValue('')
                setSkillValue(skillReset)
                setNameValue(event.target.value)
                break;
           
            case 'associateId':
                setNameValue('')
                setSkillValue(skillReset)
                setIdValue(event.target.value)
                break;
                
          case 'skill':
                setNameValue('')
                setIdValue('')
                setSkillValue(event.target.value)
                if(event.target.value === skillReset)
                {
                    setFetch(false); 
                    setProfiles([]); 
                }
                break;
        }
      
      };

     const changePage = ({selected}) =>{
         setPageNumber(selected)
     }


      const displayProfile = profiles
      .slice(pageVisited, pageVisited + usersPerPage)
      .map((profile,i) => {
          return (
               <div key={i}className='container admin-container'>
                <div className='row'>
                    <div className='col-4'>
                        <table className='admin-table'>
                        <tbody >  
                            <tr>
                                <th className='admin-th admin-color'>Name</th>
                                <td className='admin-td'>{profile.name}</td>
                            </tr>
                            <tr>
                                <th className='admin-th admin-color'>ID</th>
                                <td  className='admin-td'>{profile.associateId}</td>
                            </tr>
                            <tr>
                                <th className='admin-th admin-color'>Email</th>
                                <td  className='admin-td'>{profile.emailId}</td>
                            </tr>
                            <tr>
                                <th className='admin-th admin-color'>Mobile</th>
                                <td className='admin-td'>{profile.mobileNum}</td>
                            </tr>
                            
                        </tbody>
                        </table>
                    </div>  
                    
                    <div className='col-4 admin-margin-table'>
                        <table className='admin-table'>
                        <tbody > 
                        {profile.techSkills.map((skill,i)=>(      
                            <tr key={i}>
                                <td className='admin-td admin-color'>{skill.skillName}</td>
                                <td className='admin-td'>{skill.skillRange}</td>
                            </tr>
                         ))}
                        </tbody>
                        </table>
                    </div>  
                    
                   
                    <div className='col-4'>
                        <table className='admin-table'>
                        <tbody > 
                        {profile.nonTechSkills.map((skill,i)=>( 
                            <tr key={i}>
                                <td className='admin-td admin-color'>{skill.skillName}</td>
                                <td className='admin-td'>{skill.skillRange}</td>
                            </tr>
                         ))}                              
                        </tbody>
                        </table>
                    </div> 
                    
                </div>
                
            </div>  
  
          )    
 
        })
           
    return(
        <div className='admin-margin'>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                           <img className="admin-logo" src={logo} alt='Admin'/>
                    </div>
                    <div className='col-6 admin-font'>
                        <label className='badge bg-secondary admin-border admin-panel-label'>ADMIN PANEL</label>  
                    </div>
                   
                </div>
            </div>    
            <div className='container'>
                
               <div className='row'> 
                    
                    <div>
                        <label className='badge bg-secondary admin-border admin-search-label admin-font'>SEARCH VALUE</label>
                    </div>  
                    
                    <div className='col-2 admin-font'> 
                            <div>
                                <input className='admin-border' name='prefix' value={nameValue} type="text" onChange = {handleChanges} />
                            </div>
                            <div>
                                <input className='admin-border' placeholder = 'CTS_ _ _' name='associateId'value={idValue} type="text" onChange = {handleChanges} />
                            </div>
                            <div>
                                <select className='admin-border admin-drop' name='skill' value={skillValue} onChange = {handleChanges}>
                                    {options.map((option) => (
                                    <option key={option.key} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                    </div>
                    <div className='col-9 admin-font'> 
                            <div>
                                <label className='badge bg-secondary admin-border admin-name-label' >NAME</label>
                            </div>
                            <div>
                             <label className='badge bg-secondary admin-border admin-associate-label'>ASSOCIATE ID</label>
                            </div>
                            <div>
                             <label className='badge bg-secondary admin-border admin-skill-label'>SKILL</label>
                            </div>
                    </div>
                    
                </div>
            </div>   
                 
            <div className='container admin-container'>
               
               <div>{displayProfile}</div>
               <div className='row'>
                   <div className='col-4'></div>
                        <div className='col-8 page-align '>
                            < ReactPaginate
                                    previousLabel={"← Previous"}
                                    nextLabel={"Next →"}
                                    pageCount={pageCount}
                                    breakLabel = "..."
                                    onPageChange = {changePage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination__link"}
                                    nextLinkClassName={"pagination__link"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"pagination__link--active"} 
                                    renderOnZeroPageCount = {null}                    
                            />
                        </div>
                    </div>
                       
                </div>   
                                  
            
               </div>
            
            
               
    )
                        
}

export default Admin