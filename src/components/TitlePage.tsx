import PropTypes from "prop-types";

type TitlePageProps = {
  title: string;
};

const TitlePage = ({ title }: TitlePageProps) => {
  return (
    <div className="container flex items-center justify-between mx-auto py-1">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};

TitlePage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitlePage;
