import { Card, CardBody } from '@heroui/react';
import { addToast } from '@heroui/toast';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { CreateFichaMatriculaPayload } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { PathRoute } from '@/domains/routes/route.entity';
import { calcularDV } from '@/infra';
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
  const { hasValidAccess, rutRoute, setRutEstudiante } = usePreMatriculaState();

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
    rutEstudiante,
    informacionGeneralValid,
    updateSection,
  } = useFichaMatricula();

  // hook para manejar la petición de creación de la ficha de matrícula
  const { createFichaMatricula, isLoading } = useCreateFichaMatricula();

  useEffect(() => {
    if (rutEstudiante) {
      if (rutEstudiante !== rutRoute) resetForm(rutRoute);

      setRutEstudiante(rutRoute);

      const dv = calcularDV(rutEstudiante);
      updateSection('estudiante', {
        run_estudiante: rutEstudiante,
        dv_rut_estudiante: dv,
      });
    }
  }, [updateSection, rutEstudiante, resetForm, rutRoute, setRutEstudiante]);

  // Función para ocultar sección de formación general para estudiantes de 3 y 4 grado
  const visibleTabs = useMemo(() => {
    const cursoInscrito = formData.estudiante?.curso_inscrito;
    if (cursoInscrito === '3' || cursoInscrito === '4') {
      return FICHA_MATRICULA_TABS.filter((tab) => tab.key !== 'formacion');
    }
    return FICHA_MATRICULA_TABS;
  }, [formData.estudiante?.curso_inscrito]);

  // Si no hay rut (indica que viene desde pre-matricula), redirecciona a prematricula
  if (!hasValidAccess) {
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
      periodo_lectivo: formData.periodo_lectivo || 2,
      grado_a_matricularse: formData.grado_a_matricularse || 0,
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
      autorizacion_uso_fotos: formData.autorizacion_uso_fotos,
      confirmacion_datos_entregados:
        formData.confirmacion_datos_entregados ?? false,
      enterado_envio_reglamento: formData.enterado_envio_reglamento ?? false,
    };

    try {
      await createFichaMatricula(payload);
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
            canSubmit={informacionGeneralValid}
          />
        </CardBody>
      </Card>
    </section>
  );
};

export default FichaMatricula;
