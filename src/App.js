import { useEffect, useState,useMemo } from 'react';//my name is bikram
import './App.css';//my name is manthan
import Student from './Student';

function App(){
  const [student, setStudent] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [oldName, setOldName] = useState("")

  const handleCancel = () => {
    setName("");
    setMobile("");
    setEmail("");
    setCourse("");
    setAge("");
    setShowForm(false);
  };

  const handleAddClick = () => {
    setName("");
    setAge("");
    setMobile("");
    setCourse("");
    setEmail("");
    setShowForm(true);
  };



  async function getdata() {
    try {
      const takeresponse = await fetch ("https://mymeeshoweb.onrender.com/getdatastudent");
      const takedata = await takeresponse.json();
      setStudent(takedata);
    } catch (error) {
      console.error("Error  hjh fetching data:", error);
    }
  }



  useEffect(() => {
    getdata();
  }, []);



  const handleDelet = async (item) => {
    const optionapi = { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    };

      const response = await fetch(`https://mymeeshoweb.onrender.com/deletedatastudent/${item.name}`, optionapi);
      const result = await response.json();

      if (result.data?.deletedCount > 0 || result.deletedCount > 0) {
        getdata();
        alert("data deleted");
      } else {
        alert("data not deleted");
      }
  };



  const handleSave = async () => {
    if (!name || !age || !mobile || !course || !email) {
      alert("Please Fill all the fields");
      return;
    }

    const newrecord = { name, age, mobile, course, email };

    const optionapi = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newrecord)
    };

      const response = await fetch("https://mymeeshoweb.onrender.com/insertdatastudent", optionapi);
      const result = await response.json();
      
      if (result.statuscode === 200) {
        getdata();
        alert("data inserted");
      } else {
        alert("data not inserted");
      }
    };



    const handlePut = (item) => {
      setName(item.name);
      setAge(item.age);
      setMobile(item.mobile);
      setEmail(item.email);
      setCourse(item.course);
      setOldName(item.name);
      setShowForm(true);
    }


    const handleUpdate = async() => {
      if(!name || !age || !mobile || !course || !email)
      {
        alert("Please fill all the fields");
        return;
      }

      const updaterecord = {name, age, mobile, course, email};

      const optionapi = {
        "method": "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updaterecord)
      };

      const response = await fetch(`https://mymeeshoweb.onrender.com/putdatastudent?name=${oldName}`, optionapi);
      const result = await response.json();

       if (result.data?.modifiedCount>0 ) {
      getdata();
      alert("data Updated");
    } else {
      alert("data not Updated");
    }

    }

  return(
    <>
      <h1>Student Record</h1>
      <button onClick={handleAddClick}>Add Student</button>
      {showForm && 
      <>
        <button 
         type="button"
         aria-label="Close" 
         onClick={() => handleCancel()}
        >X Close</button>
        <br></br>
        <label>Name</label>
        <input
         type="text" 
         className="form-control" 
         value={name} 
         onChange={(e) => setName(e.target.value)} 
         placeholder="Enter Name" 
         />
         <label>Age</label>
        <input
         type="text" 
         className="form-control" 
         value={age} 
         onChange={(e) => setAge(e.target.value)} 
         placeholder="Enter age" 
         />
         <label>Mobile</label>
        <input
         type="text" 
         className="form-control" 
         value={mobile} 
         onChange={(e) => setMobile(e.target.value)} 
         placeholder="Enter mobile" 
         />
         <label>Email</label>
        <input
         type="text" 
         className="form-control" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         placeholder="Enter email" 
         />
         <label>Course</label>
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="B.tech">B.tech</option>
         </select>
         <br/>
         <button onClick={handleUpdate}>Update</button>
         <button onClick={handleSave}>Save</button>
         <button onClick={handleCancel}>Cancel</button>
      </>      
      }
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Student data={student} onrowclick={handleDelet} onUpdateclick={handlePut}/>
        </tbody>
      </table>
    </>
  )
}
export default App;