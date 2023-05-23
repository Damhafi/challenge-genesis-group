import { User } from 'src/entities/user'
import { ValidateResult } from 'src/types/validate'

const validateUser = async (data: User): Promise<ValidateResult> => {
    const Yup = await import('yup')

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Digite no mínimo 3 caracteres.')
            .required('Digite um nome válido.'),
        email: Yup.string()
            .email('Digite um email válido.')
            .required('Digite um email válido.')
    })

    try {
        await schema.validate(data, {
            abortEarly: false
        })

        return { ok: true, fields: {} }
    } catch (err) {
        const validationErrors: Record<string, string> = {}

        if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
                if (error && error.path) {
                    validationErrors[error.path] = error.message
                }
            })

            return { ok: false, fields: validationErrors }
        }

        return { ok: false, fields: {} }
    }
}

export { validateUser }
