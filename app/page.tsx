'use client'
import Image from "next/image";
import {Inconsolata, Inter} from 'next/font/google'
import styles from "./page.module.css";
import localFont from 'next/font/local'
import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';


const titleFont = localFont({ src: '../public/MonumentExtended-Regular.otf' })
const mainFont = localFont({ src: '../public/MonumentExtended-Regular.otf' })
const inter = Inter({ subsets: ['latin'] })
const inconsolata = Inconsolata({ subsets: ['latin'] })



interface PortfolioItemProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}




export default function Home() {

  const projects = [
    {
      title: 'Function Calculator',
      description: 'step-by-step derivative calculator and graphing tool',
      imageUrl: '/function-calc.png',
      projectUrl: 'https://function-calc.vercel.app/',
    },
    {
      title: 'Worduel',
      description: 'two-player version of Wordle',
      imageUrl: '/worduel.png',
      projectUrl: 'https://gong8.github.io/worduel/',
    },
    {
      title: 'Sobriety',
      description: 'a simple chess bot, with an interactive board and capability to import/export games',
      imageUrl: '/sobriety.png',
      projectUrl: 'https://myst-6.github.io/sobriety/',
    },

    // Add more projects as needed
  ];

  const scrollPosition = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleRouteChange = () => {
      window.scrollTo(0, scrollPosition.current);
    }

    Router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, []);

  useEffect(() => {
    scrollPosition.current = window.pageYOffset;
  });

  // @ts-ignore
  function PortfolioItem({ title, description, imageUrl, projectUrl }) {
    return (

      <a href={projectUrl}>
          <div className={styles.card}>

            <Image src={imageUrl} alt={title} width={500} height={300} objectFit="cover"/>
            <div className={styles.projectInfo}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>


          </div>
      </a>

    );
  }

  const [mailSent, setMailSent] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);


  async function handleSubmit(event: any) {
    event.preventDefault()

    setMailLoading(true);
    const formData = new FormData(event.target)

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json();

    function delayLoading() {
      setMailLoading(false);
    };

    setTimeout(delayLoading, 1000);


    if (json.status == 200) {
      setMailSent(true);
      setTimeout(() => setMailSent(false), 1000);
    } else {
      setMailError(true);
      setTimeout(() => setMailError(false), 1000);
    }
  }

  return (
    <main className={inconsolata.className}>
      <div className={styles.root}>
        <div className={styles.titleContainer}>
          <h1 className={titleFont.className}>
            <span className={`${styles.title} ${styles.titleAnimation} ${styles.typing}`}>Hey, I&apos;m Nelson Gong</span>
          </h1>
        </div>

        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Incoming mathematics and computer science student at Imperial College London.
            <br/>
            A young and enthusiastic mind - always looking for new opportunities and challenges.
            <br/>
            I have a keen interest in web development, specialising in NextJS.
          </p>
        </div>

        <div className={styles.portfolioContainer}>
          <h2 className={styles.portfolioTitle}>
            Portfolio
          </h2>
          <div className={styles.portfolio}>
            {projects.map((project) => (
              <PortfolioItem
                key={project.title}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                projectUrl={project.projectUrl}
              />
            ))}
          </div>
        </div>

        <div className={styles.contactContainer}>
          <h2 className={styles.contactTitle}>
            Contact Me
          </h2>
          <div className={styles.contact}>
            <form onSubmit={handleSubmit} className={`${styles.form} ${mailSent ? styles.mailSent : ''} ${mailError ? styles.mailError : ''}`}>
              <label className={styles.label}>
                Your Email:
                <input type="email" name="from" required className={styles.input}/>
              </label>
              <br/>
              <label className={styles.label}>
                Subject:
                <input type="text" name="subject" required className={styles.input}/>
              </label>
              <br/>
              <label className={styles.label}>
                Message:
                <textarea name="message" required className={styles.textarea}/>
              </label>
              <br/>
              <button
                className={`${styles.button} ${mailLoading ? styles.loading : ''}`}
                type="submit"
                disabled={mailLoading}
              >
                {mailLoading ? '' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}