import { useMutation, useQuery } from "@tanstack/react-query";
import { baseAxios } from "service/axios";

export const useGetUsers = ({ role = "TEACHER", ...arg }) => {
  return useQuery(
    ["USER/VALIDATE_ROLE"],
    () => {
      return baseAxios
        .get(`/admin/users`, {
          params: {
            role,
          },
        })
        .then((resp) => resp.data?.data || []);
    },
    {
      ...arg,
    }
  );
};

export const useApproveTeacher = ({ ...arg }) => {
  return useMutation(
    ["USER/APPROVE_TEACHER"],
    ({ email = "" }) => {
      return baseAxios
        .put(`/admin/approve-teacher`, {
          email,
        })
        .then((resp) => resp.data?.data || []);
    },
    {
      ...arg,
    }
  );
};
