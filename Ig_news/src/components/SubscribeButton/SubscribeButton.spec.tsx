import {render, screen,fireEvent} from '@testing-library/react'
import { SubscriberButton } from '.'
import {useRouter} from 'next/router'
import {mocked} from 'ts-jest/utils'
import {signIn, useSession} from 'next-auth/react'

jest.mock('next-auth/react')

jest.mock('next/router')



describe('SubscriberButton component', () =>{
    it('renders correctly', () =>{
       const useSessionMocked = mocked(useSession)
        
       useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

        render(<SubscriberButton/>)
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })
    

    it('redirects user to sign in when not authenticated', () =>{
        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)
        
        useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })
        
        render(<SubscriberButton/>)
        const subscriberButton = screen.getByText('Subscribe now')

        fireEvent.click(subscriberButton)

        expect(signInMocked).toHaveBeenCalled()
    })
    
    it('redirect user to posts when user is already has a subscription', () =>{
        const useRouterMoocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)    
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce({ data: {
            user: { 
                name: "John Doe", 
                email: "john.doe@example.com" 
            },
            activeSubscription:'fake-active-subscription',
            expires: "fake-expires"},
            status: 'authenticated',
        })

        useRouterMoocked.mockReturnValueOnce({
            push: pushMock
        } as any)


        render(<SubscriberButton/>)

        const subscriberButton = screen.getByText('Subscribe now')

        fireEvent.click(subscriberButton)

        expect(pushMock).toHaveBeenCalled()

    })
})