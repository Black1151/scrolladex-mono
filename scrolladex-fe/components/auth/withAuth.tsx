import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAsyncAction } from "@/hooks/async";
import { checkSession } from "@/store/authSlice";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();
    const isAuthenticated = useSelector(
      (state: any) => state.auth.isAuthenticated
    );

    const [isLoading, setIsLoading] = useState(true);

    const { executeAction: executeCheckSession } = useAsyncAction({
      action: checkSession,
      showSuccess: false,
    });

    useEffect(() => {
      (async () => {
        await executeCheckSession();
        setIsLoading(false);
      })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (!isLoading && isAuthenticated === false) {
        router.replace("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    return isLoading ? null : <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
