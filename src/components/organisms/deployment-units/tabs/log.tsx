import dynamic from 'next/dynamic';

const LazyLog = dynamic(() => import('react-lazylog').then((mod) => mod.LazyLog), {
  ssr: false,
});

const ScrollFollow = dynamic(() => import('react-lazylog').then((mod) => mod.ScrollFollow), {
  ssr: false,
});

const Log = () => {
  return (

    <ScrollFollow
      startFollowing={true}
      render={({
                 follow,
                 onScroll
               }) => (
        <LazyLog
          height={700}
          style={{
            borderRadius:"5px",
            marginTop:"10px",
          }}
          url="https://gist.githubusercontent.com/milancu/39a677c8a8bfc4ffcf64b2a169960736/raw/29ddb35fe8140b840219740655b19dc5496da489/gistfile1.txt"
          stream follow={follow}/>
      )}
    />
  )
}

export default Log