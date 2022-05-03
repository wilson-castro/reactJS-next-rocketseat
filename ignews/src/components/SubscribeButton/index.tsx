import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button
      type="button"
      onClick={ () => { console.log(priceId);
       }}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}