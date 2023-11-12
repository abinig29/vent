import { useState, useEffect } from "react";
export const useFetch = (api, apiParam, dependancyList) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    try {
      const {
        data: { data },
      } = await api(apiParam);

      setData(data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetch();
  }, [...dependancyList]);
  return { data, loading };
};
