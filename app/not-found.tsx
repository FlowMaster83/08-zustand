import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page is not exist',
  openGraph: {
    title: 'Page Not Found',
    description: 'This page is not exist',
    images: [
      {
        url: '/404.png',
        width: 1200,
        height: 630,
        alt: '404 not found page img',
      },
    ],
  },
};

import css from './Home.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
