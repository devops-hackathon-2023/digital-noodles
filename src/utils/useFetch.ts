import useSWR from 'swr';
import {PageResponseSasResponse, SasResponse} from "@/utils/types";


const url = process.env.NEXT_PUBLIC_BACKEND_URL!
const token = process.env.NEXT_PUBLIC_API_KEY!

const fetcher = async (url: string) => {
  const response = await fetch(url, {headers: {Authorization: token}});
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};

const useFetch = <T>(path: string) => {
  const {
    data,
    error,
    isLoading
  } = useSWR(`${url}/${path}`, fetcher);

  return {
    data: data as T,
    error,
    isLoading
  };
};

export default useFetch;