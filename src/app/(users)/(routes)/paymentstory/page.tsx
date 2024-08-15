'use client';


import useAxiosSecure from "@/app/Hooks/AxiosSequre";
import useAuth from "@/app/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

type Payment = {
  _id: string;
  price: number;
  transactionId: string;
  status: string;
};

const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery<Payment[]>({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Payment History</h2>
      <p className="text-lg text-gray-600 text-center mb-4">Total Payments: <span className="font-semibold text-gray-800">{payments.length}</span></p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">#</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Transaction ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-b text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 border-b text-gray-700">${payment.price.toFixed(2)}</td>
                <td className="py-3 px-4 border-b text-gray-700">{payment.transactionId}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      payment.status === 'succeeded' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
