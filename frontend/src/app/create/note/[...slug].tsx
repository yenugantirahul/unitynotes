import { useRouter } from "next/router";
import React from "react";

const Create = () => {
  const router = useRouter();
  return <p>Post: {router.query.slug}</p>;
};

export default Create;
