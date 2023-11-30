import { useState } from "react";

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export const useApiHelper = <T>() => {
    const [response,  setResponse] = useState<T|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState();

    const callApi = async (url: string, httpMethod: HttpMethod = 'GET',  body?: any) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: httpMethod,	
                body: body ? JSON.stringify(body) : null
            });
            setResponse(await response.json());
        } catch (error:any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
        
    } 

    return {response, isLoading, error, callApi};
}