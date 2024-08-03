
import {ReactNode} from 'react';
import NavBar from './navigation/nav-bar';

type Props = {
  children?: ReactNode;
};

export default function PageLayout({children}: Props) {

  return (
    <div>
       <NavBar locale="en" />
      <div className="container relative flex grow flex-col px-4">
      {children}
      </div>
    </div>
  );
}