import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
const fetchSuperQuery = () => {
  return request({ url: "/superheroes" });
};

const useAddSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperQuery, {
    onSuccess,
    onError,

    // select: (data) => {
    //   return data.data.map((hero) => hero.name);
    // },
    // enabled: false,
    // refetchInterval: 2000,
    // refetchIntervalInBackground:true,
    //refetchOnMount: true,
    //refetc   honWindowFocus: true,
    //cacheTime: 50000,
    // staleTime: 30000,
  });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(useAddSuperHero, {
    //Optimistic Updates
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },

    //!handling mutation responses
    // onSuccess: (data) => {
    //   // queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //   //   return {
    //   //     ...oldQueryData,
    //   //     data: [...oldQueryData.data, data.data],
    //   //   };
    //   // });
    //   //! query invalidations
    //   //queryClient.invalidateQueries("super-heroes");
    // },
  });
};
