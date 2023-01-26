import React from "react";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import UsersAdmin from "components/admin/users-admin";

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return (
      <div className="center-hv mt-24 mx-16">
        <Button onClick={() => signIn()}>Zaloguj się</Button>
      </div>
    );
  }
  return (
    <div className="mt-24">
      {session?.user.role === "admin" ? (
        <div className="flex mx-4 gap-4">
          <div>
            <Button onClick={() => signOut()}>Wyloguj się</Button>
          </div>
          <div className="flex-grow">
            <UsersAdmin />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-4">Nie masz dostępu do tej strony</h2>
          <Button onClick={() => signOut()}>Wyloguj się</Button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
