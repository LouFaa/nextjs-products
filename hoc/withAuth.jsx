"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../common/LoadingScreen";

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const pathName = usePathname();
    const [loading, setLoading] = useState(true);

    const { getUserStateAuth } = useAuth();
    const userState = getUserStateAuth();

    useEffect(() => {
      
      const checkAuth = () => {
        if(pathName === '/'){
          router.push("/products");
        }
        else if (userState && pathName === "/login") {
          router.push("/dashboard/products");
        } else if (!userState && pathName === "/dashboard/products") {
          router.push("/login");
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [pathName, router, userState]);

    return loading ? <LoadingScreen /> : <WrappedComponent {...props} />;
  };

  return Wrapper;
};
