import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const addSuperHero = async (hero)=>{
axios.post('http://localhost:4000/superheroes',hero)

}
export const useSuperHeroesData = (onSuccess, onError, data) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};
export const useAddSuperHeroData = ()=>{
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess : (data,variables,context)=>{
      console.log(data, variables,'00')
      // console.log('ok')
      //  queryClient.invalidateQueries('super-heroes')
      queryClient.setQueryData('super-heroes',oldQueryData=>{
        console.log(oldQueryData, 'oldQueryData')
      
      })
// return {
//   ...oldQueryData,
//   data:[...oldQueryData.data, data.data]
// }
     // })

    }

  })
}