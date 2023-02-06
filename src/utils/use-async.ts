/*
 * @Description:
 * @Date: 2022-11-18 16:27:03
 * @LastEditTime: 2023-02-06 18:28:49
 */
import { useState, useCallback, useReducer } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  // retry 被调用时重新跑一边run，使得state刷新[project收藏后页面刷新]
  // react的useState惰性初始，换成套娃/使用useRef保存函数。
  // 不然会无限循环
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }

      // 存储函数，但是会无限循环
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // 使用prevState，避免因为usecallback陷入state的无限循环
      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          // 组件已经挂载/未被卸载
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch会消化异常，如果不主动抛出，外面是接收不到的
          // return error修改为return Promise.reject(error);
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时重新跑一边run，使得state刷新
    retry,
    ...state,
  };
};
