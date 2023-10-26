import NavbarComponent from "../components/global/navbar";

type DefaultLayoutProps = {
  children: React.ReactNode,
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className }) => {

  return (
    <main className={`bg-[#f5f5f5] min-h-screen flex flex-col`}>
      <NavbarComponent />
      <div className={`flex flex-grow h-0 flex-col`}>
        <div className={`h-full w-full flex flex-col items-center justify-center px-[4%] ${className}`}>
          {children}
        </div>
      </div>
    </main>
  )
}

export default DefaultLayout;