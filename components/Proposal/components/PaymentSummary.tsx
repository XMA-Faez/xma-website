import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { packages } from '@/data/proposalData';

const PaymentSummary = ({ selectedPackage, onPayment }) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-white">One-Time Package</h3>
            <div className="text-3xl font-bold text-red-400">
              {packages[selectedPackage].price}
            </div>
            <div className="text-zinc-400">
              {packages[selectedPackage].usdPrice}
            </div>
          </div>
          
          <div className="border-t border-zinc-700 pt-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-white">Total Payment</h3>
                <p className="text-sm text-zinc-400">
                  One-time setup fee
                </p>
              </div>
              <button
                onClick={onPayment}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3"
              >
                <span className="font-semibold">Pay {packages[selectedPackage].price}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-zinc-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V6a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3" />
            </svg>
            <span>Secure SSL encrypted payment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
