export default function endSessionIfExpired() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken !== null) {
        const parts = accessToken.split('.')
        const payload = JSON.parse(window.atob(parts[1]))
        const issueDate = payload.iat
        // Add 4 hours to access token issue date to get refresh token's expiration date
        const expirationDate = new Date(issueDate * 1000 + 4 * 3600 * 1000)
        const currentDate = new Date(Date.now())
        if (currentDate > expirationDate) {
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
}
