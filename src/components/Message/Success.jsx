const Success = ({message}) => {
  return (
    <div className="mt-8">
      <div className="border border-lime-400 rounded bg-lime-100 px-4 py-3 text-lime-700">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Success;
