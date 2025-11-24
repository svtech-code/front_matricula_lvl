import { Accordion, AccordionItem } from '@heroui/react';
import { INFO_SECTIONS } from '../const/liceo.const';

export const InfoSection = () => {
  return (
    <section>
      <header className="pb-6">
        <h3 className="text-xl font-semibold">Información importante</h3>
        <p className="text-md font-medium text-gray-600">
          A continuación encontrarás información que puede ser de utilidad para
          completar con éxito el proceso de pre-matrícula, requerido para
          continuar con el proceso de matrícula final.
        </p>
      </header>

      <Accordion>
        {INFO_SECTIONS.map((section) => (
          <AccordionItem
            key={section.title}
            aria-label={section.title}
            title={section.title}
            startContent={section.icon}
          >
            {'content' in section && (
              <span className="text-sm text-gray-600">{section.content}</span>
            )}

            {'items' in section && (
              <ul className="text-sm text-gray-600 ml-6 space-y-1 list-disc list-inside">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
