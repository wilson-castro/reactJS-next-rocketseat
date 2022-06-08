import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getSTripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';





export function SubscriberButton(){
    
    const { data: session } = useSession()

    const  router = useRouter()

    
   async function handleSubscriber(){
        if(!session){
            signIn('github')
            return
        }


        if(session.activeSubscription){
            router.push('/posts')
            return;
        }


        try {
            const response = await api.post('/subscribe')

            const {sessionId } = response.data

            const stripe = await getSTripeJs()

            await stripe.redirectToCheckout({sessionId})
        }catch(err){
            alert(err.message)
        }
    }

    
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscriber}
       >
           Subscribe now
        </button>
        
    )
}
