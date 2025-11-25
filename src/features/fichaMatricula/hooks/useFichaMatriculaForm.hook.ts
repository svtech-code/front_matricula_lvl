import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFichaMatriculaStore } from '@/shared/stores/fichaMatricula.store';
import {
  type FichaMatriculaFormData,
  fichaMatriculaSchema,
} from '../schemas/fichaMatricula.schema';

export const useFichaMatriculaForm = () => {
  const { formData } = useFichaMatriculaStore();

  const form = useForm<FichaMatriculaFormData>({
    resolver: zodResolver(fichaMatriculaSchema),
    mode: 'onBlur',
    defaultValues: formData as FichaMatriculaFormData,
  });

  useEffect(() => {
    form.reset(formData as FichaMatriculaFormData);
  }, [formData, form]);

  const onSubmit = async (data: FichaMatriculaFormData) => {
    console.log('📦 Payload del formulario:', JSON.stringify(data, null, 2));
    return data;
  };

  return {
    form,
    onSubmit,
  };
};
