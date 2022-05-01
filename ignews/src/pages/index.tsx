import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from 'components/SubscribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for $9.98 month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const price = await stripe.
  
  return {
    props {
      nome:' teste'
    }
  }
}