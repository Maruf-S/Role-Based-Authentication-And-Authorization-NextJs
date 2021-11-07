import React from "react";
import { getSession, useSession } from "next-auth/client";
export default function ProtectedPage() {
  const [session, isLoading] = useSession();
  return (
    <div>
      <h1>A protected route.</h1>
      <h3>{isLoading ? `Loading` : JSON.stringify(session)}</h3>
    </div>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
