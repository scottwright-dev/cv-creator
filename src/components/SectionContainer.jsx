import { useMemo, useState } from 'react';
import InputSection from './form/FormInputSection';
import OutputSection from './cv/CVOutputSection';
import { formSections } from '../structure/formStructure';

export default function SectionContainer() {
  const [formValues, setFormValues] = useState({});

  console.log('SectionContainer - formValues:', formValues);

  // maps labels to UUIDs for simpler referencing
  const labelsToIds = useMemo(() => {
    const mapping = {};
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        mapping[field.label] = field.id;
      });
    });
    return mapping;
  }, []);

  console.log('SectionContainer - labelsToIds:', labelsToIds);

  // updates form values based on field id and value
  const handleInputChange = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    console.log('SectionContainer - handleInputChange - id:', id);
    console.log('SectionContainer - handleInputChange - value:', value);
  };

  return (
    <main className="flex min-h-screen pt-4">
      <section className="flex w-2/5 flex-col">
        <InputSection
          onInputChange={handleInputChange}
          formValues={formValues}
        />
      </section>
      <section className="flex w-3/5 flex-col">
        <OutputSection formValues={formValues} labelsToIds={labelsToIds} />
      </section>
    </main>
  );
}
