
const HeroSection: React.FC = () => {

  return (
    <section className="flex flex-col items-center justify-center w-full h-[50vh] bg-neutral-900 backdrop-blur-0 relative">
      <div className="absolute inset-0 backdrop-blur bg-[url('https://s3.eu-west-2.amazonaws.com/s3-stjames-istjames/images/news/the-london-library-a-history/_t1200x750/London-Library-News-Header-1200x750.jpg')] bg-center bg-cover backdrop-opacity-25 blur-[3px] opacity-60 -z-10 " />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl font-bold text-center text-gray-800"><span className="text-blue-500">Library Management System</span></h1>
        <p className="text-xl text-center text-gray-50">Subheading</p>
      </div>
    </section>
  )
}

export default HeroSection;