import PropTypes from "prop-types";
import Flag from "react-world-flags";

type FlagItemProps = {
  flag: string;
  content: string;
};

const FlagItem = ({ flag, content }: FlagItemProps) => {
  return (
    <>
      <Flag className="h-5 w-5" code={flag} />
      <span>{content}</span>
    </>
  );
};

FlagItem.propTypes = {
  flag: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default FlagItem;
