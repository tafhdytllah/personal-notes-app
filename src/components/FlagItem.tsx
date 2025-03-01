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
export default FlagItem;
