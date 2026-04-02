import React from "react";
import Input from "../ui/Input";

export interface ISchedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface CourierFormProps {
  formData: { vehicle: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  schedule: ISchedule[];
  onChange: (index: number, field: keyof ISchedule, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const days = [
  "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday", "Sunday"
];

const times = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

const CourierForm: React.FC<CourierFormProps> = ({
  formData,
  handleChange,
  schedule,
  onChange,
  onAdd,
  onRemove
}) => {
  return (
    <>
      {/* Vehicle */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
        <Input name="vehicle" value={formData.vehicle} onChange={handleChange} required />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <label className="text-sm font-medium text-gray-700">Working Schedule (Min 5 days)</label>

        <button type="button" onClick={onAdd}
          className="bg-indigo-600 text-white px-3 py-1.5 text-xs rounded-md hover:bg-indigo-700 hover:cursor-pointer"
        >
          + Add Day
        </button>
      </div>

      {/* Schedule List */}
      {schedule.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4 bg-gray-50 p-4 rounded-md">
          {/* Day */}
          <div className="flex-1">
            <select title="Day" value={item.day}
              onChange={(e) => onChange(index, "day", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Start */}
          <div className="flex-1">
            <select title="Start Time" value={item.startTime}
              onChange={(e) => onChange(index, "startTime", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* End */}
          <div className="flex-1">
            <select title="End Time" value={item.endTime}
              onChange={(e) => onChange(index, "endTime", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Delete */}
          <button type="button" onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 hover:cursor-pointer"
          >
            🗑
          </button>
        </div>
      ))}
    </>
  );
};

export default CourierForm;