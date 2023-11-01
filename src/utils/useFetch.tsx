import useSWR from 'swr';


const url = process.env.NEXT_PUBLIC_BACKEND_URL!
const token = process.env.NEXT_PUBLIC_API_KEY!

const fetcher = async (url: string) => {
  const response = await fetch(url, {headers: {Authorization: token}});
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};

const useFetch = (path: string) => {
  const {
    data,
    error
  } = useSWR(`${url}/${path}`, fetcher);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading
  };
};

export default useFetch;