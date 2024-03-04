'use client'
import Image from "next/image";
import {Inconsolata, Inter} from 'next/font/google'
import styles from "./page.module.css";
import localFont from 'next/font/local'
import { useEffect, useRef } from 'react';
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

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, description, imageUrl, projectUrl }) => {
  return (
    <div className={styles.card}>
      <a href={projectUrl}>
        <div className={styles.card}>
          <Image src={imageUrl} alt={title} width={500} height={300} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>

    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: 'Worduel',
      description: '2-player version of Wordle.',
      imageUrl: '/worduel.png',
      projectUrl: 'https://gong8.github.io/worduel/',
    },
    {
      title: 'Sobriety',
      description: 'a chess bot',
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
      <div className={styles.card}>
        <Image src={imageUrl} alt={title} width={500} height={300} />
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={projectUrl}>View Project</a>
      </div>
    );
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
          <p className={styles.contact}>
            call me maybe...
          </p>
        </div>
      </div>
    </main>
  );
}