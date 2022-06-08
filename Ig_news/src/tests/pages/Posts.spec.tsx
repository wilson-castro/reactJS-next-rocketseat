import {render, screen} from '@testing-library/react'
import Posts,{getStaticProps} from '../../pages/posts'

import {mocked} from 'ts-jest/utils'
import {getPrismicClient} from '../../services/prismic' 

const posts ={
    slug:'My new posts',
    title: 'My new posts',
    excerpt: 'Post excerpt',
    updatedAt:'10 de abril'
}

jest.mock('../../services/prismic')

describe('Posts page', () => {
    it('renders correctly',() => {
        render(
            <Posts posts={[posts]} />
        )
            expect(screen.getByText("My new posts")).toBeInTheDocument()
       
    })
    it('loads inicial data', async() => {
       
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results:[
                    {
                        uid:'my-new-post',
                        data:{
                            title:[
                                {type: 'heading', text: 'My new posts',}
                            ],
                            content:[{
                                type: 'paragraph', text: 'Post excerpt'
                            }]
                        },
                        last_publication_date: '04-01-2022'
                    }
                ]
            })
        } as any)


       
        const response  = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({ 
                props:{
                   posts:[{
                       slug: 'my-new-post',
                       title: 'My new posts',
                       excerpt:'Post excerpt',
                       updatedAt:'01 de abril de 2022'
                   }]
                }
            })
        )
        

    })
})
