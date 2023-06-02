import axios from "axios";
import { Configuration, DefaultApi } from "./__generated";
import React from "react";

export const useApiClient = () => {
  return React.useMemo(() => {
    const basePath = "/api";
    const authHeaders: Record<string, string> = {};
    const axiosInstance = axios.create({ headers: authHeaders });
    const config = new Configuration({ basePath });
    return new DefaultApi(config, basePath, axiosInstance);
  }, []);
};
