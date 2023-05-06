export function hasValues(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        if (hasValues(value as Record<string, unknown>)) {
          return true;
        }
      } else if (Boolean(value)) {
        return true;
      }
    }
  }
  return false;
}
