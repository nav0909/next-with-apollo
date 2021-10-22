import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import Countries from "../components/Countries";
import { useState } from 'react';
import Link from 'next/link';

//export async function getServerSideProps() {
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
 };
}

 export default function Home({ countries }) {
  const [showcountrylist,setshowcountrylist ]= useState(false);

  function showcountries(){
    setshowcountrylist(!showcountrylist);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App client-side render</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}><a href="#welcome-to-next-js" aria-hidden="true" class="aal_anchor" id="welcome-to-next-js">
          <svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
            </path>
          </svg></a>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>


         <h2>pre rendering.....static</h2>
          <div className={styles.grid}>
            {countries.map((country) => (
              <div key={country.code} className={styles.card}>
                <h3><a href="#country-name" aria-hidden="true" class="aal_anchor" id="country-name"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>{country.name}</h3>
                <p>
                  {country.code} - {country.emoji}
                </p>
              </div>
            ))}
          </div>
          <h2>pre rendering.....server</h2>
          <Link href="/server-side">
            <a>click here</a>
          </Link>




          <h2>client side rendering......</h2>
        <div>
            <button onClick={showcountries}>
                click to show countries.....
              </button>
            {showcountrylist && (
            <ClientOnly>
              <Countries />
            </ClientOnly>
            )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}