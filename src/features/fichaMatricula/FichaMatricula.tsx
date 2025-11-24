import { Card, CardBody } from '@heroui/react';
import { useNavigate } from 'react-router';
import { PathRoute } from '@/domains/routes/route.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { FormNavigation } from './components/FormNavigation';
import { FormProgress } from './components/FormProgress';
import { FormTabs } from './components/FormTabs';
import { RedirectOverlay } from './components/RedirectOverlay';
import { FICHA_MATRICULA_TABS } from './const/tabs.const';
import { usePreMatriculaState } from './hooks/usePreMatriculaState.hook';

const FichaMatricula = () => {
  const navigate = useNavigate();
  const { hasValidAccess } = usePreMatriculaState();
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
    getProgress,
    resetForm,
  } = useFichaMatricula();

  if (!hasValidAccess()) {
    return <RedirectOverlay />;
  }

  const progress = getProgress(FICHA_MATRICULA_TABS.length);

  const handleNext = () => {
    if (canGoNext(FICHA_MATRICULA_TABS.length)) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious()) {
      previousStep();
    }
  };

  const handleSubmit = () => {
    console.log('Formulario enviado');
  };

  const handleCancel = () => {
    resetForm();
    navigate(PathRoute.PRE_MATRICULA);
  };

  const handleTabChange = (key: string) => {
    const index = FICHA_MATRICULA_TABS.findIndex((tab) => tab.key === key);
    if (index !== -1) setCurrentStep(index);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Formulario de Prematrícula</h1>

      <FormProgress progress={progress} />

      <Card>
        <CardBody>
          <FormTabs
            tabs={FICHA_MATRICULA_TABS}
            selectedKey={FICHA_MATRICULA_TABS[currentStep].key}
            onSelectionChange={handleTabChange}
          />

          <FormNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            canGoPrevious={canGoPrevious()}
            canGoNext={canGoNext(FICHA_MATRICULA_TABS.length)}
            isLastStep={currentStep === FICHA_MATRICULA_TABS.length - 1}
          />
        </CardBody>
      </Card>
    </section>
  );
};

export default FichaMatricula;
