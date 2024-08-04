import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const TextInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleFocus = (event) => event.target.select();

    const input = inputRef.current;
    input.addEventListener('focus', handleFocus);

    return () => {
      input.removeEventListener('focus', handleFocus);
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
