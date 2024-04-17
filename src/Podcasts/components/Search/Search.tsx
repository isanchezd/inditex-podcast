interface SearchInputProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ handleInput }: SearchInputProps) {
  return (
    <input
      onInput={handleInput}
      type='search'
      name='podcast-search'
      placeholder='Filter podcasts...'
    />
  );
}

