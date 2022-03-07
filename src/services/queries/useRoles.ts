import { useQuery, useQueryClient } from "react-query";
import { getRoles } from "../cloud-firestore";
import { QUERIES } from "./QUERIES";

export const useRoles = () => {
    const queryClient = useQueryClient();
    return useQuery([QUERIES.ROLES], getRoles, {
        onSuccess: data => {
            data.forEach(role => {
                queryClient.setQueryData([QUERIES.ROLE, role.ref], role)
            })
        }
    })
}