import logo from "./logo.svg";
import "./App.css";
// import { BrowserRouter as Router,Route,Switch, Link, Routes } from 'react-router-dom'
import axios from "axios";
import SuperHeroesPage from "./components/SuperHeroes.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import HomePage from "./components/Home.page";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";

const queryClient = new QueryClient();
function App() {
  axios.interceptors.request.use((request)=>{
    console.log(request,'request');
  })
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/super-heroes">Traditional Super Heroes</Link>
                </li>
                <li>
                  <Link to="/rq-super-heroes">RQ Super Heroes</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/super-heroes" element={<SuperHeroesPage />} />
              <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
              <Route
                path="/rq-super-heroes/:heroId"
                element={<RQSuperHeroPage />}
              />
              <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />

              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
