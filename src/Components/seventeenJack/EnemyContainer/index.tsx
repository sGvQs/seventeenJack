import { Card } from '../../common/Card';
import { StyledEnemyCardWrap, StyledSingleUnitCards } from './styled';

type EnemyCardProps = {
  firstSrc?: string;
  secondSrc?: string;
  thirdSrc?: string;
  fourthSrc?: string;
};

export const EnemyContainer: React.FC<EnemyCardProps> = ({
  firstSrc,
  secondSrc,
  thirdSrc,
  fourthSrc,
}) => {
  return (
    <StyledEnemyCardWrap>
      <StyledSingleUnitCards>
        <Card isSelected={false} enemy src={firstSrc} />
        <Card isSelected={false} enemy src={secondSrc} />
      </StyledSingleUnitCards>
      <StyledSingleUnitCards>
        <Card isSelected={false} enemy src={thirdSrc} />
        <Card isSelected={false} enemy src={fourthSrc} />
      </StyledSingleUnitCards>
    </StyledEnemyCardWrap>
  );
};
