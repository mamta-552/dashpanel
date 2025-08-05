import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface PartnerWallet {
  partnerId: string;
  partnerName: string;
  balance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  pendingCommission: number;
  commissionRate: number;
  monthlyTarget: number;
  monthlyEarned: number;
  walletLevel: "Bronze" | "Silver" | "Gold" | "Platinum";
  bonusEarnings: number;
  lastTransactionDate: string;
  status: "active" | "suspended" | "frozen";
}

interface Transaction {
  id: string;
  partnerId: string;
  partnerName: string;
  type:
    | "credit"
    | "debit"
    | "commission"
    | "withdrawal"
    | "bonus"
    | "penalty"
    | "refund";
  subType?: "enrollment" | "referral" | "performance" | "monthly" | "special";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed" | "processing";
  reference: string;
  studentCount?: number;
  commissionRate?: number;
}

interface WithdrawalRequest {
  id: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  remarks?: string;
}

const mockWallets: PartnerWallet[] = [
  {
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    balance: 45000,
    totalEarnings: 125000,
    totalWithdrawals: 80000,
    pendingCommission: 12000,
    commissionRate: 15.5,
    monthlyTarget: 50000,
    monthlyEarned: 35000,
    walletLevel: "Gold",
    bonusEarnings: 8500,
    lastTransactionDate: "2024-01-20",
    status: "active",
  },
  {
    partnerId: "ALC002",
    partnerName: "XYZ Education Hub",
    balance: 32000,
    totalEarnings: 98000,
    totalWithdrawals: 66000,
    pendingCommission: 8500,
    commissionRate: 12.0,
    monthlyTarget: 40000,
    monthlyEarned: 28000,
    walletLevel: "Silver",
    bonusEarnings: 4200,
    lastTransactionDate: "2024-01-19",
    status: "active",
  },
  {
    partnerId: "ALC003",
    partnerName: "Tech Skills Institute",
    balance: 18000,
    totalEarnings: 67000,
    totalWithdrawals: 49000,
    pendingCommission: 5200,
    commissionRate: 10.0,
    monthlyTarget: 25000,
    monthlyEarned: 15000,
    walletLevel: "Bronze",
    bonusEarnings: 1800,
    lastTransactionDate: "2024-01-15",
    status: "suspended",
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    type: "commission",
    subType: "enrollment",
    amount: 5000,
    description: "Student enrollment commission - 5 students",
    date: "2024-01-20",
    status: "completed",
    reference: "COM001",
    studentCount: 5,
    commissionRate: 15.5,
  },
  {
    id: "2",
    partnerId: "ALC002",
    partnerName: "XYZ Education Hub",
    type: "withdrawal",
    amount: -15000,
    description: "Bank transfer withdrawal - HDFC Bank",
    date: "2024-01-19",
    status: "completed",
    reference: "WTH001",
  },
  {
    id: "3",
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    type: "bonus",
    subType: "performance",
    amount: 2000,
    description: "Monthly performance bonus",
    date: "2024-01-18",
    status: "completed",
    reference: "BON001",
  },
  {
    id: "4",
    partnerId: "ALC003",
    partnerName: "Tech Skills Institute",
    type: "commission",
    subType: "referral",
    amount: 1500,
    description: "Partner referral commission",
    date: "2024-01-17",
    status: "pending",
    reference: "REF001",
  },
  {
    id: "5",
    partnerId: "ALC002",
    partnerName: "XYZ Education Hub",
    type: "penalty",
    amount: -500,
    description: "Late submission penalty",
    date: "2024-01-16",
    status: "completed",
    reference: "PEN001",
  },
];

const mockWithdrawals: WithdrawalRequest[] = [
  {
    id: "1",
    partnerId: "ALC001",
    partnerName: "ABC Learning Center",
    amount: 20000,
    requestDate: "2024-01-20",
    status: "pending",
    bankDetails: {
      accountNumber: "1234567890",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
    },
  },
];

