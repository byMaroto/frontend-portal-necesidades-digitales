const List = ({ data, render, className }) => {
  return <ul className={className}>{data.map(render)}</ul>;
};

export default List;
