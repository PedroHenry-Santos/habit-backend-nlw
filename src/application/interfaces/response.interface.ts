export interface IGenericResponse<T extends any = any> {
  status: (statusNumber: number) => IGenericResponse
}