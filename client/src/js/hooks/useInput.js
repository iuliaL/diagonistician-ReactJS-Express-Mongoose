
import { useState } from 'react';

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        onChange: event => {
            setValue(event.target.value);
        }
    };
}