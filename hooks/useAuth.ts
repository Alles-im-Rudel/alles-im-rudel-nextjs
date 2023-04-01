import {useEffect} from 'react'
import {useRouter} from 'next/router'
import useAuthStore from "../lib/Auth/store";
import {shallow} from "zustand/shallow";
import {iLoginForm} from "../pages/login";

type iUseAuth = {
    permission?: string;
    redirectIfAuthenticated?: string;
}
export const useAuth = ({permission, redirectIfAuthenticated = "/permission-denied"}: iUseAuth = {}) => {
    const router = useRouter()

    const [
        user,
        isAuth,
        permissions,
        getAuth,
        loginApi,
        logoutApi,
    ] = useAuthStore((state) => [
        state.user,
        state.isAuth,
        state.permissions,
        state.getAuth,
        state.login,
        state.logoutApi,
    ], shallow);

    const login = async (form: iLoginForm) => {
        const response = await loginApi(form);
        if (response) {
            router.push('/');
        } else {
            router.push('/login');
        }
    }

    const logout = () => {
        logoutApi();
        router.push('/login');
    }

    /*const resetPassword = async ({setErrors, setStatus, ...props}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', {token: router.query.token, ...props})
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }*/

    /*    const logout = async () => {
            if (!error) {
                await axios.post('/logout').then(() => mutate())
            }

            window.location.pathname = '/login'
        }*/

    const can = (permission: string): boolean => {
        return permissions.some(p => p.name === permission);

    }

    useEffect(() => {
        if (permission && !permissions.some(p => p.name === permission)) {
            router.push(redirectIfAuthenticated)
        }
    }, [user, isAuth, permission, permissions, router, redirectIfAuthenticated])

    useEffect(() => {
        if(!isAuth) {
            getAuth();
        }
    }, [getAuth])

    return {
        user,
        login,
        isAuth,
        logout,
        can,
    }
}