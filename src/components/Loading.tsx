const Loading = () => {
    return (
      <div className='absolute left-[50%] top-[50%] grid h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#0000007a]'>
        <div className='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };
  
  export default Loading;