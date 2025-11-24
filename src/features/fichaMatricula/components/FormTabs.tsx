import { Tab, Tabs } from '@heroui/react';
import type { ReactNode } from 'react';

interface TabConfig {
  key: string;
  title: string;
  component: ReactNode;
}

interface FormTabsProps {
  tabs: TabConfig[];
  selectedKey: string;
  onSelectionChange: (key: string) => void;
}

export const FormTabs = ({
  tabs,
  selectedKey,
  onSelectionChange,
}: FormTabsProps) => {
  return (
    <Tabs
      selectedKey={selectedKey}
      onSelectionChange={(key) => onSelectionChange(key as string)}
      aria-label="Formulario de prematrícula"
      color="primary"
    >
      {tabs.map((tab) => (
        <Tab key={tab.key} title={tab.title}>
          <div className="py-6">{tab.component}</div>
        </Tab>
      ))}
    </Tabs>
  );
};
