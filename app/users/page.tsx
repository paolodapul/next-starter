"use client";

import { useServerQuery } from "@/app/hooks/use-server-query";
import { fetchUsers } from "@/app/actions/fetch-users";
import { User } from "@/app/types";

export default function UserList() {
  const { data: users, error, isPending, refetch } = useServerQuery<User[]>(fetchUsers);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={refetch} disabled={isPending}>
        {isPending ? "Refreshing..." : "Refetch Users"}
      </button>
      <ul>{users?.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
}
