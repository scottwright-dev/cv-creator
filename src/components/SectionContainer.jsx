import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InputSection from './form/FormInputSection';
import OutputSection from './cv/CVOutputSection';
import { formSections } from '../structure/formStructure';
import AppHeader from './AppHeader';

export default function SectionContainer() {
  const [formValues, setFormValues] = useState({});
  const componentRef = useRef();

  // Load form values from local storage on initial render, if present
  useEffect(() => {
    const storedFormValues = localStorage.getItem('formValues');
    if (storedFormValues) {
      const parsedFormValues = JSON.parse(storedFormValues);
      setFormValues(parsedFormValues);
    }
  }, []);

  // Save form values to local storage
  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      localStorage.setItem('formValues', JSON.stringify(formValues));
    }
  }, [formValues]);

  const labelsToIds = {};
  formSections.forEach((section) => {
    section.fields.forEach((field) => {
      labelsToIds[field.label] = field.id;
    });
  });

  // Updates the form values state in response to user input
  const handleInputChange = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <AppHeader onPrint={handlePrint} />
      <main className="flex min-h-screen pt-4">
        <section className="flex w-2/5 flex-col">
          <InputSection
            onInputChange={handleInputChange}
            formValues={formValues}
          />
        </section>
        <section className="flex w-3/5 flex-col">
          <div ref={componentRef}>
            <OutputSection formValues={formValues} labelsToIds={labelsToIds} />
          </div>
        </section>
      </main>
    </>
  );
}
