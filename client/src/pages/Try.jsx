import axios from "axios";
import { useEffect } from "react";

export default function Try(){
 
    const URL ="http://localhost:8800/api/posts/"
   
    useEffect(() => {
      async function fetchItem() {
        const response = await axios.get(URL);
        console.log(response.data)
       
      }
      fetchItem();
    }, []);
   
    return(
      <>
      <h1>Hello</h1>
      </>
    )
  }