import { ChangeEvent, useEffect, useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const defaultValue =
      new URLSearchParams(window.location.search).get("q") || "";

    setValue(defaultValue);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    window.history.replaceState({}, "", `?q=${e.target.value}`);
  };

  return (
    <div>
      <h1>Search</h1>
      <p>
        This a basic search. The following text will be saved as a url
        parameter.
      </p>

      <div>
        <input
          placeholder="What are you looking for?"
          value={value}
          onChange={handleChange}
        />
      </div>

      {value && (
        <div>
          You are searching for: <strong>{value}</strong>
        </div>
      )}
    </div>
  );
}
