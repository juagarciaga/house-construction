import { calculateTotalExpenseByAgnosticType } from "../commons";
import { RomaneioItem } from "../lists/romaneios.list";

export interface PieChartData {
    value: number;
    color: string;
    label: string;
}

interface PieChartProps {
    data: PieChartData[];
}

const PieChart = ({ data }: PieChartProps) => {
    const total = calculateTotalExpenseByAgnosticType(data as unknown as RomaneioItem[]).toFixed(2);

    let cumulativeValue = 0;

    return (
        <div className="pieChart">
            {data.map((item, index) => {
                const value = (item.value / Number(total)) * 100;
                const startValue = cumulativeValue;
                cumulativeValue += value;

                return (
                    <div
                        key={index}
                        className="slice"
                        content={item.label}
                        style={{
                            '--start': startValue,
                            '--value': value,
                            '--color': item.color,
                        } as React.CSSProperties}
                    >
                        <span> {item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default PieChart;
