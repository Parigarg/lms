import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Navbar from '../components/Navbar'; // ✅ Import your Navbar

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EduLMS</title>
        <meta
          name="description"
          content="Simple LMS — Courses, enrollments and teacher tools"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ✅ Navbar will be visible on all pages */}
      <Navbar />

      {/* Main content area */}
      <main className={`${inter.className} min-h-screen p-4`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
