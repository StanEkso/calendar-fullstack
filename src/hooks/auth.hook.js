import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) =>{
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem('user-token', JSON.stringify({userId: id, token: jwtToken}))
    }, [])
    const logout = useCallback(() =>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem('user-token');
        navigate('/');
    }, [])
    
    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem('user-token'))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])
    return {login, logout, token, userId}
}