const Error = ({message}) => {
    return (
      <div className="mt-8">
        <div className="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
          <p>{message}</p>
        </div>
      </div>
    );
  }
  
  export default Error;
  