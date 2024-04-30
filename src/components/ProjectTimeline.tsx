import React from "react";

interface Prop {
  startDate: string;
  endDate: string;
  tasks: Task[][];
}

interface Task {
  title: string;
  startDate: string;
  endDate: string;
  bg?: string;
}

const ProjectTimeline: React.FC<Prop> = (props) => {
  const getProjectDays = (startDate: Date, endDate: Date) => {
    const startMillis: number = startDate.getTime();
    const endMillis: number = endDate.getTime();

    const timeDifference: number = endMillis - startMillis;

    const daysDifference: number = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    return daysDifference;
  };

  let projectStart: Date = new Date(props.startDate);
  let projectEnd: Date = new Date(props.endDate);

  const numberOfDays: number = getProjectDays(projectStart, projectEnd);

  const daysArray: number[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    daysArray.push(i + 1);
  }

  const getDateForDay = (start: Date, day: number): string => {
    const date = new Date(start);
    date.setDate(date.getDate() + day - 1);
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth}/${
      month < 10 ? "0" + month : month
    }`;
  };

  const calculateTaskWidth = (task: Task): string => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const taskDays = getProjectDays(taskStart, taskEnd);
    const projectDuration = getProjectDays(projectStart, projectEnd);
    const widthPercentage = (taskDays / projectDuration) * 100;
    return `${widthPercentage}%`;
  };

  const calculateTaskLeftPosition = (task: Task): string => {
    const taskStart = new Date(task.startDate);
    const taskStartDay = getProjectDays(projectStart, taskStart);
    const leftPercentage = (taskStartDay / numberOfDays) * 100;
    return `${leftPercentage}%`;
  };

  return (
    <div className="w-full h-fit overflow-y-scroll overflow-x-scroll flex p-3">
      <div className=" font-bold font-sans justify-between  mr-3">
        <div className="mt-2">Days</div>
        <div className="mt-8">Tasks</div>
      </div>
      <div className=" flex flex-col justify-between font-bold font-sans">
        <div className=" flex gap-x-10  border-b   border-black ">
          {daysArray.map((day, index) => (
            <div key={index} className=" flex flex-col ">
              <div className="" key={day}>
                <div>{day}</div>
                <div className="font-light text-[#929292]">
                  {getDateForDay(projectStart, day)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="w-full h-fit border border-black p-0.5 my-4 bg-red-200">
          {props.tasks.map((task) => (
            <div
              key={task.title}
              className="top-0 p-2 h-40 text-sm shadow-sm border border-black"
              style={{
                marginLeft: calculateTaskLeftPosition(task),
                width: calculateTaskWidth(task),
              }}
            >
              {task.title}
            </div>
          ))}
        </div> */}
        <div className="w-full h-fit border border-black p-0.5 my-4  relative ">
          {props.tasks.map((nestedArray, index) => (
            <div key={index} className=" bg-green-100 inline">
              {nestedArray.map((task) => (
                <div
                  key={task.title}
                  className="  top-0 p-2 h-40 text-sm shadow-sm border border-black"
                  style={{
                    marginLeft: calculateTaskLeftPosition(task),
                    width: calculateTaskWidth(task),
                    backgroundColor: task.bg,
                  }}
                >
                  {task.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
