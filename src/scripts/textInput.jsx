// TextInput.jsx
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const TextInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleFocus = (event) => {
      event.target.select();
      event.target.classList.add('blinking');
    };

    const handleBlur = (event) => {
      event.target.classList.remove('blinking');
    };

    const input = inputRef.current;
    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div class="text-input">
      <input
        type="text"
        value="Buscar sitios que aceptan Bitcoin..."
        ref={inputRef}
      />
    </div>
  );
};

export default TextInput;
