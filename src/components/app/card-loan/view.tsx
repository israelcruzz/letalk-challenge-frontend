import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterPrice } from "@/utils/formatter-price";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface CardLoanViewProps {
  fees: number;
  totalPrice: number;
  loanId: string;
}

export const CardsLoanView = ({
  fees,
  totalPrice,
  loanId,
}: CardLoanViewProps) => {
  return (
    <Card>
      <CardHeader className="flex">
        <div className="flex justify-between">
          <CardTitle>Valor Total</CardTitle>

          <Badge>{fees}% de juros</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatterPrice(totalPrice)}</div>

        <Link
          to={`/details/${loanId}`}
          className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer hover:underline"
        >
          Ver Detalhes
        </Link>
      </CardContent>
    </Card>
  );
};
