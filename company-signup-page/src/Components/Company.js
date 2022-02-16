import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_Companies } from "../index";

export default function Company() {
  const { loading, error, data } = useQuery(ALL_Companies);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(error);
  return (
    <div>
      {/* {data.getCompanies.map((company) => {
        return <h1 key={company.id}>{company.company_name}</h1>;
      })} */}
    </div>
  );
}
