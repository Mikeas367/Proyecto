import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Params<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;

}

export const useFetch = <T>(url: string): Params<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData }; 
};
