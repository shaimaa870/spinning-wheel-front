import { InputGroup, InputGroupAddon, Input, InputGroupText } from "reactstrap";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "react-feather";
import { useLingui } from "@lingui/react";

function SearchInput({ filter, setFilter }) {
const{i18n}=useLingui();
  const debounced = useDebouncedCallback((value) => {
    setFilter({ ...filter, filter: value });
  }, 1000);

  return (
    <div className="mw-15">
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Search size={14} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={i18n._("search")}
          onChange={(e) => debounced(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export default SearchInput;
