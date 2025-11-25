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
  maxStepReached: number;
}

export const FormTabs = ({
  tabs,
  selectedKey,
  onSelectionChange,
  maxStepReached,
}: FormTabsProps) => {
  return (
    <Tabs
      selectedKey={selectedKey}
      onSelectionChange={(key) => onSelectionChange(key as string)}
      aria-label="Formulario de prematrícula"
      variant="bordered"
      color="primary"
      disabledKeys={tabs
        .map((tab, index) => (index > maxStepReached ? tab.key : null))
        .filter((key): key is string => key !== null)}
    >
      {tabs.map((tab) => (
        <Tab key={tab.key} title={tab.title}>
          <div className="py-6">{tab.component}</div>
        </Tab>
      ))}
    </Tabs>
  );
};
