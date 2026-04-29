export const getValue = (obj: any, path: string): any => {
  try {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  } catch (error) {
    console.error(`Error path "${path}":`, error);
    return undefined;
  }
};
