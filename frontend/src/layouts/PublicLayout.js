import { useEffect } from "react";
import { HeaderPublic } from "../components/HeaderPublic"
import { BaseLayout } from "./BaseLayout";

export const PublicLayout = () => {
   useEffect(() => {
      import('../css/publicLayout.css');
   }, []);
   return (
      <BaseLayout HeaderComponent={HeaderPublic} />
   )
}