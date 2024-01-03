import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  alert('请求了')
  return http.request<Result>("get", "/user/getAsyncRoutes");
};
