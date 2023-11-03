import axios, {AxiosResponse} from "axios";
import axiosInstance from "@/utils/lib/axiosInstance";


// @ts-ignore
export const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export const flyIoFetcher = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
}