// app/actions/fetchUsers.ts
"use server";

import { apiClient } from "../lib/api-client";
import { User } from "@/app/types";

export async function fetchUsers(): Promise<User[]> {
  return apiClient.get<User[]>("/users");
}
