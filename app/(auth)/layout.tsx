"use client";

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center fixed top-0 left-0 right-0 bottom-0">
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
