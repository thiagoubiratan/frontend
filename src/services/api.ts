import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from '../contexts/AuthContex'

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(Response => {
        return Response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(new AuthTokenError())
    })

    return api;
}