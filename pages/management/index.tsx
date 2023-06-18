import React from "react";
import useAuthStore from "../../lib/Auth/store";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";

const Management = () => {};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      permission: "headline.management",
    },
  };
}

export default Management;
