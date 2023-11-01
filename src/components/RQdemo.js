import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';


const RQdemo = () => {
    const fetchSuperHeroes = async() => {
    const response = await axios.get("http://localhost:4000/superheroes");
    return response
      };
    const {data: rqdata} =  useQuery('get-demo',fetchSuperHeroes)
    console.log(rqdata, '7878')
  return (
    <div>
     {rqdata?.data.map((demo)=>{
        return (
            <div>{demo.name}</div>
        );
     })}
    </div>
    
  )
}

export default RQdemo
