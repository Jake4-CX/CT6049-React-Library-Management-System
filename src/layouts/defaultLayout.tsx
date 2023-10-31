import NavbarComponent from "../components/global/navbar";

type DefaultLayoutProps = {
  children: React.ReactNode,
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className }) => {

  return (
    <main className={``}>
      <div className="fixed inset-0 -z-20 bg-[#f5f5f5]" />
      <div className="min-w-full min-h-screen h-max">
        <section className="flex flex-grow flex-col items-center space-y-3">
          <NavbarComponent />
          <div className={`w-full flex flex-grow flex-col items-center px-[4%] ${className}`}>
            {children}
          </div>
        </section>

      </div>
    </main>
  )
}

export default DefaultLayout;