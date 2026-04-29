import dotenv from "dotenv";
import type { PipedrivePerson, Mapping } from "./types/pipedrive";
import inputData from "./mappings/inputData.json";
import mappingsJson from "./mappings/mappings.json";
import { mapData } from "./utils/mapper";
import { getValue } from "./utils/getValue";
import { searchPersons, updatePerson, createPerson } from "./services/pipedriveServices";

dotenv.config();

const mappings = mappingsJson as Mapping[];

const syncPdPerson = async (): Promise<PipedrivePerson | null> => {
  const payload: any = mapData(inputData, mappings);

  if (payload.email) {
    payload.email = [{ value: payload.email, primary: true }];
  }

  if (payload.phone) {
    payload.phone = [{ value: payload.phone, primary: true }];
  }

  const emailMapping = mappings.find((m) => m.pipedriveKey === "email");
  const phoneMapping = mappings.find((m) => m.pipedriveKey === "phone");
  const nameMapping = mappings.find((m) => m.pipedriveKey === "name");

  if (emailMapping) {
    const email = getValue(inputData, emailMapping.inputKey);
    if (email) {
      const persons = await searchPersons(email, "email");
      if (persons.length > 0) {
        return updatePerson(persons[0].id, payload);
      }
    }
  }

  if (phoneMapping) {
    const phone = getValue(inputData, phoneMapping.inputKey);
    if (phone) {
      const persons = await searchPersons(phone, "phone");
      if (persons.length > 0) {
        return updatePerson(persons[0].id, payload);
      }
    }
  }

  if (nameMapping) {
    const name = getValue(inputData, nameMapping.inputKey);
    if (name) {
      const persons = await searchPersons(name, "name");
      if (persons.length > 0) {
        return updatePerson(persons[0].id, payload);
      }
    }
  }

  return createPerson(payload);
};

(async () => {
  const person = await syncPdPerson();
  console.log("Final Result:", person);
})();
