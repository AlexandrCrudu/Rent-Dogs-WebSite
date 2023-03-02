export const fetchDog = async ({
  queryKey,
}: {
  queryKey: [string, number | string];
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`http://localhost:3001/api/v1/dogs/${id}`);

  if (!apiResponse.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiResponse.json();
};

export const fetchAllDogs = async () => {
  const apiResponse = await fetch(`http://localhost:3001/api/v1/dogs`);

  if (!apiResponse.ok) {
    throw new Error(`fetch not ok`);
  }

  return apiResponse.json();
};
