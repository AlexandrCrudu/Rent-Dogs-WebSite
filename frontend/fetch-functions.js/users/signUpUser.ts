// import { QueryFunction } from "@tanstack/react-query";

// export const fetchDog: QueryFunction<
//   SignUpUserApiResType,
//   ["dog", string]
// > = async ({ queryKey }) => {
//   const id = queryKey[1];

//   const apiResponse = await fetch(`http://localhost:3001/api/v1/dogs/${id}`);

//   if (!apiResponse.ok) {
//     throw new Error(`details/${id} fetch not ok`);
//   }

//   return apiResponse.json();
// };
