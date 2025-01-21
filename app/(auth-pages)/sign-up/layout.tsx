// Layout: add title metadata to sign up page
export const metadata = {
    title: 'Sign Up',
  }

// Layout function takes an object with children, of type React.ReactNode
export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>{children}</div>
    );
  }