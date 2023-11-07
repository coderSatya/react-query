import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";
const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({url:'/superheroes'}) // example of axios interceptor
};
const addSuperHero = async (hero) => {
  // return await axios.post("http://localhost:4000/superheroes", hero);
  return request({url:'/superheroes', method:'post', data:hero}) // example of axios interceptor
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      console.log(data, "gg");
      // queryClient.invalidateQueries("super-heroes");   // data post hoga ar show hoga par isme problem ye h ki ye get request call krta h ho additional api call hota h
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        // wao this is amazing ab hmara additional api calling bhi nhi hoga kuki hm jo post kr rhe uska response ko hmlg purane data m add kr de rhe jise hm extra api calling se bach rhe
        console.log(oldQueryData.data, "oldQuery");
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
    // onMutate :()=>{}
  });
};
