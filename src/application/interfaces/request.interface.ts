export interface IGenericRequest<T extends any = any> {
  body: T,
  query: T
}