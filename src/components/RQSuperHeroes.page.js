// import React from 'react';
// import { useQuery } from 'react-query';
// import axios from 'axios';

// const fetchSuperHeroes = ()=>{
//   return axios.get('http://localhost:4000/superheroes')
// }

// const RQSuperHeroesPage = () => {

// //   const {isLoading, data} = useQuery('super-heroes', ()=>{
// // return axios.get('http://localhost:4000/superheroes')
// //   })  // 1st Method

// const onSuccess = (data)=>{
//   console.log('Perform side effects after data fetching', data)
// }
// const onError = (error)=>{
//   console.log('Perform side effect after encountering error',error)
// }

// const {isLoading, data, isError, error, isFetching, refetch} = useQuery('super-heroes',
// fetchSuperHeroes,
// {
//   // staleTime:0
//   // refetchOnMount:true,
//   // refetchOnWindowFocus:false
//   // refetchInterval:false,
//   // refetchIntervalInBackground:true
//   //  enabled:false
//   onSuccess:onSuccess,
//   onError:onError,
//   select:(data)=>{const superHeroNames = data.data.map((hero)=>hero.name)
//   return superHeroNames
// },
// }
// )
// console.log({isFetching, isLoading})

//   if(isLoading){
//     return <h2>Loading...</h2>
//   }
//   if(isError){
//     return <h2>{error.message}</h2>
//   }

//   // console.log(data.data, 'data')
//   return (
//     <div>
//       <h1>RQ super hero</h1>
//       <button onClick={refetch}>Show Heroes</button>

// {data.map((heroName)=>{
//   return <div key={heroName}>{heroName}</div>
// })}
//     </div>
//   )
// }

// export default RQSuperHeroesPage

import React from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  //   const {isLoading, data} = useQuery('super-heroes', ()=>{
  // return axios.get('http://localhost:4000/superheroes')
  //   })  // 1st Method

  const onSuccess = (data) => {
    console.log("Perform side effects after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };
  const { mutate: addhero } = useAddSuperHeroData();

  const { isLoading, isError, data, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
 
// refetch : when we want to show data on a click

  console.log({  isLoading,isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>; // Query-cache , for the first time when react-query is fired for super-hero key isLoading is set to true and network req sent to fetch the data and fetch data and loading is there but after you again fetch data first it go to cacahe and check whether the data is present or not, if present then it immeditately show the cache data and skip isLoading and data shown is very fast. This is the concept of cache data.
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // console.log(data.data, 'data')
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addhero(hero);
  };
  return (
    <div>
      <h1>RQ super hero</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Show Heroes</button>

      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default RQSuperHeroesPage;
