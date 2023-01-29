export interface IGenericRequest<
  B extends any = any,
  Q extends any = any,
  P extends any = any,
> {
  body: B,
  query: Q,
  params: P
}