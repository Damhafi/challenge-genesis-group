export default class ApiError extends Error {
    public status!: number

    public info!: string
}
