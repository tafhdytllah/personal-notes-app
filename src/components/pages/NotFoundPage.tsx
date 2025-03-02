import Empty from "@/components/Empty";

const NotFoundPage = () => {
  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <Empty text="page.notfound" />;
    </div>
  );
};

export default NotFoundPage;
