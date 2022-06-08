import {render, screen} from '@testing-library/react'
import Post,{getServerSideProps} from '../../pages/posts/[slug]'

import {mocked} from 'ts-jest/utils'
import {getPrismicClient} from '../../services/prismic' 
import { getSession } from 'next-auth/react'

const post ={
    slug:'My new posts',
    title: 'My new posts',
    content: 'Post excerpt',
    updatedAt:'10 de abril'
}

jest.mock('../../services/prismic')
jest.mock('next-auth/react')

describe('Posts page', () => {
    it('renders correctly',() => {
        render(
            <Post post={post} />
        )
        expect(screen.getByText("My new posts")).toBeInTheDocument()
        expect(screen.getByText("Post excerpt")).toBeInTheDocument()
       
    })
    it('redirects user if no subscription is found', async() => {
       
        const getSessionMocked = mocked(getSession)
       
        getSessionMocked.mockResolvedValueOnce(null)


        

        const response  = await getServerSideProps({params:{slug:'my-new-post'}}as any)
           

        expect(response).toEqual(
            expect.objectContaining({ 
                redirect: expect.objectContaining({
                    destination:'/posts/preview/my-new-post',
                   
                })
            })
        )
    })
    it('loads initial data',async() => {
        const getSessionMocked = mocked(getSession)
        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data:{
                    title:[
                        {title: 'heading', text:'My new post'}
                    ],
                    content: [{type: 'paragraph', text:'Post content'}]
                },
                last_publication_date: '01-04-2022'
            })
        }as any)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-active-subscription',
        }as any)

        const response  = await getServerSideProps({params:{slug:'my-new-post'}}as any)
           
        expect(response).toEqual(
            expect.objectContaining({ 
                props:{
                    post:{
                        slug:'my-new-post',
                        title:'My new post',
                        content:"<p>Post content</p>",
                        updatedAt:'04 de janeiro de 2022'
                    }
                }
            })
        )
    })
    })


