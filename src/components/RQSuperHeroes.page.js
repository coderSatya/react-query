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
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

import axios from "axios";
import { Link } from "react-router-dom";

const RQSuperHeroesPage = () => {
  //   const {isLoading, data} = useQuery('super-heroes', ()=>{
  // return axios.get('http://localhost:4000/superheroes')
  //   })  // 1st Method

  const onSuccess = (data) => {
    console.log("Perform side effects after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  console.log({ isFetching, isLoading });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  // console.log(data.data, 'data')
  return (
    <div>
      <h1>RQ super hero</h1>
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
