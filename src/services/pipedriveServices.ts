import api from "../config/api";
import { withRetry } from "../utils/withRetry";
import type { PipedrivePerson } from "../types/pipedrive";

type SearchField = "email" | "phone" | "name";

interface SearchResponse {
  data: {
    items: {
      item: PipedrivePerson;
    }[];
  };
}

export const searchPersons = async (
  term: string,
  field: SearchField,
): Promise<PipedrivePerson[]> => {
  const res = await withRetry(() =>
    api.get<SearchResponse>("/v1/persons/search", {
      params: {
        term,
        fields: field,
        exact_match: true,
      },
    }),
  );

  const items = res.data?.data?.items;
  return Array.isArray(items) ? items.map((entry) => entry.item) : [];
};

export const createPerson = async (
  data: Partial<PipedrivePerson>,
): Promise<PipedrivePerson | null> => {
  const res = await withRetry(() =>
    api.post<{ data: PipedrivePerson }>("/v1/persons", data),
  );

  return res.data?.data || null;
};

export const updatePerson = async (
  id: number,
  data: Partial<PipedrivePerson>,
): Promise<PipedrivePerson | null> => {
  const res = await withRetry(() =>
    api.put<{ data: PipedrivePerson }>(`/v1/persons/${id}`, data),
  );

  return res.data?.data || null;
};
