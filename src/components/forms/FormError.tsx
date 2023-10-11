function FormError({ error }: { error: string }) {
    return (
        <p className="text-clr-error h-6" role="alert">
            {error}
        </p>
    )
}

export default FormError
