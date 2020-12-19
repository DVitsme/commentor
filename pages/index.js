import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { auth } from 'firebase';
import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();
  console.log(auth);
  return (
    <div className={styles.container}>
      <Head>
        <title>We Building Stuff Here</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to<a href="https://nextjs.org"> My New App</a>
        </h1>

        <p className={styles.description}>
          Get started by <code className={styles.code}>loging In</code>
        </p>

        <div style={{ display: 'flex' }}>
          {!auth.user ? (
            <button onClick={(e) => auth.signinWithGithub()}>Log In</button>
          ) : (
            <button onClick={(e) => auth.signOut()}>Sign Out</button>
          )}
        </div>
        <div>
          {auth.user ? <p>Hello {auth.user.displayName}</p> : 'not logged in'}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
