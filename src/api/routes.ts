import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = (data?: object) => {
  return http.request<Result>("get", "/user/getAsyncRoutes", { data });
};
