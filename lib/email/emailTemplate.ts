export const VerificationUserTemplate = ({ code }: { code: string }) => {
	return `
        <div>
            <h1>Код подтверждения: ${code}</h1>
            <p>
			<a href={http://localhost:3000/api/auth/verify?code=${code}}>
				Подтвердить регистрацию
			</a>
			</p>
        </div>
        `
}
