import React, { useState } from "react";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 주어진 달의 일 수를 계산
  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 해당 달의 첫 번째 날의 요일을 계산 (0: 일요일, 1: 월요일, ...)
  const getStartDay = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // 캘린더를 동적으로 생성
  const generateCalendar = (): JSX.Element[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = getStartDay(year, month);

    const calendar: JSX.Element[] = [];
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    // 시작 요일을 기준으로 빈 칸 추가
    for (let i = 0; i < startDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // 날짜 추가
    daysArray.forEach((day) => {
      calendar.push(
        <button
          key={`day-${day}`}
          className="h-40 w-full bg-gray-200 border border-gray-300 flex hover:bg-blue-500 hover:text-white"
          onClick={() => handleDateClick(day)}
        >
          <div className="p-2">
            {day}
          </div>
        </button>
      );
    });

    return calendar;
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작
    alert(`날짜 클릭: ${year}-${month}-${day}`);
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="p-4 w-full mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          이전
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          다음
        </button>
      </div>

      {/* 캘린더 */}
      <div className="grid grid-cols-7 gap-1 x-full h-full">
        {/* 요일 헤더 */}
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className="h-12 flex items-center justify-center font-bold text-gray-700"
          >
            {day}
          </div>
        ))}

        {/* 날짜 */}
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
