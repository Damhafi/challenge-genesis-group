import { UserDTO } from 'src/dtos/user'
import { User } from 'src/entities/user'
import { api } from 'src/services/api'
import { UseCasesResult } from 'src/types/useCases'

const getUserFunctions = (token: string) => {
    const createUser = async (user: UserDTO): Promise<UseCasesResult<User>> => {
        try {
            const result = await api.post('/user/', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (result && result.status === 200) {
                return { ok: true, data: result.data }
            } else {
                return { ok: false, message: 'Unexpected error' }
            }
        } catch (e) {
            return { ok: false, message: 'Unexpected error' }
        }
    }

    const getUserInfo = async (id: number): Promise<UseCasesResult<User>> => {
        try {
            const result = await api.get(`/user/${id}`)

            if (result && result.status === 200) {
                return { ok: true, data: result.data }
            } else {
                return { ok: false, message: 'Unexpected error' }
            }
        } catch (e) {
            return { ok: false, message: 'Unexpected error' }
        }
    }

    return {
        createUser,
        getUserInfo
    }
}

export { getUserFunctions }
