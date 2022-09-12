export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}
