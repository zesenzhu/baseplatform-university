import { useEffect, useState, useMemo, useCallback, useRef } from "react";

export default function useGetList(api, query = {}, initPageData = {}) {
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  /* 保存分页信息 */
  const [pageOptions, setPageOptions] = useState({
    pageIndex: 1,
    pageSize: 10,
    ...initPageData,
  });
  const unMountRef = useRef(false);
  const getList = useCallback(
    async (payload = {}) => {
      if (unMountRef.current) {
        return;
      }
      setLoading(true);
      let data = await api({ ...pageOptions, ...query, ...payload });
      if (data.StatusCode === 200) {
        setData(data.Data);
      } else {
        setData(data.Data || false);
      }
      setLoading(false);
    },
    [api, query, pageOptions]
  );
  useEffect(() => {
    Data && getList({ pageIndex: 1 });
    //   return () => {
    //     unMountRef.current = true;
    //   };
  }, [query]);
  useEffect(() => {
    getList();
    //   return () => {
    //     unMountRef.current = true;
    //   };
  }, [pageOptions]);
  const reloadList = useCallback(
    (params = {}) => {
      getList(params);
    },
    [getList]
  );
  /* 处理分页逻辑 */
  const handerChange = useCallback(
    (options) => {
      return setPageOptions((data) => {
        return { ...data, ...options };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return [Data, handerChange, Loading, reloadList];
}
