type NoteListProps = {
  id: string;
};

const NoteList = ({ id }: NoteListProps) => {
  return <div id={id}></div>;
};

export default NoteList;
