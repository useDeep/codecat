const Console = ( {output} ) => {
  const timestamp = output?.finished_at
  const date = new Date(timestamp)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const display = () => {
    let statusId = output?.status?.id;

    if (statusId === 6) {
      
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-500">
          {atob(output?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-black-500">
          {atob(output.stdout) !== null
            ? `${atob(output.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-400">
          {`Time Limit Exceeded. Please try again`}
        </pre>
      );
    } else if (statusId === 11) {
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-500">
          {atob(output?.stderr)}
        </pre>
      );
    } else {
      <pre>{`Something went wrong!!
      Call the Police.`}</pre>
    }
  };

  return (
    <>
    {output && output?.status?.id ? (
    <div className="h-full flex-col justify-end">
      <div>{display()}</div>
      
      
        <br/>
        <hr/>
        <br/>
      <div className="ml-3">
        <p className="text-sm mb-3 font-medium">
        Status: {' '}
        <span className={`font-semibold px-2 py-1 rounded-md ${output?.status?.description == 'Accepted' ? 'bg-green-300' : 'bg-red-300'}`}>
          {output?.status?.description}
        </span>
      </p>
      <p className="text-sm mb-3 font-medium">
        Time: {' '}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {output?.time}
        </span>
      </p>
      <p className="text-sm mb-3 font-medium">
        Memory: {' '}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {output?.memory}
        </span>
      </p>
      <p className="text-sm mb-3 font-medium">
        Compiled at: {' '}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
          {date?.toLocaleString('en-US', options)}
        </span>
      </p>
      </div>
      </div>
      ) : 
      (<p className="font-medium">Your ouput and logs appear here</p>)}
      </>
      )
}

export default Console