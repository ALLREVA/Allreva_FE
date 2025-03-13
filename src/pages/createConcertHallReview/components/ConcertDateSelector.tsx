import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface DateSelectorProps {
  startDate: string;
  endDate: string;
}

const DateSelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const DateButton = styled.div<{ isActive: boolean }>`
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.dark[300]};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.white : theme.colors.dark[100])};
  font-size: 1.4rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? '' : theme.colors.primaryLight)};
  }
`;

const DateText = styled.span`
  display: block;
`;

const DayOfWeekText = styled.span`
  display: block;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  opacity: 0.8;
`;

const ConcertDateSelector = ({ startDate, endDate }: DateSelectorProps) => {
  const { setValue } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dateRange = useMemo(() => {
    const dates = [];
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    let currentDate = start;
    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  }, [startDate, endDate]);

  // 요일 반환
  const getDayOfWeek = (dateString: string) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayIndex = dayjs(dateString).day();
    return days[dayIndex];
  };

  // 날짜 선택
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue('viewDate', date, { shouldValidate: true });
  };

  return (
    <DateSelectorContainer>
      {dateRange.map((date) => (
        <DateButton
          isActive={selectedDate === date}
          key={date}
          onClick={() => handleDateSelect(date)}
        >
          <DateText>{dayjs(date).format('M/D')}</DateText>
          <DayOfWeekText>{getDayOfWeek(date)}</DayOfWeekText>
        </DateButton>
      ))}
    </DateSelectorContainer>
  );
};

export default ConcertDateSelector;
