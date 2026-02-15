const SectionTitle = ({ 
  title, 
  subtitle = '', 
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-600 max-w-2xl ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
