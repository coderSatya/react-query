import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = ()=>{
  return axios.get('http://localhost:4000/superheroes')
}

const RQSuperHeroesPage = () => {


//   const {isLoading, data} = useQuery('super-heroes', ()=>{
// return axios.get('http://localhost:4000/superheroes')
//   })  // 1st Method

const {isLoading, data, isError, error, isFetching} = useQuery('super-heroes',fetchSuperHeroes, {cacheTime:5000}) 
console.log({isFetching, isLoading})

  if(isLoading){
    return <h2>Loading...</h2>
  }
  if(isError){
    return <h2>{error.message}</h2>
  }
  
  // console.log(data.data, 'data')
  return (
    <div>
      <h1>RQ super hero</h1>
      {data?.data.map((hero)=>{
return (<div key={hero?.name}>{hero?.name}</div>);
      })}
    </div>
  )
}

export default RQSuperHeroesPage
