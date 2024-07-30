import { HeaderAdmin } from "../components/HeaderAdmin";
import { BaseLayout } from "./BaseLayout";
import { useEffect } from 'react';

export const PublicLayout = () => {
   useEffect(() => {
      import('../css/adminLayout.css');
   }, []);
   return (
      <BaseLayout HeaderComponent={HeaderAdmin} />
   )
}