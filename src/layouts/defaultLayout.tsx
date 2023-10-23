import NavbarComponent from "../components/global/navbar";

type DefaultLayoutProps = {
  children: React.ReactNode,
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className }) => {

  return (
    <main className={`bg-[#f5f5f5] min-h-screen`}>
      <NavbarComponent />
      <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
        {children}
      </div>
    </main>
  )
}

export default DefaultLayout;