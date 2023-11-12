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
    // cacheTime:1000, //react query k pas power rhta h wo response ko cache kr k rkhta h ar jo bhi hmlg cacheTime denge us time tak data isLoading ko true kr dga as data mera fast show hoga bina isLoading k or loader k;

    // staleTime:15000, // stale means basi, if set it means addition api calling nhi hoga in network for 9s after 9s data fetch hoga , in devtools fresh(ps tk pause rhega, after 9s wo stale ho jyga) bht kamal ka hye(best) tab tak stale data dekh skta h for 9s (isfetching bhi false hoga isme)

    //  refetchOnMount:false || always, (it will refetch on mounting meaning no api calling will done if it is false)


    // refetchOnWindowFocus:true // kuch bhi change kroge on db.json it will refelect trunt on browser by default true rhta h

    // refetchInterval:2000, //every 2sec api request will happen and fetch data, api call for every time period you mention
    // refetchIntervalInBackground:true, even if the background is not in focus

    //polling:fetching data at regular interval

   // enabled:false //not to fire req when component mount


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
