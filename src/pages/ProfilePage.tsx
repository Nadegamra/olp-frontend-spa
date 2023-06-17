import useAuth from '../stores/AuthStore'

function ProfilePage() {
    const { user } = useAuth()

    return <section>{user?.email}</section>
}

export default ProfilePage
