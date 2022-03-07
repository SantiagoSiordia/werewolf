import { useQuery } from "react-query"
import { getRole } from "../cloud-firestore"
import { QUERIES } from "./QUERIES"

export const useRole = (roleRef: string) => {
    return useQuery([QUERIES.ROLE, roleRef], () => getRole(roleRef))
}