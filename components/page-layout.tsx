
import {ReactNode} from 'react';
import NavBar from './navigation/nav-bar';

type Props = {
  children?: ReactNode;
};

export default function PageLayout({children}: Props) {

  return (
      <div className="container relative flex grow flex-col">
      <NavBar locale="en" />
      {children}
      </div>
  );
}