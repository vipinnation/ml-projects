import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  label: string;
  labelDescription?: string;
  defaultValue?: string;
  placeholder?: string;
  options: Array<any>;
  handleChange?: (value: string) => void;
};

const SelectField: React.FC<Props> = ({
  label,
  labelDescription,
  defaultValue,
  placeholder,
  options,
  handleChange,
}) => {
  return (
    <div className="">
      <label htmlFor="fuel-type" className="block text-gray-700 font-bold mb-2">
        {label}
        <span
          className="text-gray-500 font-normal ml-2"
          title={labelDescription ? labelDescription : ""}
        ></span>
      </label>
      <Select
        defaultValue={defaultValue ? defaultValue : ""}
        onValueChange={handleChange}
      >
        <SelectTrigger className="capitalize">
          <SelectValue
            placeholder={placeholder ? placeholder : null}
            className="capitalize"
            onChange={(e) => console.log(e)}
          />
        </SelectTrigger>
        <SelectContent>
          {options && options.length > 0 ? (
            <>
              {options.map((item) => (
                <SelectItem value={item} className="capitalize">
                  {item}
                </SelectItem>
              ))}
            </>
          ) : (
            <>
              <SelectItem value="null" disabled>
                No Data
              </SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
