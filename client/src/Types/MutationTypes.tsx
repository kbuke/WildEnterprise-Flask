export type MutationVariables<T> = {
    endpoint: string,
    values: T,
    queryKeys: unknown[][]
}