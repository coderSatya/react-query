import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SuperHeroesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('')
  useEffect(()=>{
axios.get('http://localhost:4000/superheroes').then((res)=>{
  console.log(res.data, '9999')
setData(res.data);
setIsLoading(false);
}).catch((error)=>{
setError(error.message)
setIsLoading(false)
})
  },[])
  if(isLoading){
    return <h2>Loading...</h2>
  }
  if(error){
    return <h2>{error}</h2>
  }
  return (
    <div>
   <h1>SuperHeroes</h1>   
   {data.map((item, index)=>{
    return (
      <div key={index}>{item.name}</div>
    );
   })}
    </div>
  )
}

export default SuperHeroesPage