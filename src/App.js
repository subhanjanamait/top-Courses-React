import React, { useEffect,useState } from "react";
import Navbar from "./component/Navbar";
import Filter from "./component/Filter";
import {apiUrl,filterData} from './data';
import Cards from './component/Cards';
import { toast } from "react-toastify";
import Spinner from "./component/Spinner";



const App=()=>{

  const [courses,setCourses]=useState([]);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState(filterData[0].title);

    // fetchdata saare ke saare courses ka data le ke aega
  async function fetchData(){
    setLoading(true);
    try{
      let response=await fetch(apiUrl);
      let output=await response.json();
      //save data into a variable
      // console.log(data);
      setCourses(output.data);
    }
    catch(error){
      toast.error("something went wrong");

    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchData();
  },[]);



  return(
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
      <Navbar/>
      </div>
<div className="bg-bgDark2">
      <div>
        {/* filterdata mujhe  send karna ahii to mai use prop banake send karunga isliye filterData-{filterData} */}
      <Filter filterData={filterData}
      category={category}
      setCategory={setCategory}
      
      />
      </div>

      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {
          loading?(<Spinner/>):(<Cards courses={courses} category={category}/>)
        }
      </div>
    </div>
    </div>
  );
};

export default App;
