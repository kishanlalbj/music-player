import { AutoComplete } from "antd";
import "./Search.css";
import { useState } from "react";

const Search = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (text) => {
    console.log(text);
  };

  const handleSelect = (data, option) => {
    setSelectedOption(option);
    setInputValue(option.label);
  };

  console.log(selectedOption);

  const handleChange = (data, option) => {
    setInputValue(data);
    setSelectedOption(option);
  };

  return (
    <div>
      <AutoComplete
        value={inputValue}
        options={[
          { label: "Ambil", value: 1 },
          { label: "Aaromale", value: 2 },
          { label: "New york", value: 3 },
        ]}
        style={{
          width: 200,
        }}
        onSelect={handleSelect}
        onChange={handleChange}
        placeholder="Search"
        onSearch={handleSearch}
      ></AutoComplete>
    </div>
  );
};

export default Search;
