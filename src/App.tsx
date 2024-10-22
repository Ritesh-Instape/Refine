import React from "react";
import { Refine } from "@refinedev/core";
import { Authprovider } from "./Authprovider";
import { Home } from "./Home";

export default function App() {
  return (
    <Refine authProvider={Authprovider}>
      <Home />
    </Refine>
  );
}
