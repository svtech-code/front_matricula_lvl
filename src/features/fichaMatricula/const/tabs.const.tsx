import { AntecedentesAcademicosForm } from '../components/forms/AntecedentesAcademicosForm';
import { AntecedentesFamiliaresForm } from '../components/forms/AntecedentesFamiliaresForm';
import { AntecedentesJunaebForm } from '../components/forms/AntecedentesJunaebForm';
import { AntecedentesLocalidadForm } from '../components/forms/AntecedentesLocalidadForm';
import { AntecedentesPersonalesForm } from '../components/forms/AntecedentesPersonalesForm';
import { AntecedentesPieForm } from '../components/forms/AntecedentesPieForm';
import { AntecedentesSaludForm } from '../components/forms/AntecedentesSaludForm';
import { AntecedentesSocialesForm } from '../components/forms/AntecedentesSocialesForm';
import { EstudianteForm } from '../components/forms/EstudianteForm';
import { FormacionGeneralForm } from '../components/forms/FormacionGeneralForm';
import { InformacionGeneralForm } from '../components/forms/InformacionGeneralForm';

export const FICHA_MATRICULA_TABS = [
  { key: 'estudiante', title: 'Estudiante', component: <EstudianteForm /> },
  {
    key: 'personales',
    title: 'Datos Personales',
    component: <AntecedentesPersonalesForm />,
  },
  {
    key: 'academicos',
    title: 'Datos Académicos',
    component: <AntecedentesAcademicosForm />,
  },
  {
    key: 'localidad',
    title: 'Localidad',
    component: <AntecedentesLocalidadForm />,
  },
  { key: 'pie', title: 'PIE', component: <AntecedentesPieForm /> },
  { key: 'salud', title: 'Salud', component: <AntecedentesSaludForm /> },
  {
    key: 'sociales',
    title: 'Sociales',
    component: <AntecedentesSocialesForm />,
  },
  { key: 'junaeb', title: 'JUNAEB', component: <AntecedentesJunaebForm /> },
  {
    key: 'familiares',
    title: 'Familiares',
    component: <AntecedentesFamiliaresForm />,
  },
  {
    key: 'formacion',
    title: 'Formación General',
    component: <FormacionGeneralForm />,
  },
  {
    key: 'informacion',
    title: 'Información General',
    component: <InformacionGeneralForm />,
  },
];
