import { Disclosure, Transition } from '@headlessui/react';
import { IconChevronRight } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import InputFields from './InputFieldGroup';
import ButtonCircular from '../ButtonCircular';

function FormSectionDisclosurePanel({
  section,
  formValues,
  handleFieldChange,
  addFieldSet,
}) {
  return (
    <Disclosure
      as="div"
      className="mb-4 rounded-lg"
      defaultOpen={section.title === 'Personal Information'}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
            <span>{section.title}</span>
            <IconChevronRight
              className={`${open ? 'rotate-90 transform' : ''} h-5 w-5 flex-shrink-0 text-slate-500`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              <InputFields
                section={section}
                formValues={formValues}
                handleFieldChange={handleFieldChange}
              />
              {section.addButton && (
                <div className="mt-4 flex justify-center">
                  <ButtonCircular
                    text="Add More"
                    onClick={() => addFieldSet(section.title)}
                  />
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

FormSectionDisclosurePanel.propTypes = {
  section: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  addFieldSet: PropTypes.func.isRequired,
};

export default FormSectionDisclosurePanel;
