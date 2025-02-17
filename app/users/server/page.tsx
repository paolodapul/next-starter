// app/components/UserList.tsx
import { serverFetcher } from "@/app/lib/server-fetcher";
import { User } from "@/app/types";

export default async function UserList() {
  const users = await serverFetcher.get<User[]>("/users", {}, { revalidate: 10 }); // Revalidates every 10 seconds

  return (
    <ul>
      {users.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
