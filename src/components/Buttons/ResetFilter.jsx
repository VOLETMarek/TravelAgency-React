import { useFilter } from "../../context/FilterContext";
const ResetFilter = () => {
  const { isReset, setIsReset } = useFilter();
  const handleChange = () => {
    setIsReset(!isReset);
  };
  return (
    <div>
      <button
        className="font-medium w-32 h-11 rounded flex border-solid
        justify-center place-items-center bg-green"
        onClick={handleChange}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ResetFilter;
