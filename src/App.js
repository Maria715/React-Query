import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RQSuperHeroes } from "./components/RQSuperHeroes.page";
import { SuperHeroes } from "./components/SuperHeroes.page";
import { RQSuperHero } from "./components/RQSuperHero.page";
import { ParallelQueries } from "./components/ParallelQueries.page";
import { DependentQueries } from "./components/DependentQueries";
import { PaginatedQueries } from "./components/PaginatedQueries";
import { InfiniteQueries } from "./components/InfiniteQueries";
import { DynamicParallelQueries } from "./components/DynamicParallelQueries.page";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/super-heroes">SuperHeroes </Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQSuperHeroes </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries heroIds={[1, 2, 3]} />}
            />

            <Route
              path="/rq-dependent"
              element={<DependentQueries email="mariarajakimail@gmail.com" />}
            />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="/super-heroes" element={<SuperHeroes />} />

            <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialISOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
