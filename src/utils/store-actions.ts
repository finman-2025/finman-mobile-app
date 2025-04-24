import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";

export const getItem = async <T = string>(key: string) =>
  (await getItemAsync(key)) as T;

export const setItem = async (key: string, value: string) =>
  await setItemAsync(key, value);

export const removeItem = async (key: string) => await deleteItemAsync(key);
