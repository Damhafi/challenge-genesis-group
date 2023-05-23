import { api } from 'src/services/api'
import ApiError from 'src/types/apiError'

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWR from 'swr'
import { Fetcher, PublicConfiguration } from 'swr/dist/types'

const useApi = <Data>(
    url: string,
    axiosConfig: AxiosRequestConfig = {},
    swrConfig: Partial<PublicConfiguration<Data, ApiError, Fetcher<Data>>> = {}
) => {
    const { data, error, mutate } = useSWR<Data, ApiError>(
        url,
        async fetchUrl => {
            try {
                const response = await api.get<unknown, AxiosResponse<Data>>(
                    fetchUrl,
                    axiosConfig
                )

                return response.data
            } catch (e) {
                if (e instanceof AxiosError && e.response) {
                    const requestError = new ApiError(
                        'An error occurred while fetching the data.'
                    )

                    requestError.info = e.response.data || 'Unexpected error'
                    requestError.status = e.response.status

                    throw requestError
                }

                throw new Error('An error occurred inside the hook.')
            }
        },
        swrConfig
    )

    return { data, error, isLoading: !error && !data, mutate }
}

export default useApi
