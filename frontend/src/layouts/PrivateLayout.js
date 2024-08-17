import { HeaderPrivate } from "../components/HeaderPrivate";
import { BaseLayout } from "./BaseLayout";
import { useEffect } from 'react';

export const PrivateLayout = () => {
   useEffect(() => {
      import('../css/privateLayout.css');
   }, []);
   return (
      <BaseLayout HeaderComponent={HeaderPrivate} />
   )
}