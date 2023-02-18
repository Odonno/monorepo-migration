import { ChangeEvent, FormEvent } from "react";
import { Button } from "ui";
import { useLocalStorageValue } from "@react-hookz/web";

export default function Forms() {
  const {
    value,
    set: setValue,
    remove,
  } = useLocalStorageValue<string | undefined>("forms/text", {
    initializeWithValue: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    remove();
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forms</h1>
      <p>
        This a basic form. The following text will be saved in local storage.
      </p>

      <div>
        <textarea
          placeholder="What's up?"
          value={value || ""}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" label="Send" />
    </form>
  );
}
