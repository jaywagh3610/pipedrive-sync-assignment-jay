import { getValue } from "./getValue";
import type { Mapping } from "../types/pipedrive";

export const mapData = (
  inputData: any,
  mappings: Mapping[],
): Record<string, any> => {
  const result: any = {};
  for (const map of mappings) {
    if (!map?.pipedriveKey || !map?.inputKey) continue;
    const value = getValue(inputData, map.inputKey);
    if (value !== undefined && value !== null && value !== "") {
      result[map.pipedriveKey] = value;
    }
  }
  return result;
};
