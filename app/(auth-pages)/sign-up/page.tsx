// This is a hack to allow the server to render a default page with a correct title.
import Signup from './signup';

export const metadata = {
  title: 'Sign up',
}

export default function page() {
  return <Signup></Signup>
}