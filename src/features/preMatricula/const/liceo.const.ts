export const LICEO_INFO = {
  nombre: 'Liceo Valentín Letelier Madariaga',
  sigla: 'LVLM',
  sitioWeb: 'https://www.liceovalentinletelier.cl',
  admisionEscolar: 'https://www.sistemadeadmisionescolar.cl/',
  email: 'matricula@liceovalentinletelier.cl',
  telefono: '(XX) XXXX XXXX',
  horarioAtencion: 'Lunes a viernes de 9:00 a 17:00 horas',
} as const;

export const PERIODO_MATRICULA = {
  inicio: '09 de diciembre 2025',
  termino: '23 de diciembre 2025',
  anio: 2026,
} as const;

export const INFO_SECTIONS = [
  {
    icon: '📅',
    title: 'Período de Matrícula',
    content: `El proceso de matrícula ${PERIODO_MATRICULA.anio} estará disponible desde el ${PERIODO_MATRICULA.inicio} hasta el ${PERIODO_MATRICULA.termino}. No olvides completar tu pre-matrícula y asistir presencialmente para validar tus datos.`,
  },
  {
    icon: '📄',
    title: 'Documentación Necesaria',
    items: [
      'Certificado de nacimiento del estudiante',
      'Cédula de identidad del estudiante (si posee)',
      'Cédula de identidad del apoderado',
      'Certificado de promoción o concentración de notas del año anterior (Estudiantes nuevos)',
    ],
  },
  {
    icon: '⚕',
    title: 'Información de Salud',
    content:
      'Es importante que proporciones información actualizada sobre alergias, medicamentos, enfermedades crónicas, y cualquier condición de salud relevante del estudiante. Esta información es confidencial y será utilizada solo en caso de emergencia.',
  },
  {
    icon: '🏫',
    title: 'Programas Especiales',
    content:
      'El Liceo cuenta con Programa de Integración Escolar (PIE) y beneficios JUNAEB (alimentación, útiles escolares, becas). Indica en tu ficha si deseas participar en alguno de estos programas.',
  },
  // {
  //   icon: 'i',
  //   title: 'Dudas y Consultas',
  //   content: `Para cualquier consulta, puedes contactarnos al teléfono ${LICEO_INFO.telefono} o al correo ${LICEO_INFO.email}. Nuestro horario de atención es ${LICEO_INFO.horarioAtencion}.`,
  // },
] as const;
