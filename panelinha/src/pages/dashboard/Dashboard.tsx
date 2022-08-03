import { LayoutBasePage } from "../../shared/layouts";
import {DetailTools} from "../../shared/components"
export const Dashboard = () => {
  return (
    <LayoutBasePage
      tittle="Página inicial"
      listingTools={(
      <DetailTools 
      showSaveAndCloseButtonLoading
      showNewButton
      showSaveAndCloseButton
      showBackButton={false}
       />
      )}
    >
      Testando
    </LayoutBasePage>
  );
};
