
import React from "react";
import { useNavigate } from "react-router-dom";
import { SubscriptionFlowModal } from "./SubscriptionFlowModal";

const CheckoutPage = ({
  selectedPlan,
  onCancel,
  onSuccess,
  isGroupPlan = false,
  invitedEmails = [],
}) => {
  const navigate = useNavigate();

  const handleSuccess = (plan, inviteCodes) => {
    onSuccess(plan, inviteCodes, invitedEmails);
  };

  return (
    <SubscriptionFlowModal
      isOpen={true}
      onClose={onCancel}
      selectedPlan={selectedPlan}
      isGroup={isGroupPlan}
      onSuccess={handleSuccess}
    />
  );
};

export default CheckoutPage;
