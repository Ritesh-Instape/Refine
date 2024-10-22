import React from "react";
import { useIsAuthenticated, useGetIdentity, useLogout } from "@refinedev/core";
import { Register } from "./Register";

type Idenprop = {
    email:string
}
export const Home = () => {
    const data1= useIsAuthenticated();
    const data2 = useGetIdentity<Idenprop>();
    const { mutate: logout } = useLogout();

    if (data1.data?.authenticated) {
        return (
            <div>
                <h1>Hello,  {data2.data?.email}</h1>
                <button onClick={() => logout()}>Logout</button>
            </div>
        );
    }

    return <Register />;
};