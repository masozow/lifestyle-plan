interface Props {
  data: [];
}

const DataCard = ({ data }: Props) => {
  return <div>DataCard: {JSON.stringify(data)}</div>;
};

export default DataCard;
