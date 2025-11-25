import { Card, CardBody } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import type { CreateFichaMatriculaPayload } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { PathRoute } from '@/domains/routes/route.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { FormNavigation } from './components/FormNavigation';
import { FormProgress } from './components/FormProgress';
import { FormTabs } from './components/FormTabs';
import Header from './components/Header';
import { RedirectOverlay } from './components/RedirectOverlay';
import { FICHA_MATRICULA_TABS } from './const/tabs.const';
import { useCreateFichaMatricula } from './hooks/useCreateFichaMatricula.hook';
import { usePreMatriculaState } from './hooks/usePreMatriculaState.hook';

const FichaMatricula = () => {
  const navigate = useNavigate();
  const { hasValidAccess } = usePreMatriculaState();
  const {
    currentStep,
    maxStepReached,
    setCurrentStep,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
    getProgress,
    resetForm,
    formData,
  } = useFichaMatricula();
  const { createFichaMatricula, isLoading } = useCreateFichaMatricula();

  const visibleTabs = useMemo(() => {
    const cursoInscrito = formData.estudiante?.curso_inscrito;
    if (cursoInscrito === '3' || cursoInscrito === '4') {
      return FICHA_MATRICULA_TABS.filter((tab) => tab.key !== 'formacion');
    }
    return FICHA_MATRICULA_TABS;
  }, [formData.estudiante?.curso_inscrito]);

  if (!hasValidAccess()) {
    return <RedirectOverlay />;
  }

  const progress = getProgress(visibleTabs.length);

  const handleNext = () => {
    if (canGoNext(visibleTabs.length)) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious()) {
      previousStep();
    }
  };

  const handleSubmit = async () => {
    if (!formData.estudiante) {
      addToast({
        title: 'Error',
        description: 'Faltan datos del estudiante',
        color: 'danger',
      });
      return;
    }

    const { curso_inscrito, ...estudianteData } = formData.estudiante;

    const payload: CreateFichaMatriculaPayload = {
      periodo_lectivo: formData.periodo_lectivo || 2025,
      grado_a_matricularse: formData.grado_a_matricularse || 1,
      cod_estado_ficha_matricula: 1,
      estudiante: estudianteData,
      antecedentes_personales: formData.antecedentes_personales!,
      antecedentes_academicos: formData.antecedentes_academicos!,
      antecedentes_localidad: formData.antecedentes_localidad!,
      antecedentes_pie: formData.antecedentes_pie!,
      antecedentes_salud: formData.antecedentes_salud!,
      antecedentes_sociales: formData.antecedentes_sociales!,
      antecedentes_junaeb: formData.antecedentes_junaeb!,
      familiares: formData.familiares || [],
      formacion_general_opciones: formData.formacion_general_opciones || [],
    };

    try {
      const response = await createFichaMatricula(payload);
      console.log('✅ Ficha creada exitosamente:', response);
      navigate(PathRoute.REGISTRO_EXITOSO);
    } catch (error) {
      addToast({
        title: 'Error al crear ficha',
        description:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado',
        color: 'danger',
      });
      console.error('❌ Error al crear ficha:', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate(PathRoute.PRE_MATRICULA);
  };

  const handleTabChange = (key: string) => {
    const index = visibleTabs.findIndex((tab) => tab.key === key);
    if (index !== -1) setCurrentStep(index);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <Header />

      <FormProgress progress={progress} />

      <Card>
        <CardBody>
          <FormTabs
            tabs={visibleTabs}
            selectedKey={visibleTabs[currentStep]?.key}
            onSelectionChange={handleTabChange}
            maxStepReached={maxStepReached}
          />

          <FormNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            canGoPrevious={canGoPrevious()}
            canGoNext={canGoNext(visibleTabs.length)}
            isLastStep={currentStep === visibleTabs.length - 1}
            isSubmitting={isLoading}
          />
        </CardBody>
      </Card>
    </section>
  );
};

export default FichaMatricula;
