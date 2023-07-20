import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  BadgeDelta,
  DeltaType,
  Badge,
} from "@tremor/react";

const getColor = (percentage: number) => {
  if (percentage < 40) return "green";
  if (percentage < 60) return "yellow";
  if (percentage < 80) return "orange";
  if (percentage > 80) return "red";
  return "green";
};

export const SpendCard = ({
  title,
  total,
  trend,
  target,
  percentage,
}: {
  title: string;
  total: string;
  trend: number;
  target: string;
  percentage: number;
}) => {
  return (
    <Card className="max-w-lg">
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{total}</Metric>
        </div>
        {/* <BadgeDelta deltaType={getDeltaType(percentage)}>{`${percentage.toFixed(
          2
        )}%`}</BadgeDelta> */}
        <Badge color={getColor(percentage)}>
          {`${percentage.toFixed(2)}%`}
        </Badge>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{`${total}`}</Text>

        <Text>{`${target}`}</Text>
      </Flex>
      <ProgressBar value={percentage} className="mt-2" />
    </Card>
  );
};
