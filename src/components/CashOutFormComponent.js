import React from 'react';

export const CashOutFormComponent = ({
  handleSubmit,
  onSubmit
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="order-btn-wrapper">
        <button className="btn btn-primary">
          Withdraw
        </button>
      </div>
    </form>
  );
};

export default CashOutFormComponent;
