import React from "react";
import "../../../styles/_colors.scss";
import "../../../styles/_fonts.scss";
import { gql, useQuery } from "@apollo/client";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import { UPDATE_COMPANY } from "../../../graphQL/Mutations";

export default function CompanyProfile() {
  return (
    <div style={{ height: "100%", width: "100vw", backgroundColor: "#C9cbfb" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        Company Profile (placeholder)
      </h1>
    </div>
  );
}
