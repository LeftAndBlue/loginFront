import { get, post, delete1, put } from "./request";
import type { User } from "@/types/index";

export const CheckLoginInfo = (UserIndo: User) => {
  return post<User>("/Person/Check", UserIndo);
};
