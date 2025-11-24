import { Header } from './components/Header';
import { InfoSection } from './components/InfoSection';
import { VerifyRutSection } from './components/VerifyRutSection';
import { WelcomeSection } from './components/WelcomeSection';

const PreMatricula = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <WelcomeSection />
        <VerifyRutSection />
        <InfoSection />
      </main>
    </div>
  );
};

export default PreMatricula;
