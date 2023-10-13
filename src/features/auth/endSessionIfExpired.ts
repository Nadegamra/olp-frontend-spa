export default function endSessionIfExpired() {
    if (isRefreshTokenExpired()) {
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
}

export function isRefreshTokenExpired() {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken === null) {
        return false
    }

    const parts = accessToken.split('.')
    const payload = JSON.parse(window.atob(parts[1]))
    const issueDate = payload.iat
    // Add 4 hours to issue date to get refresh token's expiration date
    const expirationDate = new Date(issueDate * 1000 + 4 * 3600 * 1000)
    const currentDate = new Date(Date.now())
    return currentDate > expirationDate
}

export function isAuthTokenExpired() {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken === null) {
        return false
    }

    const parts = accessToken.split('.')
    const payload = JSON.parse(window.atob(parts[1]))
    const currentDate = new Date(Date.now())
    const expirationDate = new Date(payload.exp * 1000)
    return currentDate > expirationDate
}
