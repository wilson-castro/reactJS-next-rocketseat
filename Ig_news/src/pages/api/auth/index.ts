import {NextApiRequest, NextApiResponse} from 'next'

export default (res: NextApiResponse, req: NextApiRequest)=> {
    const users =[
        {
            id: 1,
            name: 'John',
        },
        {
            id: 2,
            name: 'Felix',
        },
        {
            id: 3,
            name: 'Hudson',
        }
    ]

    return res.json(users)
} 