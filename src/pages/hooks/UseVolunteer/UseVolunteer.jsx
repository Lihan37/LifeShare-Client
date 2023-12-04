import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
;

const UseVolunteer = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/volunteer/${user.email}`);
            console.log(res.data);
            return res.data?.volunteer;
        }
    });

    return [isVolunteer, isVolunteerLoading];
};

export default UseVolunteer;