export default function PartnerWallet() {
  const [wallets] = useState<PartnerWallet[]>(mockWallets);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [withdrawalRequests, setWithdrawalRequests] =
    useState<WithdrawalRequest[]>(mockWithdrawals);
  const [selectedWallet, setSelectedWallet] = useState<PartnerWallet | null>(
    null,
  );
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<WithdrawalRequest | null>(null);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [rechargeDescription, setRechargeDescription] = useState("");
  const [withdrawalRemarks, setWithdrawalRemarks] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false);
  const [commissionForm, setCommissionForm] = useState({
    partnerId: "",
    type: "enrollment",
    amount: "",
    studentCount: "",
    description: "",
  });

  const handleRecharge = () => {
    if (!selectedWallet || !rechargeAmount) return;

    toast.success(
      `₹${rechargeAmount} credited to ${selectedWallet.partnerName}`,
    );
    setIsRechargeDialogOpen(false);
    setRechargeAmount("");
    setRechargeDescription("");
    setSelectedWallet(null);
  };

  const handleWithdrawalAction = (
    withdrawal: WithdrawalRequest,
    action: "approve" | "reject",
  ) => {
    setWithdrawalRequests(
      withdrawalRequests.map((w) =>
        w.id === withdrawal.id
          ? { ...w, status: action === "approve" ? "approved" : "rejected" }
          : w,
      ),
    );

    toast.success(
      `Withdrawal request ${action === "approve" ? "approved" : "rejected"}`,
    );
    setIsWithdrawalDialogOpen(false);
    setWithdrawalRemarks("");
    setSelectedWithdrawal(null);
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      partnerId: commissionForm.partnerId,
      partnerName: getPartnerName(commissionForm.partnerId),
      type: "commission",
      subType: commissionForm.type as any,
      amount: parseInt(commissionForm.amount),
      description: commissionForm.description,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      reference: `COM${Date.now()}`,
      studentCount: commissionForm.studentCount
        ? parseInt(commissionForm.studentCount)
        : undefined,
    };

    // Add transaction and update wallet balance
    toast.success(
      `Commission of ₹${commissionForm.amount} credited successfully`,
    );
    setIsCommissionDialogOpen(false);
    setCommissionForm({
      partnerId: "",
      type: "enrollment",
      amount: "",
      studentCount: "",
      description: "",
    });
  };

  const getPartnerName = (partnerId: string) => {
    const wallet = wallets.find((w) => w.partnerId === partnerId);
    return wallet?.partnerName || partnerId;
  };

  const getWalletLevelColor = (level: string) => {
    switch (level) {
      case "Platinum":
        return "text-purple-600 bg-purple-100";
      case "Gold":
        return "text-yellow-600 bg-yellow-100";
      case "Silver":
        return "text-gray-600 bg-gray-100";
      case "Bronze":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "credit":
      case "commission":
      case "bonus":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "debit":
      case "withdrawal":
      case "penalty":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "refund":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
      case "rejected":
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getTotalStats = () => {
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    const totalEarnings = wallets.reduce((sum, w) => sum + w.totalEarnings, 0);
    const totalWithdrawals = wallets.reduce(
      (sum, w) => sum + w.totalWithdrawals,
      0,
    );
    const pendingWithdrawals = withdrawalRequests
      .filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0);

    return {
      totalBalance,
      totalEarnings,
      totalWithdrawals,
      pendingWithdrawals,
    };
  };

  const stats = getTotalStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Partner Wallet Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage partner wallets, commissions, and withdrawals
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Balance
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Total Withdrawals
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.totalWithdrawals.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Pending Withdrawals
                </p>
                <p className="text-lg font-bold">
                  ₹{stats.pendingWithdrawals.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner Wallets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Partner Wallets</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Dialog
              open={isCommissionDialogOpen}
              onOpenChange={setIsCommissionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Commission
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Commission</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCommissionSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commissionPartnerId">Partner</Label>
                      <Select
                        value={commissionForm.partnerId}
                        onValueChange={(value) =>
                          setCommissionForm({
                            ...commissionForm,
                            partnerId: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                        <SelectContent>
                          {wallets.map((wallet) => (
                            <SelectItem
                              key={wallet.partnerId}
                              value={wallet.partnerId}
                            >
                              {wallet.partnerName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commissionType">Commission Type</Label>
                      <Select
                        value={commissionForm.type}
                        onValueChange={(value) =>
                          setCommissionForm({ ...commissionForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enrollment">Enrollment</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="performance">
                            Performance
                          </SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="special">Special</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commissionAmount">Amount</Label>
                      <Input
                        id="commissionAmount"
                        type="number"
                        value={commissionForm.amount}
                        onChange={(e) =>
                          setCommissionForm({
                            ...commissionForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="Enter commission amount"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentCount">
                        Student Count (Optional)
                      </Label>
                      <Input
                        id="studentCount"
                        type="number"
                        value={commissionForm.studentCount}
                        onChange={(e) =>
                          setCommissionForm({
                            ...commissionForm,
                            studentCount: e.target.value,
                          })
                        }
                        placeholder="Number of students"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionDescription">Description</Label>
                    <Textarea
                      id="commissionDescription"
                      value={commissionForm.description}
                      onChange={(e) =>
                        setCommissionForm({
                          ...commissionForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Commission description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCommissionDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Commission</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Level & Commission</TableHead>
                <TableHead>Current Balance</TableHead>
                <TableHead>Monthly Progress</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets.map((wallet) => (
                <TableRow key={wallet.partnerId}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{wallet.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {wallet.partnerId}
                      </div>
                      <div className="text-xs text-gray-400">
                        Last: {wallet.lastTransactionDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getWalletLevelColor(wallet.walletLevel)}`}
                      >
                        {wallet.walletLevel}
                      </div>
                      <div className="text-sm font-medium mt-1">
                        {wallet.commissionRate}% Rate
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        ₹{wallet.balance.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Pending: ₹{wallet.pendingCommission.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">
                        ₹{wallet.monthlyEarned.toLocaleString()} / ₹
                        {wallet.monthlyTarget.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((wallet.monthlyEarned / wallet.monthlyTarget) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(
                          (wallet.monthlyEarned / wallet.monthlyTarget) * 100,
                        )}
                        % of target
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        ₹{wallet.totalEarnings.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">
                        +₹{wallet.bonusEarnings.toLocaleString()} bonus
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(wallet.status)}>
                      {wallet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Dialog
                        open={
                          isRechargeDialogOpen &&
                          selectedWallet?.partnerId === wallet.partnerId
                        }
                        onOpenChange={(open) => {
                          setIsRechargeDialogOpen(open);
                          if (open) setSelectedWallet(wallet);
                          else setSelectedWallet(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Balance</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">
                                Partner: {wallet.partnerName}
                              </Label>
                              <p className="text-sm text-gray-600">
                                Current Balance: ₹
                                {wallet.balance.toLocaleString()}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                id="amount"
                                type="number"
                                value={rechargeAmount}
                                onChange={(e) =>
                                  setRechargeAmount(e.target.value)
                                }
                                placeholder="Enter amount to add"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={rechargeDescription}
                                onChange={(e) =>
                                  setRechargeDescription(e.target.value)
                                }
                                placeholder="Enter description"
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsRechargeDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleRecharge}>
                                Add Balance
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Recent Transactions</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {transaction.partnerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₹
                    {Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {transaction.reference}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Withdrawal Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5" />
            <span>Withdrawal Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Bank Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.partnerName}</div>
                      <div className="text-sm text-gray-500">
                        {request.partnerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{request.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">
                        {request.bankDetails.bankName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {request.bankDetails.accountNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleWithdrawalAction(request, "approve")
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleWithdrawalAction(request, "reject")
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
