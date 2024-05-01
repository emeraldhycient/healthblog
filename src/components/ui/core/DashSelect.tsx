import { forwardRef, InputHTMLAttributes } from "react";
// @ts-ignore

interface IProps<T> extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder: string;
  error: any;
  options?: string[] | undefined;
}

function DashSelectComponent(
  {
    options,
    label,
    error,
    placeholder,
    ...rest
  }: Omit<IProps<any>, "className">,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <div>
      {label && (
        <label className="block tracking-wide text-sm  mb-2">{label}</label>
      )}
      <select
        ref={ref}
        className="appearance-none block w-full rounded-lg  text-sm md:text-base text-gray border border-gray py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}{" "}
    </div>
  );
}

export const DashSelect = forwardRef(DashSelectComponent) as (
  props: Omit<IProps<any>, "className"> & {
    ref?: React.ForwardedRef<HTMLSelectElement>;
  }
) => ReturnType<typeof DashSelectComponent>;
