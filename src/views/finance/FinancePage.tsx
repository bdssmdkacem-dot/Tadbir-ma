"use client";

import { useState } from "react";
import { FinanceSummary }        from "./FinanceSummary";
import { MonthlyChart }          from "./MonthlyChart";
import { TransactionsTable }     from "./TransactionsTable";
import { AddTransactionModal }   from "./AddTransactionModal";

export function FinancePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div dir="rtl" className="space-y-6">
      {/* KPIs + category bars */}
      <FinanceSummary />

      {/* Monthly bar chart */}
      <MonthlyChart />

      {/* Transactions table */}
      <TransactionsTable onAdd={() => setShowModal(true)} />

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

