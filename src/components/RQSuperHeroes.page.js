import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "./../hooks/useSuperHeroesData";
export const RQSuperHeroes = () => {
  const [name, setName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");

  const handleAddHeroClick = () => {
    console.log({ name, catchPhrase });
    const hero = { name, catchPhrase };

    addHero(hero);
  };
  const onSuccess = (data) => {
    console.log("Sucessful Data Fetching", data);
  };

  const onError = (error) => {
    console.log("Error In Data Fetching", error);
  };
  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    // isLoading :addHeroLoading,
    // isError:addHeroIsError,
    // error:addHeroError,
  } = useAddSuperHeroData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>RQ SuperHeroes</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
        />

        <button onClick={handleAddHeroClick}>Fetch Add</button>
      </div>

      <button onClick={refetch}>Fetch Heros</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
