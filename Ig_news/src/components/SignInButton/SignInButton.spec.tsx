import {render, screen} from '@testing-library/react'
import { SignInButton } from '.'
import {useSession} from 'next-auth/react'
import {mocked} from'ts-jest/utils'



jest.mock('next-auth/react')


describe('Header component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked =jest.mocked(useSession)
        
        useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

        render(<SignInButton/>)
        
        expect(screen.getByText(/Sign in with Github/i)).toBeInTheDocument()
    })




    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      status: "authenticated",
    });
        render(<SignInButton />);

        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    })
})