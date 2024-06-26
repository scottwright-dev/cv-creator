import PropTypes from 'prop-types';

function CVSkill({ formValues }) {
  // Filter and map skills
  const skills = Object.entries(formValues)
    .filter(([key, value]) => key.startsWith('skill') && value)
    .map(([, value]) => value);

  return (
    <section className="m-6 space-y-1 text-xs font-thin">
      {skills.length > 0 && (
        <>
          <header className="mb-4 flex items-center text-sm font-normal">
            <span className="text-lg">
              <span
                className="inline-block border-b-2 border-slate-200"
                style={{ width: '35px' }}
              >
                Skills
              </span>
            </span>
          </header>
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2.5 text-base leading-none">•</span>
              {skill}
            </div>
          ))}
        </>
      )}
    </section>
  );
}

CVSkill.propTypes = {
  formValues: PropTypes.object.isRequired,
};

export default CVSkill;
