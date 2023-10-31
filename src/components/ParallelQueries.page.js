import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFrieds = () => {
  return axios.get("http://localhost:4000/friends");
};
const ParallelQueriesPage = () => {
  const { data: superheroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFrieds);
  return (
    <div>
    ParallelQueriesPage
    </div>
  );
};

export default ParallelQueriesPage;
